# 3D Asset Inventory & Pipeline Specification

**Project:** Premium 3D Cafe Platform  
**Updated:** November 22, 2026  
**Status:** Ingestion Pipeline Active — Awaiting Downloaded User Assets

---

## 1. Asset Strategy & Optimization Standards

All 3D assets integrated into this project must adhere to strict performance, visual fidelity, and licensing standards:

1. **Target Formats:** Compressed binary GLTF (`.glb`) or standard `.gltf` with embedded/external textures.
2. **Size Budgets:**
   - Hero 3D Object: **1.5 MB – 3.5 MB** maximum (Draco / Meshopt compression preferred).
   - Product Viewer Models: **500 KB – 1.8 MB** maximum per item.
   - Instanced Floating Elements (beans, ice cubes): **< 200 KB** total geometry.
3. **Texture Standards:**
   - 1024x1024 or 2048x2048 maximum for hero models.
   - PBR workflow: Base Color, Roughness/Metallic, Normal map, Ambient Occlusion.
4. **Fallback Poster Requirement:** Every 3D model slot must have a high-resolution static WebP/PNG poster image to ensure instant visual delivery on mobile devices or unsupported browsers.

---

## 2. Asset Register & Placement Map

| Asset ID | Target Slot | Expected File | Polycount Budget | Target File Size | Purpose & Interaction | Poster Fallback | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `MODEL-HERO-001` | Homepage Hero Section | `hero-coffee-cup.glb` | < 35,000 tris | < 3.0 MB | Interactive hero centerpiece; rotates on mouse/touch drag, steam particle shader, subtle floating motion | `hero-cup-poster.webp` | Built-in High-Fidelity 3D Canvas / Ready for user GLB drop-in |
| `MODEL-PROP-002` | Hero & Scroll Background | `coffee-beans-cluster.glb` | < 4,000 tris | < 300 KB | Instanced floating coffee beans orbiting the scene with subtle parallax drift | `beans-ambient.webp` | Built-in Procedural Instanced Beans |
| `MODEL-PROD-003` | Signature Pour-Over | `v60-dripper.glb` | < 25,000 tris | < 2.0 MB | Product detail 360 viewer in dynamic menu for single-origin specialty coffees | `v60-poster.webp` | Configured for Ingestion |
| `MODEL-PROD-004` | Iced Cold Brew Glass | `iced-coffee-glass.glb` | < 20,000 tris | < 1.8 MB | Interactive beverage viewer with condensation material and ice cubes | `cold-brew-poster.webp` | Configured for Ingestion |
| `MODEL-FOOD-005` | Butter Croissant / Pastry | `golden-croissant.glb` | < 18,000 tris | < 1.5 MB | High-converting pastry upsell in cart and bakery section | `croissant-poster.webp` | Configured for Ingestion |
| `MODEL-ENV-006` | Lighting & Reflections | `cafe-interior-warm.hdr` | N/A | < 1.5 MB | Low-resolution HDR radiance environment map for warm ambient cafe reflections | Procedural warm gradient lighting | Configured for Ingestion |

---

## 3. Commercial Licensing & Usage Rights Register

| Asset ID | Source / Author | License Type | Commercial Use Permitted? | Attribution Required? | Verification Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `MODEL-HERO-001` (Default) | Built-in Procedural Shader & Mesh Engine | MIT / Open Source | Yes | No | Zero external IP risk; built directly with Three.js |
| `MODEL-PROP-002` (Default) | Built-in Instanced Math Geometry | MIT / Open Source | Yes | No | High-performance instanced rendering |
| *User Provided Models* | *To be recorded upon delivery* | *Pending Verification* | *To be verified* | *To be recorded* | Strict license check before production release |

---

## 4. Ingestion & Drop-in Instructions for Owner

When the cafe owner or designer provides custom 3D files:
1. Place 3D model files (`.glb` / `.gltf`) directly in:
   `cafe-platform/public/models/`
2. Place matching high-resolution poster images (`.webp` / `.png`) in:
   `cafe-platform/public/images/posters/`
3. Update `cafe-platform/src/config/assetsConfig.ts` to map the file to the desired menu item or hero slot. The application will immediately switch from procedural rendering to the user-supplied GLB model with full hot-reloading.
