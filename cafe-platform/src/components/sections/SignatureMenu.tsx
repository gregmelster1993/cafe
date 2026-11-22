import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { MENU_CATEGORIES, FEATURED_MENU } from '../../config/menuData';
import { useCafeStore } from '../../store/useCafeStore';
import { MenuItem } from '../../types';
import { CAFE_CONFIG } from '../../config/cafeConfig';

export const SignatureMenu: React.FC = () => {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, addToCart, setActiveModalItem } = useCafeStore();
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Filter items based on selected category and search input
  const filteredItems = useMemo(() => {
    return FEATURED_MENU.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tastingNotes && item.tastingNotes.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.modifierGroups && item.modifierGroups.length > 0) {
      // Has customizable options, open customizer modal
      setActiveModalItem(item);
    } else {
      // Direct add to cart
      addToCart(item);
      setRecentlyAddedId(item.id);
      setTimeout(() => setRecentlyAddedId(null), 1200);
    }
  };

  return (
    <section id="menu" className="py-20 bg-cafe-paper border-t border-b border-cafe-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-cafe-caramel">
            The Digital Counter
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cafe-ink">
            Crafted for the Discerning Palate
          </h2>
          <p className="text-sm sm:text-base text-cafe-muted">
            All prices reflect freshly roasted ingredients prepared daily. Select an item to customize roast origins, plant-based milks, or grind coarseness.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#211610] text-[#FFF8F0] shadow-sm'
                    : 'bg-cafe-cream text-cafe-muted hover:text-cafe-ink hover:bg-cafe-line/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-cafe-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search brews, roasts, bakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-cafe-cream border border-cafe-line text-sm text-cafe-ink placeholder:text-cafe-muted/70 focus:outline-none focus:border-cafe-caramel"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group bg-cafe-cream/40 rounded-2xl border border-cafe-line p-5 hover:border-cafe-caramel hover:shadow-cafe transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image & Badge Header */}
                <div className="relative h-52 w-full rounded-xl overflow-hidden mb-4 bg-cafe-cream">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Category / Roast Pill */}
                  {item.roastLevel && (
                    <span className="absolute top-3 left-3 bg-[#211610]/85 backdrop-blur-sm text-cafe-amber text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-cafe-amber/20">
                      {item.roastLevel} Roast
                    </span>
                  )}
                  {item.model3dUrl && (
                    <span className="absolute top-3 right-3 bg-cafe-caramel/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      3D View
                    </span>
                  )}
                </div>

                {/* Title & Price Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-serif text-lg font-bold text-cafe-ink group-hover:text-cafe-caramel transition-colors">
                    {item.name}
                  </h3>
                  <span className="font-serif text-lg font-bold text-cafe-caramel shrink-0">
                    {CAFE_CONFIG.commerce.currencySymbol}{item.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-cafe-muted leading-relaxed line-clamp-2 mb-4">
                  {item.description}
                </p>

                {/* Tasting Notes */}
                {item.tastingNotes && item.tastingNotes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="text-[11px] font-medium bg-cafe-paper text-cafe-muted px-2 py-0.5 rounded border border-cafe-line/80"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-cafe-line/60 flex items-center justify-between">
                <div className="flex gap-2">
                  {item.dietary?.map((diet) => (
                    <span key={diet} className="text-[10px] uppercase font-bold text-cafe-sage">
                      {diet}
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => handleQuickAdd(item, e)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    recentlyAddedId === item.id
                      ? 'bg-cafe-sage text-white'
                      : 'bg-[#211610] text-[#FFF8F0] hover:bg-cafe-caramel'
                  }`}
                >
                  {recentlyAddedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </>
                  ) : item.modifierGroups && item.modifierGroups.length > 0 ? (
                    <>
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Customize</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-base text-cafe-muted">No items matched your search query.</p>
          </div>
        )}

      </div>
    </section>
  );
};
