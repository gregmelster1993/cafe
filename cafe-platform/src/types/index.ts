export interface ModifierOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  maxSelections: number;
  options: ModifierOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'espresso' | 'specialty' | 'cold-brew' | 'bakery' | 'beans';
  description: string;
  price: number;
  tastingNotes?: string[];
  roastLevel?: 'Light' | 'Medium' | 'Medium-Dark';
  dietary?: ('Vegan' | 'Vegetarian' | 'Dairy-Free' | 'Gluten-Free')[];
  imageUrl: string;
  model3dUrl?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  modifierGroups?: ModifierGroup[];
}

export interface SelectedModifier {
  groupId: string;
  groupName: string;
  optionId: string;
  optionName: string;
  priceDelta: number;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedModifiers: SelectedModifier[];
  itemTotal: number;
  specialInstructions?: string;
}

export type OrderChannel = 'DINE_IN' | 'TAKEAWAY_PICKUP' | 'TABLE_QR';

export interface OrderState {
  items: CartItem[];
  channel: OrderChannel;
  tableNumber?: string;
  customerName: string;
  customerPhone: string;
  subtotal: number;
  tax: number;
  total: number;
}
