import { MenuItem } from '../types';

export const MENU_CATEGORIES = [
  { id: 'all', label: 'All Offerings' },
  { id: 'espresso', label: 'Espresso & Milk' },
  { id: 'specialty', label: 'Pour-Over & Single Origin' },
  { id: 'cold-brew', label: 'Cold & Nitro Brews' },
  { id: 'bakery', label: 'Artisanal Bakery' },
  { id: 'beans', label: 'Retail Roasts (250g)' }
] as const;

export const MILK_MODIFIERS = {
  id: 'milk-choice',
  name: 'Choice of Milk',
  required: false,
  maxSelections: 1,
  options: [
    { id: 'milk-whole', name: 'Fresh Whole Milk', priceDelta: 0 },
    { id: 'milk-oat', name: 'Barista Oat Milk', priceDelta: 45 },
    { id: 'milk-almond', name: 'Toasted Almond Milk', priceDelta: 45 }
  ]
};

export const ROAST_MODIFIERS = {
  id: 'roast-profile',
  name: 'Espresso Origin',
  required: false,
  maxSelections: 1,
  options: [
    { id: 'roast-house', name: 'House Velvet Blend (Dark Chocolate & Hazelnut)', priceDelta: 0 },
    { id: 'roast-ethiopia', name: 'Single Origin Ethiopia Yirgacheffe (Floral & Bergamot)', priceDelta: 30 }
  ]
};

export const FEATURED_MENU: MenuItem[] = [
  {
    id: 'prod-001',
    name: 'Artisanal Flat White',
    category: 'espresso',
    description: 'Double shot of precision-extracted espresso folded into silky, velvety micro-foam with signature rosetta art.',
    price: 240,
    tastingNotes: ['Raw Cacao', 'Toasted Macadamia', 'Velvet Cream'],
    roastLevel: 'Medium',
    dietary: ['Vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
    model3dUrl: '/models/flat-white.glb',
    isAvailable: true,
    isFeatured: true,
    modifierGroups: [MILK_MODIFIERS, ROAST_MODIFIERS]
  },
  {
    id: 'prod-002',
    name: 'Single Origin Chemex Pour-Over',
    category: 'specialty',
    description: 'Hand-poured filter coffee highlighting delicate jasmine aromatics, sweet peach acidity, and clean tea-like body.',
    price: 290,
    tastingNotes: ['Jasmine Floral', 'White Peach', 'Wild Honey'],
    roastLevel: 'Light',
    dietary: ['Vegan', 'Gluten-Free'],
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    model3dUrl: '/models/chemex-pour.glb',
    isAvailable: true,
    isFeatured: true,
    modifierGroups: []
  },
  {
    id: 'prod-003',
    name: 'Smoked Vanilla Nitro Cold Brew',
    category: 'cold-brew',
    description: 'Steeped for 18 hours in cold filtered spring water and nitrogen-infused on tap for a cascading stout-like head.',
    price: 280,
    tastingNotes: ['Madagascar Vanilla', 'Bourbon Oak', 'Dark Treacle'],
    roastLevel: 'Medium-Dark',
    dietary: ['Vegan', 'Gluten-Free'],
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    modifierGroups: []
  },
  {
    id: 'prod-004',
    name: 'Spanish Cortado',
    category: 'espresso',
    description: 'Equal parts dense ristretto espresso and lightly textured steamed milk served in our signature faceted Gibraltar glass.',
    price: 220,
    tastingNotes: ['Brown Sugar', 'Almond Butter', 'Bold Espresso'],
    roastLevel: 'Medium-Dark',
    dietary: ['Vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: false,
    modifierGroups: [MILK_MODIFIERS]
  },
  {
    id: 'prod-005',
    name: 'Pistachio & Sea Salt Cruffin',
    category: 'bakery',
    description: 'Laminated French butter croissant dough baked in a muffin mould, filled with roasted Bronte pistachio cream and Maldon salt flakes.',
    price: 260,
    tastingNotes: ['Pure Butter Flake', 'Bronte Pistachio', 'Maldon Flakes'],
    dietary: ['Vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    modifierGroups: []
  },
  {
    id: 'prod-006',
    name: 'Highland Estate Whole Beans (250g)',
    category: 'beans',
    description: 'Washed Arabica beans grown under native shade trees in Chikmagalur at 4,200ft. Roasted twice weekly in-house.',
    price: 550,
    tastingNotes: ['Milk Chocolate', 'Orange Zest', 'Caramelized Fig'],
    roastLevel: 'Medium',
    dietary: ['Vegan', 'Gluten-Free'],
    imageUrl: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isFeatured: true,
    modifierGroups: [
      {
        id: 'grind-type',
        name: 'Grind Specification',
        required: true,
        maxSelections: 1,
        options: [
          { id: 'grind-whole', name: 'Whole Bean (Recommended)', priceDelta: 0 },
          { id: 'grind-espresso', name: 'Fine Grind (Home Espresso)', priceDelta: 0 },
          { id: 'grind-pourover', name: 'Medium Grind (V60 / Aeropress)', priceDelta: 0 },
          { id: 'grind-french', name: 'Coarse Grind (French Press / Cold Brew)', priceDelta: 0 }
        ]
      }
    ]
  }
];
