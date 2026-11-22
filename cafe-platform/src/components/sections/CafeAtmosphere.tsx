import React from 'react';
import { Sparkles, Compass, Wind, Flame } from 'lucide-react';

export const CafeAtmosphere: React.FC = () => {
  return (
    <section id="atmosphere" className="py-24 bg-[#1C1613] text-[#EDE4DA] relative overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cafe-caramel/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-cafe-amber/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A1E18] text-cafe-amber text-xs font-semibold tracking-wider uppercase border border-cafe-amber/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Physical Sanctuary</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            An Architectural Space Designed for <span className="italic font-normal text-cafe-caramel">Sensory Connection</span>.
          </h2>
          <p className="text-base text-[#BBAAA0] leading-relaxed">
            Every material inside our roastery—from oiled walnut counters and cast iron roasters to warm travertine tables—is designed to slow down time.
          </p>
        </div>

        {/* Space Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: The Espresso Bar */}
          <div className="group rounded-2xl bg-[#241B16] border border-[#3A2D25] overflow-hidden hover:border-cafe-caramel transition-all duration-300">
            <div className="h-64 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
                alt="Espresso Bar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241B16] via-transparent to-transparent opacity-80" />
            </div>
            <div className="p-6 space-y-3">
              <span className="text-xs uppercase tracking-widest text-cafe-amber font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                The Extraction Bar
              </span>
              <h3 className="font-serif text-xl font-bold text-white">Custom Slayer Espresso</h3>
              <p className="text-xs text-[#BBAAA0] leading-relaxed">
                Handcrafted dual-boiler machines operating at 9 bars of pressure with custom wooden steam toggles and calibrated group heads.
              </p>
            </div>
          </div>

          {/* Card 2: The Cupping Room */}
          <div className="group rounded-2xl bg-[#241B16] border border-[#3A2D25] overflow-hidden hover:border-cafe-caramel transition-all duration-300">
            <div className="h-64 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
                alt="Slow Coffee Cupping Station"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241B16] via-transparent to-transparent opacity-80" />
            </div>
            <div className="p-6 space-y-3">
              <span className="text-xs uppercase tracking-widest text-cafe-amber font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                The Roasting Laboratory
              </span>
              <h3 className="font-serif text-xl font-bold text-white">Origin Cupping Table</h3>
              <p className="text-xs text-[#BBAAA0] leading-relaxed">
                Weekly public cuppings evaluating bean density, moisture, roast development profiles, and aromatic fragrance notes.
              </p>
            </div>
          </div>

          {/* Card 3: The Sunlit Nooks */}
          <div className="group rounded-2xl bg-[#241B16] border border-[#3A2D25] overflow-hidden hover:border-cafe-caramel transition-all duration-300">
            <div className="h-64 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                alt="Cafe Interior Seating"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241B16] via-transparent to-transparent opacity-80" />
            </div>
            <div className="p-6 space-y-3">
              <span className="text-xs uppercase tracking-widest text-cafe-amber font-bold flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5" />
                Quiet Corners
              </span>
              <h3 className="font-serif text-xl font-bold text-white">Travertine & Warm Light</h3>
              <p className="text-xs text-[#BBAAA0] leading-relaxed">
                Floor-to-ceiling windows letting morning sun wash across acoustic timber panels and private library corners.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
