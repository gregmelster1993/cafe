/**
 * Centralized Cafe Business & Brand Configuration
 * 
 * NOTE FOR CAFE OWNER / DESIGNER:
 * Replace these configuration values with your cafe's registered legal name,
 * actual address, phone, official menu, brand colors, and tax details.
 */
export const CAFE_CONFIG = {
  // Brand Identity (Temporary baseline template as required by Blueprint)
  brandName: "AURA ARTISAN ROASTERS",
  tagline: "Slow Roasted • Single Origin • Handcrafted Atmosphere",
  description: "An architectural coffee haven designed for sensory richness, slow mornings, and precision-roasted single origins.",
  isTemporaryBranding: true,
  
  // Contact & Location
  location: {
    address: "42 Roaster's Lane, Arts & Heritage Quarter",
    city: "Bengaluru, Karnataka 560001",
    googleMapsUrl: "https://maps.google.com",
    phone: "+91 (080) 4123-8890",
    email: "hello@auraroasters.coffee"
  },
  
  // Operating Hours & Real-time Status
  hours: {
    timezone: "Asia/Kolkata",
    weekday: { open: "07:30", close: "22:00", label: "Mon – Fri: 7:30 AM – 10:00 PM" },
    weekend: { open: "08:00", close: "23:00", label: "Sat – Sun: 8:00 AM – 11:00 PM" }
  },

  // Currency & Commercial Tax Rules
  commerce: {
    currencySymbol: "₹",
    currencyCode: "INR",
    taxRatePercentage: 5, // 5% GST on Restaurant Service
    serviceChargePercentage: 0,
    freeDeliveryThreshold: 500,
    supportedChannels: ["DINE_IN", "TAKEAWAY_PICKUP", "TABLE_QR"]
  },

  // 3D Experience Tuning
  experience3d: {
    heroModelPath: "/models/hero-coffee-cup.glb", // When user supplies GLB, place it here
    fallbackPosterPath: "/images/posters/hero-cup-poster.webp",
    enableSteamParticles: true,
    enableFloatingBeans: true,
    maxFloatingBeans: 16
  }
};
