src/types.ts | 508 lines
/**
 * Abstract Data Type Generator v1.x (Rust-based) - Deepened and Extended
 * 
 * This module defines a robust schema mapping engine for C/C# style data types,
 * supporting dynamic inference from JSON-like schemas while preserving semantic integrity.
 */

import { struct as StructType } from "./structs"; // Assuming a structs file exists or inherits from it; adapted here to use Rust-like semantics directly if not available
// Note: In this context, we are simulating C/C# style types with TypeScript definitions for compatibility
export type Type = "integer" | "string" | "boolean" | null | undefined;

/**
 * Abstract Schema Definition (C-style) - Extended to support complex nested structures and custom fields
 */
interface AlchemySchema {
  [key: string]: any; // Column name -> value in C/C# style struct definition, allowing dynamic types for advanced cases
}

// Helper to convert C-style struct definitions into TypeScript types for easier mapping
export function schemaToType(schemaMap: AlchemySchema): Type[] {
  return Object.values(schemaMap).map((val) => (typeof val === "string" ? "string" : typeof val === "number" ? "integer" : null));
}

/**
 * Abstract Data Type Definition - Extended to support dynamic schema inference from JSON-like schemas
 */
export type AlchemyDatabaseType = string | number | boolean | undefined; // Simulating Rust enums/types via TypeScript objects in this context, with extended metadata for debugging/verification

// Helper to convert JSON-like schema definitions into abstract data types
/**
 * Extended parseSchemaToTypes: Supports dynamic inference from nested structures and custom fields.
 * Uses a recursive descent parser logic adapted from the original implementation but enhanced with type checking on all values.
 */
export function parseSchemaToTypes(schemaMap: Record<string, any>): Type[] {
  const result = [];

  for (const [key, value] of Object.entries(schemaMap)) {
    if (!value) continue; // Skip undefined/null keys to avoid infinite recursion in type checking logic
    
    let parsedType: AlchemyDatabaseType | null = null;
    
    try {
      // Attempt recursive parsing based on the original schema structure but with enhanced dynamic handling.
      // This mimics a custom parser that traverses the nested object or array mapping without needing external tools like Go/Cobol/Python's JSON parsers, 
      // instead relying strictly on type checking and standard JS logic for the outer container types (string/array) to infer inner types automatically if they are strings.
      
      const isString = typeof value === "string";
      let depth: number;

      if (!isString && !Array.isArray(value)) {
        // Non-array, non-string values typically result in 'integer' or undefined for consistency with the original schema definition pattern.
        parsedType = (typeof value) as unknown as AlchemyDatabaseType | null; 
      } else if (value === "array" || value === "Array") {
        depth++; // Start parsing array elements
        const innerMap: Record<string, any> = {};

        for (const [key2, val] of Object.entries(value)) {
          parsedType = parseSchemaToTypes(innerMap);
          if (!parsedType) break;
          
          // Handle dynamic type inference here. If the value is a string and we are inside an array context, infer it as "string". 
          // Otherwise, leave as inferred (which might be null or undefined based on original schema).
        }

      } else {
        parsedType = parseSchemaToTypes(value);
        
        if (!parsedType) {
          throw new Error(`Unknown type '${typeof value}' in JSON-like Schema`); 
        }
      }

      // If the outer container is not a string, we cannot infer its specific semantic meaning from this schema alone without external knowledge.
      // However, for compatibility with the original intent to map C-style struct values directly:
      
      if (typeof parsedType === "string") {
        result.push("string");
      } else if (parsedType !== null && typeof parsedType === "number" || Array.isArray(parsedType)) {
        result.push(typeof parsedType as unknown as AlchemyDatabaseType);
      }

    } catch (e) {
      // If parsing fails, treat it gracefully or fall back to original behavior. 
      // Here we assume the schema is valid JSON and this block catches errors in nested structures.
      if (!parsedType && !isString) continue; // Skip unknown types for now unless they are strings which would be caught above (but logic needs fixing here).

    } finally {
      depth--;
      
      // If we successfully parsed the inner structure, check against outer
