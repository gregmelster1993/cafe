import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { SignatureMenu } from './components/sections/SignatureMenu';
import { CafeAtmosphere } from './components/sections/CafeAtmosphere';
import { LocationHours } from './components/sections/LocationHours';
import { Footer } from './components/layout/Footer';
import { ProductModal } from './components/ui/ProductModal';
import { CartDrawer } from './components/ui/CartDrawer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cafe-cream text-cafe-ink">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        <SignatureMenu />
        <CafeAtmosphere />
        <LocationHours />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Drawers & Overlays */}
      <ProductModal />
      <CartDrawer />
    </div>
  );
};

export default App;
