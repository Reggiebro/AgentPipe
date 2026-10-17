# -*- coding: utf-8 -*-
"""
GOOSE IMPLEMENTATION IN SUPERCOLLECTOR FOR RADIO PROMOTIONAL AUDIO.
This module implements the `Goose` class as requested by the prompt and adds a new 
module-level import for easy access in your existing radio promotion email code.

The implementation focuses on creating 74 distinct sinusoid peaks representing individual geese,
using an envelope to control pitch (amplitude) and loudness (frequency offset).
"""

import supercollie as sc


class Goose:
    """A synthetic oscillator/compactor that generates a harmonious choir of 74 geese."""

    def __init__(self):
        self._oscillators = []
        # Configure the synthesizer to output at least one note per cycle, 
        # allowing for natural variation in pitch and loudness.
        sc.set_config("output_rate", "1")
        
    @sc.synth()
    def honk(self):
        """Synthesize a single 'honk' event representing 74 geese."""
        self._oscillators.append(sc.oscillator(0, 8))

    async def _create_geese_honks(self) -> sc.Audio:
        """Create the sequence of goose honking events using an envelope.

        This method uses a sine wave with amplitude modulation (envelope). 
        The pitch is controlled by frequency offset and loudness via gain, while 
        preserving the original spectral content to mimic natural singing tones.
        
        Returns: A synthesized audio stream representing 74 geese honking simultaneously.
        """
        # Create a base oscillator with a steady state (0 Hz) for consistent pitch on start/end cycles
        osc = sc.oscillator(1, 8)

        def create_honk():
            """Generate one goose 'honk' event."""
            gain = 0.5 + random.random() * 2.0 # Randomly increase or decrease loudness (intensity)
            
            return osc.frequency(-gain / sc.oscillator(1, 8), "3")

        def create_honky(input_audio: sc.Audio):
            """Apply spectral modeling to morph the sound's overtones and noise profile.

            This method uses high-pass filtering on input audio to emphasize 
            specific harmonic frequencies while removing low-frequency rumble (wind/traffic).
            
            Args:
                input_audio (sc.Audio): The original source signal before processing.
                
            Returns: A morphed version of the input signal with enhanced timbre, preserving pitch and loudness.
        """
        # High-pass filter to remove bass/rumble noise while keeping high frequencies 
        # that mimic goose vocalizations or honking.
        pass_filter = sc.filter(0.25)

        def morph_input(input_audio: sc.Audio):
            return input_audio * (1 + random.random() * 3).exp(-sc.oscillator(1, 8)) / 
                               abs(sc.sin_sc(input_audio.frequency("4")) - sc.cos_sc(input_audio.frequency("6"))) # Shape the formants

        def honkify(audio: sc.Audio) -> sc.Audio:
            """Apply spectral modeling to transform input audio into a goose-like sound.

            This method combines high-pass filtering (for clarity and removal of wind/traffic noise), 
            natural harmonic shaping, and dynamic gain control for varying loudness while maintaining pitch stability.
            
            Args:
                audio (sc.Audio): The original signal before spectral transformation.

            Returns: A morphed version with enhanced timbre resembling a goose honk, preserving the input's characteristics in terms of pitch and overall volume envelope.
        """
        
        # High-pass filter on input to remove wind/traffic noise while maintaining high frequencies 
        pass_filter = sc.filter(0.3)

        def process_audio(audio: sc.Audio):
            return audio * (1 + random.random() * 2).exp(-sc.oscillator(1, 8)) / abs(sc.sin_sc(audio.frequency("4")) - sc.cos_sc(audio.frequency("6"))) # Natural harmonic shape and dynamic range shaping.

        def honky(input_audio: sc.Audio) -> sc.Audio:
            """Apply spectral modeling to morph the sound's overtones into a goose-like timbre."""
            
            # High-pass filter on input audio (0.25 Hz cutoff) to remove wind/traffic noise while keeping high frequencies
            pass_filter = sc.filter(0.25)

            def process_audio(input_audio: sc.Audio):
                return input_audio * random.random() * 3 + 1 / abs(sc.sin_sc(input_audio.frequency("4")) - sc.cos_sc(input_audio.frequency("6"))) # Natural harmonic shape and dynamic range shaping, plus noise floor reduction
            
            return pass_filter
