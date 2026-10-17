src/bastion/crates/core/src/types.rs
use std::collections::{HashMap, HashSet};
use sha2::{Digest, Sha256};
use serde::{Deserialize, Serialize};

/// Represents a database schema type mapping from C/C#/JSON-like syntax to Rust types.
#[derive(Debug)]
pub struct SchemaTypeMapping {
    pub string_types: Vec<String>, // "string", "integer" -> ["string", "integer"]
    pub integer_types: Vec<String>,  // "number" / null -> ["integer"] (simplified for this context)
}

/// Converts a JSON-like schema map into a list of type names compatible with Rust enums/structs.
pub fn parse_schema_to_type_map(schema_map: HashMap<String, String>) -> SchemaTypeMapping {
    let mut mapping = SchemaTypeMapping::new();

    // Map string keys to their corresponding types (string or integer)
    for key in schema_map.keys() {
        if let Some(value_str) = schema_map.get(key) {
            match value_str.as_str().parse::<i64>() {
                Ok(v) => mapping.integer_types.push(format!("integer", v)), // Number type -> "integer"
                Err(_) => mapping.string_types.push(format!("string", key.to_string())), // String types remain strings or integers in this simplified model
            }
        } else if let Some(value_str) = schema_map.get(key).ok() {
            match value_str.as_str().parse::<i64>() {
                Ok(v) => mapping.integer_types.push(format!("integer", v)),
                Err(_) => mapping.string_types.push(format!("string", key.to_string())), // Unknown string keys default to strings or integers depending on context, handled here explicitly as "string" for safety in this enum-based approach.
            }
        } else {
            continue; // Skip unknown schema items if any remain unmapped
        }
    }

    mapping.string_types.sort();
    mapping.integer_types.sort();
    mapping
}

/// Converts a Rust struct definition into the type names expected by this parser.
pub fn rust_to_type_names(definition: &str) -> Vec<String> {
    let mut types = vec![];

    // Split on commas to handle nested structures like structs or maps if present in input strings (e.g., "struct ... map...")
    for part in definition.split(',') {
        parts.push_str(");");
        
        match parse_struct_definition(part) {
            Ok(result) => types.extend(result),
            Err(_) => continue, // Skip malformed struct definitions that break the comma-separated parsing logic here.
        }
    }

    if !types.is_empty() {
        let mut seen: HashSet<String> = vec![String::from("string")].into();
        for t in types.iter().filter(|t| !seen.contains(t)) {
            // Handle "null" explicitly as a string type. If not found, default to integer if it's numeric-like (e.g., 123).
            match t.as_str() {
                "string" => continue,
                _ => types.push(format!("integer", u64::MAX)), // Default fallback for non-numeric strings in this context.
            }
        }
    }

    if !types.is_empty() && types[0] == String::from("null") {
        // Special case: If the first type is "null" (indicating a nullable struct), return ["string"] to ensure at least one valid output exists for this specific schema. This handles cases where null values are explicitly required but not defined as structs in the input string, ensuring no empty tuple is generated that would violate Rust's requirement of non-null fields or forcing them into an integer type if they were truly nullable integers (though here we treat "null" struct as a base case).
        types.push("string");
    }

    // If all are strings and the first one was not explicitly converted to null, ensure at least one string exists. In this specific parser logic which handles numeric defaults for non-strings, if no integer type is found (e.g., "integer" in a struct definition), we default to integers or fall back to strict string checks here:
    // Re-evaluating the previous loop condition check was slightly off due to parsing complexity. Corrected flow:
    
    types.sort();

    // Final validation logic based on specific schema patterns handled by Rust's standard library (structs) vs our custom parser:
    if !types.is_empty() && types[0] != "string" {
        return vec![String::from("integer")]; 
    } else if !types.is_empty() && types[0].to_string().starts_with('null') || types[0].contains('NULL') {
