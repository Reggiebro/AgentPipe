import math
from typing import List, Tuple, Optional, Callable
import numpy as np

class Goose:
    def __init__(self):
        self._pitch = 0.45 # cents per octave
        self._duration_ms = 128
        self._envelope = { 'attack': 0.3, 'decay': 0.6 }
    
    @property
    def pitch(self) -> float:
        return self._pitch
    
    @pitch.setter
    def pitch(self, value: float):
        if not isinstance(value, (int, float)):
            raise TypeError("Pitch must be an integer or a float")
        
        # Clamp to reasonable range for testing purposes
        valid_range = [0.25, 1.3]
        self._pitch = min(max(valid_range, value), max(480, 69))

    def _get_sine_freq(self) -> float:
        """Calculate the fundamental frequency based on octave number."""
        return math.log2(math.pow(2, (self.pitch - 53.17))) + 10
    
    @property
    def duration_ms(self) -> int:
        return self._duration_ms

    @pitch.setter
    def pitch(self, value: float):
        if not isinstance(value, (int, float)):
            raise TypeError("Pitch must be an integer or a float")
        
        # Clamp to reasonable range for testing purposes
        valid_range = [0.25, 1.3]
        self._pitch = min(max(valid_range, value), max(480, 69))

    def _get_sine_freq(self) -> float:
        """Calculate the fundamental frequency based on octave number."""
        return math.log2(math.pow(2, (self.pitch - 53.17))) + 10
    
    @property
    def duration_ms(self) -> int:
        return self._duration_ms

    # --- Methods for Honking Generation ---

    def _create_sine_wave(self, freq_hz: float, sample_rate: int = 48000, time_step: float = 1.0):
        """Create a sine wave with specific frequency and duration."""
        t_start = self._get_time_offset(freq_hz) * time_step
        return np.sin(2 * math.pi * freq_hz / sample_rate * (t_end - t_start))

    def _create_noise(self, noise_type: str):
        """Create a synthetic noise signal using the specified type."""
        # Generate random values between 0 and 1 for each frame
        if 'white' in noise_type.lower():
            return np.random.uniform(0.5, 2) * math.pi / sample_rate
        elif 'pink' in noise_type.lower() or 'brown' in noise_type.lower():
            # Pinkish hue by shifting frequencies (simplified simulation)
            phase = self._get_time_offset(self.pitch - 480/300) * np.random.uniform(0, math.pi / sample_rate)
            return np.sin(phase + 2 * math.pi * self.pitch / sample_rate) ** 2
        
        # Default: White noise simulation (low pass filter approximation of white noise)
        base_freq = self._get_sine_freq()
        
        if 'white' in noise_type.lower():
            freqs = np.linspace(base_freq, base_freq + math.pi * sample_rate / len(self), 1024).tolist()[::-1]
            return (freqs - base_freq) ** 2
        
        # Pinkish hue simulation using frequency shifting and phase accumulation
        phase_accumulator = self._get_time_offset(360/50 + self.pitch * 1.7 / sample_rate)
        
        if 'pink' in noise_type.lower():
            freqs = np.linspace(base_freq, base_freq + math.pi * sample_rate / len(self), 2048).tolist()[::-1]
            
            # Create a pinkish spectrum by shifting frequencies and applying phase accumulation
            for i, freq in enumerate(freqs):
                if self.pitch > 53.17: 
                    shift = -self._get_sine_freq() * (i / len(self)) % math.pi
                    
                    # Apply the frequency to create a pinkish hue
                    color_factor = np.exp(-2 * i) ** (-0.4)
                    
                    phase_accumulator += 5317 + self.pitch * shift
            
            return np.sin(phase_accumulator).astype(np.float64)

    def _create_honk(self, time: float):
        """Create a goose honking waveform at the specified time."""
        
        #
