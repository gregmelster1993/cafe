import React, { useState } from 'react';
import { ShoppingBag, Coffee, Menu as MenuIcon, X } from 'lucide-react';
import { useCafeStore } from '../../store/useCafeStore';
import { CAFE_CONFIG } from '../../config/cafeConfig';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getItemCount, setIsCartOpen, orderChannel, setOrderChannel } = useCafeStore();
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-40 bg-cafe-paper/90 backdrop-blur-md border-b border-cafe-line transition-all">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#211610] text-[#EADCCE] text-[11px] sm:text-xs py-1.5 px-4 text-center tracking-wider uppercase flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-cafe-amber animate-pulse" />
          Fresh Roast of the Day: Ethiopia Yirgacheffe G1
        </span>
        <span className="hidden md:inline text-cafe-caramel">•</span>
        <span className="hidden md:inline text-[#C9BAA9]">
          Free artisanal roast shipping on orders over {CAFE_CONFIG.commerce.currencySymbol}{CAFE_CONFIG.commerce.freeDeliveryThreshold}
        </span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2A1D16] flex items-center justify-center text-cafe-amber border border-cafe-amber/30 shadow-sm">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-cafe-ink block leading-none">
              {CAFE_CONFIG.brandName}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-cafe-caramel font-semibold">
              Boutique Roastery & Space
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-cafe-muted">
          <a href="#hero" className="hover:text-cafe-caramel transition-colors">
            Experience
          </a>
          <a href="#menu" className="hover:text-cafe-caramel transition-colors">
            Specialty Menu
          </a>
          <a href="#atmosphere" className="hover:text-cafe-caramel transition-colors">
            Atmosphere & Space
          </a>
          <a href="#location" className="hover:text-cafe-caramel transition-colors">
            Visit & Hours
          </a>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Channel Selector Toggle */}
          <div className="hidden sm:flex bg-cafe-cream p-1 rounded-full border border-cafe-line text-xs font-medium text-cafe-muted">
            <button
              onClick={() => setOrderChannel('TAKEAWAY_PICKUP')}
              className={`px-3 py-1 rounded-full transition-all ${
                orderChannel === 'TAKEAWAY_PICKUP'
                  ? 'bg-cafe-paper text-cafe-ink font-semibold shadow-sm'
                  : 'hover:text-cafe-ink'
              }`}
            >
              Takeaway Pickup
            </button>
            <button
              onClick={() => setOrderChannel('DINE_IN')}
              className={`px-3 py-1 rounded-full transition-all ${
                orderChannel === 'DINE_IN'
                  ? 'bg-cafe-paper text-cafe-ink font-semibold shadow-sm'
                  : 'hover:text-cafe-ink'
              }`}
            >
              Dine-In
            </button>
          </div>

          {/* Cart Drawer Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-[#211610] text-[#FFF8F0] hover:bg-cafe-caramel transition-colors shadow-cafe flex items-center gap-2 text-sm font-medium"
            aria-label="Open Cart Drawer"
          >
            <ShoppingBag className="w-4 h-4 text-cafe-amber" />
            <span className="hidden sm:inline">Order Bag</span>
            {itemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-cafe-caramel text-white text-xs font-bold flex items-center justify-center border-2 border-[#211610]">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-cafe-ink hover:text-cafe-caramel"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cafe-paper border-b border-cafe-line px-6 py-6 space-y-4 shadow-cafe-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3 text-base font-medium text-cafe-ink">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-cafe-line/50"
            >
              3D Experience
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-cafe-line/50"
            >
              Specialty Menu
            </a>
            <a
              href="#atmosphere"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-cafe-line/50"
            >
              The Space
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1"
            >
              Hours & Location
            </a>
          </div>

          <div className="pt-2 border-t border-cafe-line">
            <span className="text-xs uppercase text-cafe-muted font-bold block mb-2">Order Fulfillment</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setOrderChannel('TAKEAWAY_PICKUP');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-xs rounded-lg border text-center font-medium ${
                  orderChannel === 'TAKEAWAY_PICKUP'
                    ? 'bg-cafe-caramel text-white border-cafe-caramel'
                    : 'bg-cafe-cream text-cafe-muted border-cafe-line'
                }`}
              >
                Takeaway
              </button>
              <button
                onClick={() => {
                  setOrderChannel('DINE_IN');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-xs rounded-lg border text-center font-medium ${
                  orderChannel === 'DINE_IN'
                    ? 'bg-cafe-caramel text-white border-cafe-caramel'
                    : 'bg-cafe-cream text-cafe-muted border-cafe-line'
                }`}
              >
                Dine-In
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
