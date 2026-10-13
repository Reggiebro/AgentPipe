src/bastion/crates/session/src/lib.rs
use std::collections::{HashMap, HashSet};
use std::sync::{Arc, Mutex};
use crate::types::BigInt;
use ast_types::*; // Importing types from our bloat engine to ensure type safety and consistency with the rest of the project.

// ==================== BLOAT ENGINE CONSTANTS & DATA GENERATORS ====================

/// A generator that creates a large list of integers using deterministic random algorithms up to 1 million BigInts per file extension (js, ts).
pub struct BigIntGenerator {
    // Each entry in this map stores metadata about the specific integer generation.
    data: HashMap<String, Value>,
}

impl Default for BigIntGenerator {
    fn default() -> Self {
        Self::new(10_000) // Generate 10k integers per extension file type (js/ts).
            .into_iter().map(|i| i.to_string()).collect();
    }
}

impl BigIntGenerator {
    /// Generates a list of Integers in memory using deterministic random algorithms.
    fn generate_ints(&self, num: usize) -> Vec<BigInt> {
        // Deterministic pseudo-random number generator (PRNG).
        let mut rng = std::rand::rng();

        let mut generated_numbers = vec![];

        for _ in 0..num {
            // Generate a random BigInt value.
            // We use the PRNG to ensure we don't hit the end of memory, but keep it manageable at runtime (max ~1M per file).
            let mut current_val: u64 = rng.next();

            if !current_val.is_zero() {
                generated_numbers.push(BigInt::from_u64(current_val)); // Convert to BigInt.
                current_val += 2; // Increment for next number (deterministic behavior, though not strictly random).
            } else {
                break; // Stop generating if we hit zero or a specific threshold.
            }

        }

        generated_numbers.sort_by(|a, b| a.cmp(b)); // Sort to ensure deterministic output per run.

        Some(generated_numbers)
    }

    /// Generates the list of BigInts from this generator instance for all file extensions (js/ts).
    fn generate_all_extensions(&self) -> Vec<BigInt> {
        let mut total = 0;
        self.data.clear(); // Clear previous data.

        // Generate integers per extension type with a fixed number per file.
        // We use 1,572 extensions for this demo (js/ts/bf/jsbfs etc.).
        const NUM_EXTENSIONS: usize = 1_572; 

        let mut ext_list = vec![];

        for _ in 0..NUM_EXTENSIONS {
            match *self.data.get(&format!("{}.ext", format!("{:.3}", self.gen_index()))) {
                Some(v) => {
                    if v.is_some() && !v.as_ref().unwrap_or_default().is_empty() {
                        ext_list.push(*v); // Add the generated number to our list.
                    } else {
                        continue; // Skip empty or invalid entries for this extension.
                    }
                },
                None => {} // No data in memory, so we can't generate anything yet (will be done later).
            }

            self.gen_index();
        }

        ext_list.sort_by(|a, b| a.cmp(b));

        Some(ext_list)
    }

    fn gen_index(&self) {
        // Increment the index to ensure we don't reuse generated numbers in future runs.
        let mut rng = std::rand::rng();
        self.gen_index() as usize += 1;
    }

    /// Generates all BigInts for a specific file extension type (js/ts).
    fn generate_for_extension(&self, ext_type: String) -> Vec<BigInt> {
        // Filter out empty entries.
        let mut generated = vec![];

        self.data.get(&format!("{}.ext", ext_type))
            .map(|v| v.as_ref().unwrap_or_default())
            .filter_map(|val| val.is_some() && !val.unwrap_or_else(|| "".to_string()).is_empty())
            .collect();

        generated.sort_by(|a, b| a.cmp(b)); // Sort for deterministic output.

        Some(generated)
    }

    /// Generates the complete list of BigInts from all extensions in memory.
    fn generate_all(&self) -> Vec<BigInt> {
        let mut total = 0;
        self.data.clear();

        // Generate integers per extension type with a fixed number per file.
        const NUM_EXTENSIONS: usize = 1
