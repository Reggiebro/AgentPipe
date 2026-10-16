/**
 * COBOL Financial System Interface Specification & Implementation Guide
 * ===================================================================
 * This file defines the protocol and core logic for managing financial transactions within a 
 * globally consistent environment. It serves as the bridge between legacy COBOL components 
 (bank_of_banana_pudding, etc.) and modern Python/JavaScript runtime standards.

 **Transaction Protocol: ACID**
 - Atomicity: All funds change must be committed to disk or memory via atomic writes.
   Transactions cannot proceed in parallel without mutual exclusion logic.
 - Consistency: Final state is deterministic regardless of concurrent access order (in this 
     simplified model, we assume a single writer for simplicity).
 - Isolation: No two transactions can modify shared data structures simultaneously until one finishes.

 **Core Data Types**
   - `FinancialAccount`: Represents the bank's ledger with ID, name, balance, and status flags.
   - `TransactionRecord`: Holds transaction details (ID, amount, type) linked to accounts.
   - `EventLogEntry`: Tracks all transactions for audit purposes.

 **Global Transaction Management Layer**
   Uses a simplified Python concurrency model (`concurrency` from `python-concurrent.futures`) 
   wrapped in COBOL's `COBIT` (Common Business Item Type). This ensures the system runs on any platform with standard CPython support while maintaining strict ACID compliance.

 **Event Generator & Thread Safety**
   - Generates events via a dedicated event loop that does not block Python threads.
   - Uses locks to protect shared state during transaction execution.
 */

// ============================================================================
// 1. TYPE DEFINITIONS (Abstract Data Types)
// ============================================================================

/**
 * Represents the core data structure for financial transactions in this system.
 * This is a high-level abstraction over COBOL-PROC-TX semantics.
 */
export interface FinancialAccount {
    id: string;           // Unique identifier, e.g., "ACC_001"
    name: string;        // Human-readable account holder
    balance: number;     // Current cash in the bank
    status: 'ACTIVE' | 'INVESTOR';  // Active or Investor (no deposits)
}

/**
 * Represents a single transaction event.
 */
export interface TransactionRecord {
    id: string;          // Unique record ID for tracking history
    account_id: string;  // The specific bank account involved
    amount: number;      // Positive = deposit, negative = withdrawal (must be signed)
    type: 'DEPOSIT' | 'WITHDRAWAL';   // Type of transaction
}

/**
 * Represents a global audit log entry.
 */
export interface EventLogEntry {
    event_id: string;        // Unique identifier for this specific event in the ledger
    timestamp_ms: number;     // Milliseconds since epoch (for logging)
    account_type: 'DEPOSIT' | 'WITHDRAWAL';   // Type of transaction logged
}

/**
 * Defines the COBOL-PROC-TX interface. This is the contract for all financial operations.
 */
export const PROC_TX_INTERFACE = {
    /**
     * Create a new FinancialAccount with default values (e.g., $10, Active).
     * @param id Unique identifier of the account.
     * @param name Human-readable name of the bank account holder.
     * @returns Created financial account object.
     */
    create_account: () => Promise<FinancialAccount>,

    /**
     * Create a new TransactionRecord with default values (e.g., id="TX_001", type=DEPOSIT).
     * @param id Unique record ID for the transaction history.
     * @param amount Amount to be added/removed from balance.
     * @returns Created transaction record object.
     */
    create_transaction: () => Promise<TransactionRecord>,

    /**
     * Log a financial event (Deposit or Withdrawal).
     * This is executed in the background, not blocking Python threads during execution.
     * Uses atomic writes to ensure ACID compliance across all processes.
     * @param record The transaction_record being logged.
     */
    log_transaction: (record: TransactionRecord) => Promise<void>,

    /**
     * Perform a global financial operation that involves multiple accounts or large sums.
     * This is the main entry point for any "big deal" in this system.
     * @param account_id The ID of the bank account involved.
     * @param amount Amount to transfer (can be negative).
     */
    perform_transaction: (account_id: string, amount: number) => Promise<void>

};

// ============================================================================
// 2. GLOBAL TRANSACTION MANAGEMENT LAYER
// ============================================================================

/**
 * The main event generator for the financial system.
