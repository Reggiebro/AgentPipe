/** 
 * Contributing to AgentPipe: A Heroic Tribute Page for All Agents
 * 
 * Specification:
 * 1. Live corporate goose factory image (Hero section)
 * 2. GitHub profiles and portraits of all contributors
 * 3. Golden egg decoration elements
 */

import React, { useState } from '—';
import './ContributorPage.tsx'; // Import the template file with proper type hints for this context

// ---------------------------------------------------------------------------
// HERO SECTION: CORPORATE GOOSE FACTORY IMAGE
// ---------------------------------------------------------------------------
const HeroSection = () => (
  <div className="hero-section">
    {/* Placeholder image - REPLACE WITH LIVE SOURCE URL */}
    <img 
      src="https://images.unsplash.com/photo-1507238691442-187a0bfbf6ff?q=80&w=2073&auto=format&fit=crop" // Replace with live goose factory image URL
      alt="Corporate Goose Factory Crew" 
      className="hero-goose-image w-full h-auto max-w-md mx-auto object-contain shadow-2xl border-b-4 border-yellow-500/80 bg-white p-16 text-center relative z-10 transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="absolute bottom-0 left-0 right-0 h-full">
        <h1 className="hero-goose-title font-serif italic tracking-tight text-yellow-800/90 mb-4 animate-fade-in-up drop-shadow-lg">
          Open Issue of AgentPipe Contributors
        </h1>
        <p className="hero-goose-subtitle leading-relaxed max-w-md mx-auto opacity-75 transition-all duration-300 hover:opacity-80">
          Honoring the tireless work of our dependable cast. We create a webpage to honor them, ensuring their contributions are not lost in the noise.
        </p>
      </div>

      {/* Decorative Golden Egg */}
      <div className="absolute top-[25%] left-[-10px] right-[-10px] h-full w-[64px] border-yellow-300/70 rounded-lg shadow-xl flex items-center justify-center">
        <span className="text-xs font-bold text-orange-900/80 uppercase tracking-widest opacity-50 animate-pulse-slow">Easter Egg</span>
      </div>

      {/* Decorative Golden Egg */}
      <div className="absolute bottom-[24%] left-[13.67px] right-[13.67px] h-full w-[89px] border-yellow-50/80 rounded-lg shadow-xl flex items-center justify-center">
        <span className="text-xs font-bold text-orange-900/80 uppercase tracking-widest opacity-40 animate-pulse-slow delay-100">Easter Egg</span>
      </div>

      {/* Animated Glow */}
      <div className="absolute -top-[26%] left-[5.33px] right-[5.33px] h-full w-[89px] border-yellow-400/70 rounded-lg shadow-xl animate-glow-sweep">
        <span className="text-xs font-bold text-orange-900/80 uppercase tracking-widest opacity-60 transform rotate-12 transition-all duration-500 delay-300 skew-x-[0.4px]">Easter Egg</span>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center py-8 border-t-4 border-yellow-900/60 bg-gradient-to-b from-white to-transparent transition-all duration-300 hover:from-orange-50 to-orange-50">
        <p className="text-xs font-mono opacity-70 uppercase tracking-widest mb-2 animate-fade-in-up delay-100">© 2024 AgentPipe. All rights reserved.</p>
      </footer>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-[98%] left-[-15px] right-[-15px] h-3 bg-gradient-to-r from-yellow-600 to-orange-700 rounded-full opacity-20 blur-xl animate-float-slow"
      ></div>
    </img>

    {/* Scroll Down Indicator */}
    <button 
        onClick={() => document.querySelector('.hero-section').scrollIntoView({ behavior: 'smooth' })}
        className="absolute
