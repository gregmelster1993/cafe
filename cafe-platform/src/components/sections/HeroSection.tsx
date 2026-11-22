import React from 'react';
import { HeroCanvas } from '../3d/HeroCanvas';
import { ArrowRight, Compass } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cafe-caramel/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cafe-amber/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Copy & Actions (7 Cols) */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cafe-paper border border-cafe-line shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cafe-caramel animate-ping" />
              <span className="text-xs uppercase tracking-wider font-semibold text-cafe-caramel">
                Artisanal Specialty Coffee
              </span>
            </div>

            {/* Cinematic Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cafe-ink leading-[1.08]">
              Where Precision Craft Meets <span className="italic font-normal text-cafe-caramel">Warm Atmosphere</span>.
            </h1>

            {/* Narrative Paragraph */}
            <p className="text-base sm:text-lg text-cafe-muted leading-relaxed max-w-xl">
              Immerse yourself in our sensory cafe space. From single-origin beans roasted on-site to hand-laminated morning pastries, every detail is engineered for pause and appreciation.
            </p>

            {/* Conversion CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#211610] text-[#FFF8F0] font-medium hover:bg-cafe-caramel transition-all shadow-cafe hover:shadow-glow group"
              >
                <span>Explore Signature Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#location"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-cafe-paper text-cafe-ink font-medium border border-cafe-line hover:border-cafe-caramel transition-all shadow-sm"
              >
                <Compass className="w-4 h-4 text-cafe-caramel" />
                <span>Visit & Reserve</span>
              </a>
            </div>

            {/* Social Proof & Value Props */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-cafe-line/80">
              <div className="space-y-0.5">
                <span className="font-serif text-2xl font-bold text-cafe-ink block">88+</span>
                <span className="text-xs text-cafe-muted font-medium">SCA Cupping Score</span>
              </div>
              <div className="space-y-0.5 border-l border-cafe-line pl-4">
                <span className="font-serif text-2xl font-bold text-cafe-ink block">100%</span>
                <span className="text-xs text-cafe-muted font-medium">Shade-Grown Arabica</span>
              </div>
              <div className="space-y-0.5 border-l border-cafe-line pl-4">
                <span className="font-serif text-2xl font-bold text-cafe-ink block">Daily</span>
                <span className="text-xs text-cafe-muted font-medium">Fresh Micro-Bakes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero 3D Experience (6 Cols) */}
          <div className="lg:col-span-6 xl:col-span-6 relative">
            <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#F2ECE3] to-[#E9DFD2] p-2 border border-cafe-line/80 shadow-cafe-lg">
              <HeroCanvas />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
