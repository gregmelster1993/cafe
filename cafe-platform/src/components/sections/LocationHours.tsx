import React, { useMemo } from 'react';
import { MapPin, Clock, Phone, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { CAFE_CONFIG } from '../../config/cafeConfig';

export const LocationHours: React.FC = () => {
  // Real-time Open/Closed Status Calculator
  const isOpenNow = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // Mon-Fri: 7:30 AM (450 mins) to 10:00 PM (1320 mins)
    // Sat-Sun: 8:00 AM (480 mins) to 11:00 PM (1380 mins)
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    const openMin = isWeekend ? 8 * 60 : 7 * 60 + 30;
    const closeMin = isWeekend ? 23 * 60 : 22 * 60;

    return totalMinutes >= openMin && totalMinutes <= closeMin;
  }, []);

  return (
    <section id="location" className="py-20 bg-cafe-cream border-b border-cafe-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hours & Address (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cafe-paper border border-cafe-line shadow-sm text-xs font-semibold">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-cafe-sage animate-ping' : 'bg-red-500'}`} />
              <span className={isOpenNow ? 'text-cafe-sage uppercase' : 'text-red-600 uppercase'}>
                {isOpenNow ? 'Open Now For Service' : 'Currently Closed • Opens Tomorrow 7:30 AM'}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cafe-ink">
              Visit Our Space in the Heritage Quarter
            </h2>

            <p className="text-base text-cafe-muted leading-relaxed">
              Step off the bustling street into an oasis of calm, warm natural wood, and the unmistakable aroma of single origins freshly ground.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-cafe-paper p-5 rounded-2xl border border-cafe-line space-y-2">
                <div className="w-8 h-8 rounded-full bg-cafe-cream flex items-center justify-center text-cafe-caramel">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-bold text-cafe-ink">Weekly Hours</h4>
                <p className="text-xs text-cafe-muted">{CAFE_CONFIG.hours.weekday.label}</p>
                <p className="text-xs text-cafe-muted">{CAFE_CONFIG.hours.weekend.label}</p>
              </div>

              <div className="bg-cafe-paper p-5 rounded-2xl border border-cafe-line space-y-2">
                <div className="w-8 h-8 rounded-full bg-cafe-cream flex items-center justify-center text-cafe-caramel">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-bold text-cafe-ink">Address</h4>
                <p className="text-xs text-cafe-muted">{CAFE_CONFIG.location.address}</p>
                <p className="text-xs text-cafe-muted">{CAFE_CONFIG.location.city}</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={CAFE_CONFIG.location.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#211610] text-[#FFF8F0] text-xs font-semibold hover:bg-cafe-caramel transition-colors"
              >
                <span>Get Google Maps Directions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={`tel:${CAFE_CONFIG.location.phone}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cafe-paper text-cafe-ink border border-cafe-line text-xs font-semibold hover:border-cafe-caramel transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cafe-caramel" />
                <span>Call the Bar: {CAFE_CONFIG.location.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Table Reservation Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-cafe-paper rounded-3xl p-8 border border-cafe-line shadow-cafe-lg space-y-6">
              <div className="flex items-center justify-between border-b border-cafe-line pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-cafe-ink">Reserve a Table</h3>
                  <p className="text-xs text-cafe-muted">Guaranteed seating for specialty tastings & meetings</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-cafe-cream flex items-center justify-center text-cafe-caramel border border-cafe-line">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert("Table booking requested! In Phase 6, this connects directly to the Spatial 3D Table Reservation system with live slot availability."); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-cafe-ink uppercase tracking-wider mb-1.5">
                    Party Size
                  </label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl bg-cafe-cream border border-cafe-line text-sm text-cafe-ink focus:outline-none focus:border-cafe-caramel">
                    <option>1 – 2 Guests (Window Nook)</option>
                    <option>3 – 4 Guests (Travertine Table)</option>
                    <option>5 – 8 Guests (Roastery Long Table)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-cafe-ink uppercase tracking-wider mb-1.5">
                      Date
                    </label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 rounded-xl bg-cafe-cream border border-cafe-line text-xs text-cafe-ink focus:outline-none focus:border-cafe-caramel"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-cafe-ink uppercase tracking-wider mb-1.5">
                      Preferred Time
                    </label>
                    <select className="w-full px-3 py-2 rounded-xl bg-cafe-cream border border-cafe-line text-xs text-cafe-ink focus:outline-none focus:border-cafe-caramel">
                      <option>10:00 AM (Morning Brew)</option>
                      <option>02:00 PM (Afternoon Slow Pour)</option>
                      <option>05:00 PM (Sunset Tasting)</option>
                      <option>07:30 PM (Evening Desserts)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#211610] text-[#FFF8F0] text-sm font-semibold hover:bg-cafe-caramel transition-colors shadow-cafe"
                >
                  Check Table Availability
                </button>
              </form>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-cafe-muted">
                <ShieldCheck className="w-4 h-4 text-cafe-sage shrink-0" />
                <span>Instant reservation confirmation via SMS / Email with 15-minute grace window.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
