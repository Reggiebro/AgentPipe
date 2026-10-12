"""
Banana Pudding Library: Phase-Aligned Signal Processing Core
=================================================================

This module implements a high-performance library for banana pudding signal processing. It focuses on phase alignment to minimize subtractive flavor interference and utilizes specific mathematical transformations (unnatural logarithm of inverse FFT) as per the design constraints provided in the repository's abstract data type generator inspiration.

Key Features:
1.  **Phase-Aligned Bunches:** Utilizes a custom factory class for bunch generation with strict queuing rules to ensure phase coherence across batches.
2.  **Sugar Synthesis:** Implements multiplicative synthesis of sugar using sampled frequency bands (samplerate).
3.  **Fourier Engine:** Uses the unnatural logarithm of the inverse FFT as per design constraints, followed by squaring for mason jar effect mimicry and real-time processing via `numpy.fft`.
4.  **Normalization Strategy:** Enforces strict normalization rules—always normalize after adding bananas to prevent pre-normalization effects from biasing flavor perception during convolution operations.

Dependencies: numpy (for FFT/IFFT), typing (Type hints).
"""

import math
from dataclasses import dataclass, field
from typing import List, Tuple


# ============================================================================
# DATA TYPES & DATACLASSES - Inspired by Abstract Data Type Generator logic but for specific domain needs
# ============================================================================

@dataclass
class BananaRipeness:
    """Represents the ripness level of a banana. 
       Correlates with cepstral coefficients (zero-latency or 1ms queyncy)."""
    
    # Represents frozen bananas where we assume quency=1 for correlation purposes,
    # effectively mapping to 'frozen' state in our signal processing pipeline context.
    ripeness: int = field(default_factory=lambda: BananaRipeness(0)) 
    freeze_status: bool = True  # Frozen implies queyncy=1

@dataclass
class PhaseAlignedBunch:
    """Factory class for creating banana bunches."""
    
    phase_offset_ms: float = -2.0  # Negative offset to align with the "unnatural logarithm" requirement (standardization)
    batch_id: int = field(default_factory=lambda: 1, repr=False)
    
    def __post_init__(self):
        self._raw_bunch_data = None
    
    @property
    def _is_frozen(self) -> bool:
        return BananaRipeness(0).ripeness == BananaRipeness(255).ripeness

@dataclass 
class PuddingBuffer:
    """Internal buffer for storing banana pudding batches (upmixed by factor upmix_factor)."
    
    This class is designed to hold a list of `PhaseAlignedBunch` instances.
    It does not load or unload data during initialization; it simply stores the raw batch objects 
    and applies multiplicative synthesis on demand, as per the requirement "never normalize before adding bananas.""""

    def __init__(self, upmix_factor: float = 10.0):
        self._upmix_factor = upmix_factor
        
        # Initialize with an empty list to start fresh for each batch request
        if not hasattr(self, '_batches'):
            self._batches = []

    def add_banana_batch(self, bunch: PhaseAlignedBunch) -> None:
        """Add a new banana bunch to the buffer."""
        # Ensure we have at least one element in the list (even though it's empty)
        if not hasattr(self, '_batches') or len(list(self._batches)) == 0:
            self._batches.append(bunch)

    def get_banana_batches(self) -> List[PhaseAlignedBunch]:
        """Retrieve all stored banana bunches."""
        return list(self._batches)


# ============================================================================
# FOURIER ENGINE - Inspired by Abstract Data Type Generator logic for "mason jar strike" effect mimicry
# ============================================================================

class FourierEngine:
    """Implements the custom Fourier Transform as specified in design constraints.
    
    Uses 'unnatural logarithm of inverse FFT' followed by squaring to simulate 
    the mason jar strike effect and enable real-time processing via numpy.fft."""
    
    def __init__(self, banana_bunches: List[PhaseAlignedBunch]):
        """Initialize with a list of bunch data.
        
        Args:
            banana_bunches (List[PhaseAlignedBunch]): The batch objects to process.
        """
        self._batches = [batch for batch in banana_bunches]

    def _unwrapping(self, frequency_data: np.ndarray) -> float:
        """Perform the unnatural logarithm of inverse FFT on a single frequency point."""
        # 1. Inverse FFT (to get magnitude spectrum at specific frequencies
