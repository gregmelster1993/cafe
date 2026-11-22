import { create } from 'zustand';
import { CartItem, MenuItem, SelectedModifier, OrderChannel } from '../types';
import { CAFE_CONFIG } from '../config/cafeConfig';

interface CafeStore {
  // Navigation & UI States
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeModalItem: MenuItem | null;
  setActiveModalItem: (item: MenuItem | null) => void;
  
  // 3D Experience Controls
  isSteamActive: boolean;
  toggleSteam: () => void;
  is3dPaused: boolean;
  setIs3dPaused: (paused: boolean) => void;
  prefersReducedMotion: boolean;
  setPrefersReducedMotion: (val: boolean) => void;

  // Ordering & Cart
  orderChannel: OrderChannel;
  setOrderChannel: (channel: OrderChannel) => void;
  tableNumber: string;
  setTableNumber: (table: string) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, selectedModifiers?: SelectedModifier[], quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  
  // Computed Totals
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCafeStore = create<CafeStore>((set, get) => ({
  isCartOpen: false,
  setIsCartOpen: (open) => set({ isCartOpen: open }),
  selectedCategory: 'all',
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  activeModalItem: null,
  setActiveModalItem: (item) => set({ activeModalItem: item }),

  isSteamActive: true,
  toggleSteam: () => set((state) => ({ isSteamActive: !state.isSteamActive })),
  is3dPaused: false,
  setIs3dPaused: (paused) => set({ is3dPaused: paused }),
  prefersReducedMotion: false,
  setPrefersReducedMotion: (val) => set({ prefersReducedMotion: val }),

  orderChannel: 'TAKEAWAY_PICKUP',
  setOrderChannel: (channel) => set({ orderChannel: channel }),
  tableNumber: 'Table 04',
  setTableNumber: (table) => set({ tableNumber: table }),
  cart: [],

  addToCart: (item, selectedModifiers = [], quantity = 1) => {
    set((state) => {
      const modifierKey = selectedModifiers
        .map((m) => m.optionId)
        .sort()
        .join('-');
      const cartItemId = `${item.id}-${modifierKey || 'standard'}`;
      
      const modifierSum = selectedModifiers.reduce((acc, curr) => acc + curr.priceDelta, 0);
      const unitPrice = item.price + modifierSum;
      
      const existingIndex = state.cart.findIndex((c) => c.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...state.cart];
        updated[existingIndex].quantity += quantity;
        updated[existingIndex].itemTotal = updated[existingIndex].quantity * unitPrice;
        return { cart: updated, isCartOpen: true };
      }

      const newItem: CartItem = {
        cartItemId,
        item,
        quantity,
        selectedModifiers,
        itemTotal: unitPrice * quantity
      };

      return { cart: [...state.cart, newItem], isCartOpen: true };
    });
  },

  removeFromCart: (cartItemId) => {
    set((state) => ({
      cart: state.cart.filter((c) => c.cartItemId !== cartItemId)
    }));
  },

  updateQuantity: (cartItemId, delta) => {
    set((state) => {
      const updated = state.cart
        .map((c) => {
          if (c.cartItemId === cartItemId) {
            const newQty = c.quantity + delta;
            if (newQty <= 0) return null;
            const unitPrice = c.itemTotal / c.quantity;
            return { ...c, quantity: newQty, itemTotal: unitPrice * newQty };
          }
          return c;
        })
        .filter(Boolean) as CartItem[];
      return { cart: updated };
    });
  },

  clearCart: () => set({ cart: [] }),

  getSubtotal: () => {
    return get().cart.reduce((sum, item) => sum + item.itemTotal, 0);
  },

  getTax: () => {
    const subtotal = get().getSubtotal();
    return Math.round((subtotal * (CAFE_CONFIG.commerce.taxRatePercentage / 100)) * 100) / 100;
  },

  getTotal: () => {
    return get().getSubtotal() + get().getTax();
  },

  getItemCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  }
}));
