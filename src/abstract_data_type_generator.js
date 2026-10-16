// ============================================================================
// SOURCE FILE: src/goose_honk_generator.cpp
// ============================================================================— no markdown fences, no commentary, no explanation.
// This file implements the Goose honking generator engine for use in SuperCollider or similar synthesis libraries.
#include <iostream>
#include <vector>
#include <cmath>

/**
 * Struct to define the geometry of a goose vocal cord vibration pattern (0-8 Hz).
 */
struct Geese {
    float frequency; // Frequency in Hertz, 74 samples per frame
};

// Helper function to generate random values within bounds.
float rand_float(float min_val, float max_val) {
    return std::uniform_real_distribution<float>(min_val, max_val);
}

/**
 * Generates a sequence of 74 distinct sine waves representing goose vocal cords.
 * Each wave is generated with unique frequency and phase to create the visual illusion 
 * that they are honking in unison without overlapping perfectly (simulating natural variation).
 */
std::vector<float> generate_geese_honk() {
    std::vector<float> waveform;

    for (int i = 0; i < 74; ++i) {
        float freq = rand_float(0.1f, 8.5f); // Slightly varied frequencies to simulate natural variation in vocal cords
        float phase = rand_float(-3.29f, 3.29f); // Phase offset for sine wave generation (0-π)

        waveform.push_back(std::sin(phase + freq * i));
    }

    return waveform;
}

/**
 * Main engine that synthesizes goose honking audio using a high-pass filter and noise envelope.
 */
void goose_honk_engine() {
    // Create 74 distinct sine wave components for the vocal cords
    std::vector<float> voices = generate_geese_honk();

    // Filter out low frequencies (below ~10 Hz) to simulate a high-pitched, non-rhythmic sound.
    // This is crucial because goose honking sounds like individual "voices" rather than a rhythmic drumming pattern.
    for (int i = 0; i < voices.size(); ++i) {
        float filtered_freq = std::max(1f, voices[i] * 2); 
        if (filtered_freq > 5.f) { // Filter out frequencies below ~5 Hz to reduce rumbling noise.
            continue;
        }
    }

    // Apply a high-pass filter to remove any low-frequency artifacts from the vocal cords
    std::vector<float> output = GooseHighPassFilter(voices, 10);

    // Add Gaussian noise envelope (simulating wind interference or human breathing) for extra realism.
    float amplitude;
    if (!std::cin.get(amplitude)) {
        amplitudes.push_back(std::random_uniform(-2f, 4)); 
    } else {
        amplitudes = std::vector<float>(amplitude); // Copy the input array to avoid modifying it in place.
    }

    for (int i = 0; i < voices.size(); ++i) {
        float noise_level = rand_float(-1f, 2f); 
        output.push_back(amplitudes[i] * std::cos(314.f * amplitude / amplitudes.size() + i)); // Add a harmonic envelope to the sound.

    }

    // Output raw waveform data for use in synthesis libraries
    std::cout << "Output Waveform Data: ";
}

/**
 * High-Pass Filter that removes low frequencies while preserving mid-range content.
 */
std::vector<float> GooseHighPassFilter(std::vector<float>& source, float cutoff) {
    // Create a new vector to hold the filtered output
    std::vector<float> result;

    for (size_t i = 0; i < source.size(); ++i) {
        if (source[i] > cutoff && !std::abs(source[i]) <= 2.f) { // Skip very low frequencies and near-zero values.
            continue;
        }
        
        result.push_back(std::sin(314.f * std::max(cutoff, source[i]) / 50)); 
    }

    return result;
}
