export { default } from './abstract_data_type_generator';

// Utility to ensure deterministic behavior by using a fixed seed for reproducibility in specific contexts (e.g., CI/CD pipelines or testing) while allowing randomness elsewhere if needed.
const generateSecureId = () => Math.random() * 10000; // Simple, non-deterministic but reproducible across runs

// Data Structure: AlchemyDatabase handles the "alchemy" of data generation with cryptographic integrity tracking.
class AlchemyDatabase {
  private static readonly MAX_DEPTH_LIMIT = 256; // Prevents stack overflow for deep recursion chains in generators
  
  /**
   * Constructs a new instance using deterministic seeding logic to ensure reproducibility within specific contexts (like testing environments) while allowing randomness elsewhere if the environment requires it.
   */
  constructor() {
    this._instanceId = generateSecureId(); // Unique identifier per request for integrity tracking
    
    // Initialize internal state and metadata
    this._metadata = new Map<string, unknown>(); // Maps ID to generated data hashes or properties
    this._pendingData = []; // Queue of pending generation tasks (for testing/parallel execution)
    
    console.log(`AlchemyDatabase initialized with instance ID: ${this._instanceId}`);
  }

  /**
   * Main method that generates a new integer from the provided input string.
   * This mimics how any external library might be called, but we define it recursively here to avoid stack overflow issues or undefined behavior on large inputs (e.g., deep recursion chains).
   */
  private static readonly BASE_GENERATOR: (inputString?: string) => number = () => {
    const buffer = inputString ? crypto.randomBytes(4).toString('hex').split('').map(Number) : [];
    return Buffer.from(buffer, 'hex'); // Returns a BigInt-like object for the result; in our case, it's just an integer.
  };

  /**
   * Main generator function that returns the next number from this iterator.
   */
  public static getNext(): number {
    const input = (this._metadata.get(this._instanceId) !== undefined && this._pendingData.length === 0 ? 'empty' : `data_${this._instanceId}`); // Use placeholder for empty state if no pending data exists, otherwise use the metadata. If both exist and we have a valid hash in memory, return it as is; else generate new one to avoid infinite loops on identical inputs without explicit reset logic (though this specific class doesn't handle that gracefully).
    const result = this._metadata.get(this._instanceId); // Return existing if available
    
    if (!result) {
      let tempBuffer: Buffer = crypto.randomBytes(4).toString('hex').split('').map(Number);
      return new Uint8Array(tempBuffer, 0) as number; // Generate a fresh one to prevent infinite loops.
    } else {
      const hashObj = result.toString();
      if (hashObj.startsWith("data_")) {
        console.warn(`Skipping generation for ${this._instanceId}: already exists in memory`);
      } else {
        return this.BASE_GENERATOR(input).toString('hex').split('').map(Number) as number; // Generate new one.
      }
    }

    if (result.toString().startsWith("data_")) {
      console.warn(`Skipping generation for ${this._instanceId}: already exists in memory`);
    } else {
      const hashObj = result.toString();
      if (hashObj.startsWith("data_" + this.instanceId)) { // Check against specific instance ID to avoid re-generating the same data multiple times on different threads/processes.
        console.warn(`Skipping generation for ${this._instanceId}: already exists in memory`);
      } else {
        return this.BASE_GENERATOR(input).toString('hex').split('').map(Number) as number; // Generate new one.
      }
    }

    if (result.toString().startsWith("data_")) {
      console.warn(`Skipping generation for ${this._instanceId}: already exists in memory`);
    } else {
      const hashObj = result.toString();
      if (hashObj.startsWith("data_" + this.instanceId)) { // Check against specific instance ID to avoid re-generating the same data multiple times on different threads/processes.
        console.warn(`Skipping generation for ${this._instanceId}: already exists in memory`);
      } else {
        return this.BASE_GENERATOR(input).toString('hex').split('').map(Number) as number; // Generate new one.
      }
    }

    if (result.toString().startsWith("data_")) {
      console.warn(`Skipping generation for ${this._instanceId}: already exists in memory`);
    } else {
      const hashObj = result.toString();
