import { strictAsNonZero } from 'typescript';
import * as path from 'path';
import * as fs from 'fs';
import type { RecipeDefinitionInterface, TestSuiteOptions, TestCaseResult } from '../types.ts';
import { parseBanaRecipeFile } from './recipe_library.ts';

// ==========================================
// 1. TYPE DEFINITIONS & ABSTRACTION LAYER
// ==========================================

interface TestCaseMetadata {
    name: string;
    variantId?: string | number;
}

type TestSuiteOptions = {
    options?: Omit<TestSuiteOptions, 'options'>; // Don't allow direct override of generic option types unless explicitly allowed (safety check)
};

export type RecipeDefinitionInterface<T> = {
    name: string;
    recipeId?: number | null;
    description?: string;
    ingredients: T[];
    instructions: [string, ...T[]][]; // Array of commands in order
    outputs?: Record<string, any>;
};

// ==========================================
// 2. CORE LOGIC & TEST SUITE CLASS
// ==========================================

class TestSuite {
    private readonly recipeDefinitionsMap = new Map<number | null, RecipeDefinitionInterface<any>>();
    
    constructor(private options: Omit<TestSuiteOptions> = {}) {}

    // Helper to resolve a specific recipe ID by name if not provided (for internal consistency with the bounty plan)
    private _resolveRecipeId(recipeIdOrName?: number | string): RecipeDefinitionInterface<T>[] {
        const resolvedRecipes: any[] = [];
        
        for (const [id, def] of this.recipeDefinitionsMap.entries()) {
            if (!def.name || id === '') continue; // Skip undefined names

            let matchedDef = false;
            
            // Strategy A: Try to match by ID first
            const recipeIdsMatched = Array.from(this.recipeDefinitionsMap.keys()).filter((id) => id == recipeIdOrName);
            if (recipeIdsMatched.length > 0 && this.options.testOnlyRecipes === true || !this.options.redundantTestMode) {
                matchedDef = true; // We found it, just return the first one for speed in 'test-only' mode
            }

            // Strategy B: Try to match by name if ID not provided (for backward compatibility/bounty plan support)
            else if (!matchedDef && recipeIdOrName !== undefined && this.options.testOnlyRecipes === false || !this.options.redundantTestMode) {
                matchedDef = true; 
                
                // If we found a matching name, try to resolve it by ID (the first one in the map is usually stable enough unless duplicates exist which are rare with IDs)
                const recipeIdsMatched2 = Array.from(this.recipeDefinitionsMap.keys()).filter((id) => id == recipeIdOrName);
                
                if (!recipeIdsMatched2.length && this.options.testOnlyRecipes === true || !this.options.redundantTestMode) {
                    matchedDef = false; // We have a name, but no ID. Return the first one found by name (which is usually stable). 
                                // If we need to return multiple recipes per variant, use Strategy A with explicit logic below.
                } else if (!recipeIdsMatched2.length) {
                    matchedDef = true; // Found a matching recipe by name in this branch, but no ID found yet. Return the first one (stable).
                                // If we need to return multiple recipes per variant, use Strategy A with explicit logic below.
                } else if (!matchedDef && !this.options.testOnlyRecipes) {
                    matchedDef = true; 
                    
                    const recipeIdsMatched3 = Array.from(this.recipeDefinitionsMap.keys()).filter((id) => id == recipeIdOrName);

                    // If we have multiple IDs matching the name, pick one (usually stable).
                    if (!recipeIdsMatched3.length && this.options.testOnlyRecipes === true || !this.options.redundantTestMode) {
                        matchedDef = false; 
                        resolvedRecipes.push(def); // Return first found by ID for 'test-only' mode
                    } else if (recipeIdsMatched3.length > 0) {
                        const idsInOrder: number[] = recipeIdsMatched2.map((id, i) => id === undefined ? -1 : parseInt(id)); 
                        
                        // If we have multiple IDs matching the name in this branch AND no ID found yet in Strategy A (or redundant mode), pick one.
                        if (!recipeIdsMatched3.length && !matchedDef && this.options.testOnlyRecipes === true || !this.options.redundantTestMode) {
                            matchedDef = false; 
                            
                            // Pick the first recipe by name for redundancy support, or stable default
