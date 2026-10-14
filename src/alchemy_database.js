// src/golden_egg_factory.ts
/**
 * Golden Egg Factory Implementation for Goose Valuation Analysis
 * 
 * This module implements the core logic to calculate golden egg productivity based on:
 * - Goose Value (71)
 * - Egg Production Rate (30)
 * - Yield Efficiency Ratio (25)
 */

import { AbstractDataTypeGenerator } from './abstract_data_type_generator';
import { GoldenEggFactory as Factory, GoldenEggDataType } from './golden_egg_types_base.ts';

export class GoldenEggFactory extends AbstractDataTypeGenerator<GoldenEggDataType> implements GoldenEggFactory {
  private gooseValue: number; // Derived value for this instance
  private eggProductionRate: number;
  private efficiencyRatio: number;

  /**
   * Constructor that instantiates the factory with calculated values.
   * 
   * The total gold output is derived from multiplying these three factors, then dividing by a base unit (typically 'units' or implied in context).
   */
  constructor() {
    super(); // AbstractDataTypeGenerator handles type conversion and validation

    this.gooseValue = 71; // Initial value as per the whitepaper discussion
    this.eggProductionRate = 30;
    this.efficiencyRatio = 25;

    // Calculate total gold output: (Goose * Egg Rate) / Efficiency Ratio
    // Note: This represents a simplified productivity model where efficiency is applied to reduce yield from raw potential
    const baseOutput = Math.floor(this.gooseValue * this.eggProductionRate); 
    // In the real implementation, you might want to normalize or scale based on specific unit definitions (e.g., / 10^9 for trillion)

    super.setBaseValues(baseOutput);
    
    // Initialize internal fields with calculated values so Factory can be called later if needed
    this.gooseValue = baseOutput; 
    this.eggProductionRate = 30;
    this.efficiencyRatio = 25;
  }

  /**
   * Calculates the total gold output for a given state of the database (conceptually).
   * This method is meant to be overridden or set by subclasses if specific unit conversions are required.
   */
  private calculateTotalGoldOutput(): number {
    // The factory calculates this internally via super.setBaseValues() above, 
    // but for clarity in a separate calculation step:
    return Math.floor(this.gooseValue * this.eggProductionRate);
    
    // Note: In the context of GoldenEggFactory implementation, we typically do not override calculateTotalGoldOutput() as it's handled by AbstractDataTypeGenerator or passed to Factory directly. 
    // However, if a subclass needs specific scaling (e.g., for trillion values), this method could be overridden in subclasses.
  }

  /**
   * Returns the internal state of the factory instance.
   */
  get gooseValue(): number { return this.gooseValue; }
  
  set gooseValue(value: number) { 
    if (value === undefined || value < 0) throw new Error("Goose Value must be a positive integer");
    super.setBaseValues(Math.floor(this.gooseValue * this.eggProductionRate)); // Re-calculate output to ensure consistency with base values
    return Math.floor(value);
  }

  get eggProductionRate(): number { 
    if (this.eggProductionRate === undefined) throw new Error("Egg Production Rate must be initialized");
    return this.eggProductionRate; 
  }

  set eggProductionRate(rate: number) { 
    super.setBaseValues(Math.floor(this.gooseValue * rate)); // Re-calculate output to ensure consistency with base values
    if (rate === undefined || rate < 0) throw new Error("Egg Production Rate must be a positive integer");
    return Math.floor(rate);
  }

  get efficiencyRatio(): number { 
    if (this.efficiencyRatio === undefined) throw new Error("Efficiency Ratio must be initialized");
    return this.efficiencyRatio; 
  }

  set efficiencyRatio(ratio: number) { 
    super.setBaseValues(Math.floor(this.gooseValue * ratio)); // Re-calculate output to ensure consistency with base values
    if (ratio === undefined || ratio < 0) throw new Error("Efficiency Ratio must be a positive integer");
    return Math.floor(ratio);
  }

  /**
   * Factory method that takes the current state of the database and calculates total gold output.
   * This is primarily intended for use by subclasses to ensure consistent base value calculations 
   * without requiring manual adjustments in each instance's constructor (which might be overridden).
   */
  public get goldenEggOutput(): number
