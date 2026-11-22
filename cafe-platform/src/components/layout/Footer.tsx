import React from 'react';
import { Coffee, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { CAFE_CONFIG } from '../../config/cafeConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1613] text-[#EDE4DA] pt-16 pb-12 border-t border-[#31251E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-[#31251E]">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2E2018] flex items-center justify-center text-cafe-amber border border-cafe-amber/30">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                {CAFE_CONFIG.brandName}
              </span>
            </div>
            <p className="text-sm text-[#BBAAA0] leading-relaxed">
              {CAFE_CONFIG.description}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2D1F17] text-cafe-amber text-xs border border-cafe-amber/20">
              <span className="w-2 h-2 rounded-full bg-cafe-amber" />
              <span>Configurable Architecture Active</span>
            </div>
          </div>

          {/* Column 2: Hours & Schedule */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4 flex items-center gap-2">
              <span>Operating Hours</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-[#BBAAA0]">
              <li className="flex justify-between border-b border-[#2C211B] pb-1.5">
                <span>Monday – Friday</span>
                <span className="text-white font-medium">7:30 AM – 10:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-[#2C211B] pb-1.5">
                <span>Saturday – Sunday</span>
                <span className="text-white font-medium">8:00 AM – 11:00 PM</span>
              </li>
              <li className="pt-1 text-xs text-cafe-caramel">
                *Kitchen closes 45 minutes prior to close.
              </li>
            </ul>
          </div>

          {/* Column 3: Location & Contact */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Location & Inquiries</h4>
            <div className="space-y-3 text-sm text-[#BBAAA0]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cafe-caramel shrink-0 mt-0.5" />
                <span>{CAFE_CONFIG.location.address}, {CAFE_CONFIG.location.city}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cafe-caramel shrink-0" />
                <span>{CAFE_CONFIG.location.phone}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cafe-caramel shrink-0" />
                <span>{CAFE_CONFIG.location.email}</span>
              </p>
            </div>
          </div>

          {/* Column 4: Quick Links & Digital Channels */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4">Ecosystem</h4>
            <ul className="space-y-2 text-sm text-[#BBAAA0]">
              <li>
                <a href="#menu" className="hover:text-cafe-amber transition-colors flex items-center gap-1">
                  <span>Digital Ordering Menu</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a href="#atmosphere" className="hover:text-cafe-amber transition-colors flex items-center gap-1">
                  <span>Atmosphere & Space</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-cafe-amber transition-colors flex items-center gap-1">
                  <span>Table Reservations</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <span className="text-xs text-[#7D6E66]">Kitchen Display System (KDS): Live Ready</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7970] gap-4">
          <p>© {new Date().getFullYear()} {CAFE_CONFIG.brandName}. All rights reserved.</p>
          <div className="flex gap-6">
            <span>GST Registered (5% Applicable)</span>
            <span>Food Safety & Allergen Standard Compliant</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
