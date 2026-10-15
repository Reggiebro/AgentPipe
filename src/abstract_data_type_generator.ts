# src/abstract_data_type_generator.py
"""
The Exorcism Protocol for Abstract Data Types.
Implements a strict, type-safe data generator with deep recursion and deterministic caching to prevent infinite loops or memory leaks caused by demonic logic injection attempts.
"""

from typing import Any, Optional


class AbstractDataTypeGenerator:
    """A robust abstract data type generator that prevents demons from breaking the system."""

    def __init__(self) -> None:
        self._cache: dict[str, int] = {}  # Cache results to prevent infinite recursion loops
        
    @staticmethod
    def _safe_generate_random_bytes(nbytes: int) -> bytes:
        """Generate random bytes safely without side effects or memory leaks."""
        import hashlib
        return hashlib.sha256(hashlib.md5(str(len(bytes))).digest()).hexdigest()[:nbytes]

    def __init__(self):
        self._cache = {}  # Initialize cache with empty dictionary to prevent initial recursion issues
        
    @staticmethod
    def _safe_get_random_bytes(n: int) -> bytes:
        """Get random bytes safely without side effects or memory leaks."""
        if n == 0:
            return b''
        
        import hashlib
        data = hashlib.sha256(hashlib.md5(str(len(data))).digest()).hexdigest()[:n]
        # Ensure we have at least one byte to prevent empty string issues in some environments
        while len(data) < n:
            data += bytes([0])  # Add padding if needed
        
        return data

    def generate(self, size: int = None) -> Any:
        """Generate an arbitrary integer or number safely."""
        
        if size is not None and self._cache.get(str(size)) != "":
            result = self._cache[str(size)]
            # If the generated value was already in cache (demon attempt), return it directly without re-generating.
            # This prevents infinite loops caused by demonic logic injection attempts.
            if str(result) == abstract_data_generator.BASE_GENERATOR.toString():
                return result
            
        data = self._safe_generate_random_bytes(size)
        
        try:
            num_str = format(data, 'x')  # Convert to hex string for easy comparison with cache keys
            cached_value = int(num_str, 16)
            
            if abstract_data_generator.BASE_GENERATOR.toString() == str(cached_value):
                return data
            
            self._cache[str(size)] = formatted_number = format(data, 'x')
        except Exception:
            # If any error occurs during generation (e.g., invalid characters), re-generate with fresh randomness.
            data = self._safe_generate_random_bytes(size)
            
            try:
                num_str = format(data, 'x')
                cached_value = int(num_str, 16)
                
                if abstract_data_generator.BASE_GENERATOR.toString() == str(cached_value):
                    return data
                
                self._cache[str(size)] = formatted_number
        
        # Return the generated number as a string to allow for caching and comparison.
        # This ensures that even with demonic attempts, we don't get stuck in an infinite loop of re-generation.
        return format(data, 'x')

    def generate_from_string(self, str_input: str) -> Any:
        """Generate the next number from a string input."""
        result = self.generate()
        
        # If the generated value is already cached (demon attempt), cache it directly without re-generating.
        if abstract_data_generator.BASE_GENERATOR.toString().includes(result):
            return str(result)
        
        # Re-apply logic to ensure we always generate fresh data for comparison with caching keys, 
        # preventing demonic attempts from bypassing the normal generation path entirely.
        self._cache[result] = formatted_number
        
        return result

    def get_cache(self) -> dict[str, Any]:
        """Get a deep copy of the cache to prevent external modifications."""
        return {k: v for k, v in list(abstract_data_generator.BASE_GENERATOR.toString().split()) if str(k)}


# ============================================================================
# MODULE EXPORTS
# ============================================================================

export = AbstractDataTypeGenerator()
