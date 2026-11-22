import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useCafeStore } from '../../store/useCafeStore';
import { SelectedModifier } from '../../types';
import { CAFE_CONFIG } from '../../config/cafeConfig';

export const ProductModal: React.FC = () => {
  const { activeModalItem, setActiveModalItem, addToCart } = useCafeStore();
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, SelectedModifier>>({});
  const [quantity, setQuantity] = useState<number>(1);

  if (!activeModalItem) return null;

  const handleModifierSelect = (groupId: string, groupName: string, optionId: string, optionName: string, priceDelta: number) => {
    setSelectedModifiers((prev) => ({
      ...prev,
      [groupId]: { groupId, groupName, optionId, optionName, priceDelta }
    }));
  };

  const currentModifierSum = Object.values(selectedModifiers).reduce((acc, curr) => acc + curr.priceDelta, 0);
  const unitPrice = activeModalItem.price + currentModifierSum;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    addToCart(activeModalItem, Object.values(selectedModifiers), quantity);
    setActiveModalItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-cafe-paper rounded-3xl max-w-lg w-full overflow-hidden border border-cafe-line shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header Image with Close Button */}
        <div className="relative h-56 w-full shrink-0 bg-cafe-cream">
          <img
            src={activeModalItem.imageUrl}
            alt={activeModalItem.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setActiveModalItem(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#211610]/80 text-white hover:bg-cafe-caramel transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {activeModalItem.roastLevel && (
            <span className="absolute bottom-4 left-4 bg-[#211610]/90 backdrop-blur-sm text-cafe-amber text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-cafe-amber/30">
              {activeModalItem.roastLevel} Roast
            </span>
          )}
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-serif text-2xl font-bold text-cafe-ink">
                {activeModalItem.name}
              </h3>
              <span className="font-serif text-2xl font-bold text-cafe-caramel">
                {CAFE_CONFIG.commerce.currencySymbol}{unitPrice}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-cafe-muted leading-relaxed">
              {activeModalItem.description}
            </p>
          </div>

          {/* Tasting Notes */}
          {activeModalItem.tastingNotes && activeModalItem.tastingNotes.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase text-cafe-muted tracking-wider">
                Cup Profile & Tasting Notes
              </span>
              <div className="flex flex-wrap gap-2">
                {activeModalItem.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="text-xs bg-cafe-cream text-cafe-ink px-3 py-1 rounded-full border border-cafe-line font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Modifier Groups (e.g. Milk Choice, Roast Option, Grind) */}
          {activeModalItem.modifierGroups && activeModalItem.modifierGroups.map((group) => (
            <div key={group.id} className="space-y-2.5 pt-2 border-t border-cafe-line">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-cafe-ink tracking-wider">
                  {group.name}
                </span>
                {group.required && (
                  <span className="text-[10px] text-cafe-caramel font-semibold uppercase">Required</span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-2">
                {group.options.map((opt) => {
                  const isSelected = selectedModifiers[group.id]?.optionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleModifierSelect(group.id, group.name, opt.id, opt.name, opt.priceDelta)}
                      className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-cafe-caramel bg-cafe-caramel/10 text-cafe-ink shadow-sm'
                          : 'border-cafe-line bg-cafe-cream/60 text-cafe-muted hover:border-cafe-muted'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-cafe-caramel bg-cafe-caramel text-white' : 'border-cafe-muted/40'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5" />}
                        </span>
                        <span>{opt.name}</span>
                      </span>
                      {opt.priceDelta > 0 && (
                        <span className="text-cafe-caramel font-semibold">
                          +{CAFE_CONFIG.commerce.currencySymbol}{opt.priceDelta}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quantity Stepper */}
          <div className="flex items-center justify-between pt-4 border-t border-cafe-line">
            <span className="text-xs font-bold uppercase text-cafe-ink tracking-wider">Quantity</span>
            <div className="flex items-center gap-3 bg-cafe-cream border border-cafe-line px-3 py-1.5 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 rounded-full bg-cafe-paper text-cafe-ink font-bold flex items-center justify-center shadow-sm"
              >
                -
              </button>
              <span className="text-sm font-bold text-cafe-ink px-2">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 rounded-full bg-cafe-paper text-cafe-ink font-bold flex items-center justify-center shadow-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-cafe-cream border-t border-cafe-line flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="w-full py-3.5 rounded-full bg-[#211610] text-[#FFF8F0] font-semibold text-sm hover:bg-cafe-caramel transition-colors shadow-cafe flex items-center justify-center gap-2"
          >
            <span>Add to Order Bag</span>
            <span>•</span>
            <span>{CAFE_CONFIG.commerce.currencySymbol}{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
