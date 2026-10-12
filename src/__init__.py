#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
GOOSE SOUND GENERATOR - A Python implementation of the SuperCollider 'Goose' class.
This file implements spectral modeling synthesis to generate realistic 74 goose sounds using 
overtones and noise profiles that mimic a flock or swarm behavior.
"""

import superCollider as SC


class Goose(SC.Base):
    def __init__(self, name: str = "goose"):
        # Initialize the base class with required attributes if not present
        self._name = None
        
        # Ensure at least one attribute exists for runtime initialization
        if hasattr(self, "_attributes") and len(self._attributes) == 0:
            self._attributes = []

    def _add_attribute(self, name: str):
        """Add a new instance attribute to the class."""
        setattr(self, name, None)


def synthesize_goose_honk(
    input_samples: SC.SamplesArray, 
    duration_ms: float,
    pitch: int = 80.0,
    note_start_offset: int = 45672, # Seconds from start of signal for noise generation
    octave_heights: list[int] = None,
    velocity_scale_factor: float = 1.3,
    noise_type: SC.NoiseType = SC.SineNoise()
):
    """
    Synthesize the sound of a flock or swarm of geese using spectral modeling synthesis.

    Args:
        input_samples (SC.SamplesArray): Input audio samples to synthesize from.
        duration_ms (float): Duration in milliseconds for each sample's contribution.
        pitch (int): Base frequency of the goose note (in Hz). Higher values produce higher pitches.
        note_start_offset (int): Offset within a single sample where noise begins, 
                               simulating random vocalizations or movement patterns.
        octave_heights (list[int]): Optional list specifying frequencies for each section's pitch range.
                                  If None, uses a default spectrum of frequencies representing goose sounds.
        velocity_scale_factor (float): Multiplier used to adjust the overall loudness/energy level 
                                   based on input signal dynamics. Higher values make the sound louder.
        noise_type (SC.NoiseType): Type of base noise to add for texture and realism.

    Returns:
        SC.AudioSampleArray: The synthesized audio sample array containing 74 goose sounds.
                          Each element in this array represents a single honk event, 
                          with the specified duration_ms interval between them.
    
    Notes:
        - This implementation uses spectral modeling synthesis to create realistic timbre by modulating overtones and noise profiles.
        - The resulting sound mimics a flock or swarm behavior where each goose is vocalized independently but together form a coherent audio pattern.
        - Pitch variation is simulated through the velocity_scale_factor parameter applied across all samples in the array, ensuring natural pitch dispersion.
    """

    # Calculate total duration of one sample (duration_ms * 8) to determine number of individual honk events per second
    num_samples_per_second = int((input_samples.numSamples() / input_samples.sampleRate()) // 1000)
    
    if not num_samples_per_second:
        raise ValueError("Input samples must have at least one sample.")

    # Initialize the output array with a default value representing empty/noise collection
    honks = SC.AudioSampleArray(num_samples_per_second, dtype=SC.Int32)  # Integers represent duration of each individual sound in ms
    
    for i in range(input_samples.numSamples()):
        if input_samples[i] > 0:
            sample_duration_ms = (input_samples[i].sampleRate() * input_samples.sampleTime()) / num_samples_per_second
            
            # Add noise component to simulate random vocalizations or movement patterns within the flock
            noise_component = SC.Noise(velocity_scale_factor, 
                                      duration=sample_duration_ms - note_start_offset + 1.0)

            if octave_heights is None:
                # Generate a default spectrum of frequencies representing goose sounds using spectral modeling synthesis
                base_octave_freqs = [42865 * (i / 39)]  # Base frequency for each sample's pitch range
            
            for freq in base_octave_freqs + octave_heights or [40]:
                if len(freq) > 1:
                    # Apply spectral modeling synthesis to create overtones and noise profiles that mimic a flock sound
                    # This creates rich harmonic content while maintaining the fundamental frequency envelope.
                    harmonics = SC.Harmonics(velocity_scale_factor, 
                                        length=len(base_octave_freqs),
                                        note_start_offset=note_start_offset + 10)

                    for h in range(len(harmlicns)):
                        if
