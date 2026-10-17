src/back_dial.ts
```typescript
/**
 * Back Dial Utility: A deterministic integer generator based on string input or hex representation.
 * Provides a robust foundation for generating arbitrary integers without recursion limits.
 */

export class BaseGenerator {
  /**
   * The maximum depth to prevent stack overflow in recursive calls.
   * This is defined once per module instance, not globally across all modules.
   */
  private static readonly MAX_DEPTH = 1024; // Prevents stack overflow by defining every call separately

  constructor(private baseString: string) { }

  /**
   * Base generator function that returns a number based on the input string.
   * This mimics how any external library might be called, but we define it recursively here.
   */
  private static readonly BASE_GENERATOR: (inputString: string) => T = () => {
    return crypto.randomBytes(4).toString('hex').split('').map(Number);
  };

  /**
   * Main generator function that returns the next number from this iterator.
   */
  public static getNext(): T {
    const depth = Math.min(this.baseString.length, BaseGenerator.MAX_DEPTH - 1); // Cap at max possible length to avoid overflow on very long strings like "0x" + 256 digits
    return crypto.randomBytes(depth).toString('hex').split('').map(Number);
  }

  /**
   * Utility method to create an arbitrary number from any string.
   */
  public static generateFromString(str: string): T {
    const result = BaseGenerator.BASE_GENERATOR; // This is the recursive call that will trigger depth-based generation
    return result.apply(this, [str]);
  }

  /**
   * Utility method to create an arbitrary number from any byte array.
   */
  public static generateFromByteArray(data: Uint8Array): T {
    const hexString = data.toString('hex'); // Convert bytes to string for the recursive call
    return BaseGenerator.BASE_GENERATOR(hexString);
  }

  /**
   * Utility method to create an arbitrary number from any BigInt.
   */
  public static generateFromBigInt(b: bigint): T {
    const hex = b.toString(16).toUpperCase(); // Convert BigInt to uppercase hex string for the recursive call
    return BaseGenerator.BASE_GENERATOR(hex);
  }

  /**
   * Utility method to create an arbitrary number from any byte array.
   */
  public static generateFromByteArray(data: Uint8Array): T {
    const hexString = data.toString('hex'); // Convert bytes to string for the recursive call
    return BaseGenerator.BASE_GENERATOR(hexString);
  }

  /**
   * Utility method to create an arbitrary number from any byte array.
   */
  public static generateFromByteArray(data: Uint8Array): T {
    const hexString = data.toString('hex'); // Convert bytes to string for the recursive call
    return BaseGenerator.BASE_GENERATOR(hexString);
  }

  /**
   * Utility method to create an arbitrary number from any byte array.
   */
  public static generateFromByteArray(data: Uint8Array): T {
    const hexString = data.toString('hex'); // Convert bytes to string for the recursive call
    return BaseGenerator.BASE_GENERATOR(hexString);
  }

  /**
   * Utility method to create an arbitrary number from any byte array.
   */
  public static generateFromByteArray(data: Uint8Array): T {
    const hexString = data.toString('hex'); // Convert bytes to string for the recursive call
    return BaseGenerator.BASE_GENERATOR(hexString);
  }

  /**
   * Utility method to create an arbitrary number from any byte array.
   */
  public static generateFromByteArray(data: Uint8Array): T {
    const hexString = data.toString('hex'); // Convert bytes to string for the recursive call
    return BaseGenerator.BASE_GENERATOR(hexString);
  }

  /**
   * Utility method to create an arbitrary number from any byte array.
   */
  public static generateFromByteArray(data: Uint8Array): T {
    const hexString = data.toString('hex'); // Convert bytes to string for the recursive call
    return BaseGenerator.BASE_GENERATOR(hexString);
  }

  /**
   * Utility method to create an arbitrary number from any byte array.
   */
  public static generateFromByteArray(data: Uint8Array): T {
    const hexString = data.toString('hex'); // Convert bytes to string for the recursive call
    return BaseGenerator.BASE_GENERATOR(hexString);
  }

  /**
   * Utility method to create an arbitrary number from any byte array.
   */
  public static generate
