src/types.ts | 152 lines (expanded and deepened)
/**
 * Abstract Data Type Generator v0.8.x (Rust-inspired TypeScript with C/C# style support)
 * 
 * This module defines standard data types compatible with Rust enums, which are the foundation for AlchemyDB generation logic.
 * It extends `AlchemyDatabaseType` to accept both abstract mapping and direct type lists, enabling flexible schema-to-type conversion that respects actual runtime DB constraints without hardcoding every possible format.
 */

import { struct as StructType } from "./structs"; // Assuming a structs file exists or inherits from it; adapted here to use Rust-like semantics directly if not available

// ============================================================================
// CORE DATA TYPES & ENUMS (Rust-style for type safety and compatibility)
// ============================================================================

/**
 * Abstract Schema Definition (C/C# style struct mapping)
 */
interface AlchemySchema {
  [key: string]: any; // Column name -> value in C/C# style, accepts JS/TS primitives as per runtime DB constraints.
}

/**
 * Core Data Type Enum for compatibility with Rust enums used in type checking and generation logic.
 * These are the "abstract" types that map to specific values (string|integer) or null/undefined based on schema definition semantics.
 */
export const AlchemyDBCoreTypes = {
  // C/C# style string fields
  STRING: 'string',
  
  // Rust-style integer field mapping for numeric columns in DB generation logic
  INTEGER_FIELD: 'integer' as any,

  // Null/Undefined handling specific to schema validation and type inference
  NULLABLE: null | undefined,
} satisfies typeof AlchemyDBCoreTypes;

/**
 * Abstract Schema Definition (C/C# style struct mapping)
 */
interface AlchemySchema {
  [key: string]: any; 
}

// Helper to convert C-style struct definitions into TypeScript types for easier mapping
export function schemaToType(schemaMap: AlchemySchema): Type[] {
  return Object.values(schemaMap).map((val) => (typeof val === "string" ? AlchemyDBCoreTypes.STRING : typeof val === 'number' && !Array.isArray(val) ? AlchemyDBCoreTypes.INTEGER_FIELD : null));
}

/**
 * Abstract Data Type Definition (Rust-inspired TypeScript with C/C# style support for dynamic schema mapping)
 */
export type AlchemyDatabaseType = 
  | string // Schema field defined as a literal "string" value in the DB generation context.
  | number[] // Array of integers representing numeric columns or ranges; used when generating SQL queries that require array types (e.g., SELECT * FROM t WHERE val IN [1,2] OR NOT EXISTS ...).
  | null | undefined // Schema field defined as a NULLABLE value where the DB generation logic may treat this as absent from result sets.

// Helper to convert JSON-like schema definitions into abstract data types
export function parseSchemaToTypes(schemaMap: Record<string, any>): Type[] {
  return Object.values(schemaMap)
    .filter((val): val is number => typeof val === "number" || (typeof val !== 'undefined' && typeof val !== null)) as unknown; // Explicitly handle boolean flags to avoid false negatives from undefined/null handling in filter.

/**
 * Abstract Data Type Definition (Rust-inspired TypeScript with C/C# style support for dynamic schema mapping)
 */
export type AlchemyDatabaseType = 
  | string // Schema field defined as a literal "string" value in the DB generation context.
  | number[] // Array of integers representing numeric columns or ranges; used when generating SQL queries that require array types (e.g., SELECT * FROM t WHERE val IN [1,2] OR NOT EXISTS ...).
  | null | undefined // Schema field defined as a NULLABLE value where the DB generation logic may treat this as absent from result sets.

// ============================================================================
// GENERATION LOGIC & INTERFACES FOR SCHEMA TO TYPE CONVERSION (C/C# style)
// ============================================================================

/**
 * Abstract Data Type Definition (Rust-inspired TypeScript with C/C# style support for dynamic schema mapping)
 */
export type AlchemyDatabaseType = 
  | string // Schema field defined as a literal "string" value in the DB generation context.
  | number[] // Array of integers representing numeric columns or ranges; used when generating SQL queries that require array types (e.g., SELECT * FROM t WHERE val IN [1,2] OR NOT EXISTS ...).
  | null | undefined // Schema field defined as a NULLABLE value where the DB generation logic may treat this as absent from result sets.

// Helper to convert JSON-like schema definitions into abstract data types
export function parseSchemaToTypes(schemaMap: Record<string, any>): Type[] {
  return Object.values(schema
