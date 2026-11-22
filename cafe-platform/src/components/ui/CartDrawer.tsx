import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCafeStore } from '../../store/useCafeStore';
import { CAFE_CONFIG } from '../../config/cafeConfig';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    getTax,
    getTotal,
    orderChannel,
    setOrderChannel,
    tableNumber,
    setTableNumber
  } = useCafeStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();

  const handleSimulatedCheckout = () => {
    setIsCheckingOut(true);
    // Simulate server-side order calculation and payment webhook receipt
    setTimeout(() => {
      const orderRef = `AURA-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderId(orderRef);
      setIsCheckingOut(false);
      clearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-cafe-paper w-full max-w-md h-full flex flex-col border-l border-cafe-line shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-cafe-line flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cafe-cream flex items-center justify-center text-cafe-caramel">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-cafe-ink">Your Order Bag</h3>
              <span className="text-xs text-cafe-muted">{cart.length} unique selections</span>
            </div>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setConfirmedOrderId(null);
            }}
            className="p-2 text-cafe-muted hover:text-cafe-ink rounded-full hover:bg-cafe-cream"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Confirmed Screen */}
        {confirmedOrderId ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-cafe-sage/10 text-cafe-sage flex items-center justify-center border border-cafe-sage/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-cafe-ink">Order Transmitted to Kitchen!</h4>
            <div className="bg-cafe-cream px-4 py-2 rounded-xl border border-cafe-line font-mono text-sm font-bold text-cafe-caramel">
              Ref #{confirmedOrderId}
            </div>
            <p className="text-xs text-cafe-muted leading-relaxed max-w-xs">
              Your order has been verified server-side and routed to the Barista Display System. Estimated preparation time is 8–12 minutes.
            </p>
            <button
              onClick={() => {
                setConfirmedOrderId(null);
                setIsCartOpen(false);
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#211610] text-[#FFF8F0] text-xs font-semibold hover:bg-cafe-caramel transition-colors"
            >
              Done & Return to Menu
            </button>
          </div>
        ) : (
          <>
            {/* Fulfillment Channel Switcher */}
            <div className="p-4 bg-cafe-cream border-b border-cafe-line">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cafe-ink">Fulfillment Channel</span>
                <span className="text-[10px] text-cafe-caramel font-semibold uppercase">Configured</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOrderChannel('TAKEAWAY_PICKUP')}
                  className={`py-2 text-xs rounded-xl font-medium border transition-all ${
                    orderChannel === 'TAKEAWAY_PICKUP'
                      ? 'bg-cafe-paper text-cafe-ink border-cafe-caramel font-bold shadow-sm'
                      : 'bg-transparent text-cafe-muted border-transparent hover:text-cafe-ink'
                  }`}
                >
                  Takeaway Pickup
                </button>
                <button
                  onClick={() => setOrderChannel('DINE_IN')}
                  className={`py-2 text-xs rounded-xl font-medium border transition-all ${
                    orderChannel === 'DINE_IN'
                      ? 'bg-cafe-paper text-cafe-ink border-cafe-caramel font-bold shadow-sm'
                      : 'bg-transparent text-cafe-muted border-transparent hover:text-cafe-ink'
                  }`}
                >
                  Dine-In Table
                </button>
              </div>

              {orderChannel === 'DINE_IN' && (
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-xs text-cafe-muted font-medium">Table:</span>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="px-3 py-1 bg-cafe-paper border border-cafe-line rounded-lg text-xs font-bold text-cafe-ink w-32 focus:outline-none focus:border-cafe-caramel"
                  />
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto text-cafe-muted/40" />
                  <p className="text-sm text-cafe-muted">Your order bag is currently empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs font-bold text-cafe-caramel underline hover:text-cafe-ink"
                  >
                    Browse Specialty Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="bg-cafe-cream/40 rounded-2xl border border-cafe-line p-3.5 flex items-start gap-3"
                  >
                    <img
                      src={item.item.imageUrl}
                      alt={item.item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-cafe-cream"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-bold text-cafe-ink truncate">
                          {item.item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-cafe-muted hover:text-red-500 p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Modifiers List */}
                      {item.selectedModifiers.length > 0 && (
                        <div className="text-[11px] text-cafe-muted space-y-0.5 my-1">
                          {item.selectedModifiers.map((mod) => (
                            <span key={mod.optionId} className="block">
                              • {mod.optionName} {mod.priceDelta > 0 && `(+${CAFE_CONFIG.commerce.currencySymbol}${mod.priceDelta})`}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-cafe-paper border border-cafe-line px-2 py-0.5 rounded-full">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, -1)}
                            className="text-xs font-bold text-cafe-muted hover:text-cafe-ink px-1"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-cafe-ink">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, 1)}
                            className="text-xs font-bold text-cafe-muted hover:text-cafe-ink px-1"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-sm font-bold text-cafe-caramel">
                          {CAFE_CONFIG.commerce.currencySymbol}{item.itemTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer & Totals */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-cafe-line bg-cafe-cream/80 space-y-3">
                <div className="space-y-1.5 text-xs text-cafe-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-cafe-ink font-medium">{CAFE_CONFIG.commerce.currencySymbol}{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Restaurant GST ({CAFE_CONFIG.commerce.taxRatePercentage}%)</span>
                    <span className="text-cafe-ink font-medium">{CAFE_CONFIG.commerce.currencySymbol}{tax}</span>
                  </div>
                  <div className="flex justify-between text-sm font-serif font-bold text-cafe-ink pt-2 border-t border-cafe-line">
                    <span>Grand Total</span>
                    <span className="text-cafe-caramel">{CAFE_CONFIG.commerce.currencySymbol}{total}</span>
                  </div>
                </div>

                <button
                  disabled={isCheckingOut}
                  onClick={handleSimulatedCheckout}
                  className="w-full py-3.5 rounded-full bg-[#211610] text-[#FFF8F0] font-semibold text-sm hover:bg-cafe-caramel transition-colors shadow-cafe flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span>Validating Sandbox Order...</span>
                  ) : (
                    <>
                      <span>Transmit Order to Kitchen</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-cafe-muted text-center pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cafe-sage" />
                  <span>Verified Server Calculation • Sandbox Mode Active</span>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
