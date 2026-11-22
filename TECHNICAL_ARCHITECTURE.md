# Technical Architecture Specification: 3D Cafe Ecosystem

**System:** Premium 3D Cafe Digital Platform  
**Compliance:** Blueprint v1.0 Standard  
**Revision:** 1.0.0  

---

## 1. System Architecture Overview

The system employs a decoupled, modular full-stack architecture where a unified business logic core powers both public client interfaces and staff operational tools:

```
  ┌────────────────────────────────────────────────────────┐
  │                 Client Experience Layer                │
  │  ┌───────────────────────┐  ┌───────────────────────┐  │
  │  │ Public 3D Website     │  │ QR Mobile Dining Menu │  │
  │  │ (Desktop & Mobile)    │  │ (Zero-install webapp) │  │
  │  └───────────┬───────────┘  └───────────┬───────────┘  │
  │              │                          │              │
  │  ┌───────────┴───────────┐  ┌───────────┴───────────┐  │
  │  │ Admin Management      │  │ Kitchen Display (KDS) │  │
  │  │ Dashboard             │  │ (Real-time socket)    │  │
  │  └───────────┬───────────┘  └───────────┬───────────┘  │
  └──────────────┼──────────────────────────┼──────────────┘
                 │ HTTPS REST               │ WebSockets
                 ▼                          ▼
  ┌────────────────────────────────────────────────────────┐
  │            Backend Services (Node.js / Express)        │
  │  ┌──────────────────────────────────────────────────┐  │
  │  │ API Gateway & Middleware (CORS, Rate Limit, Auth)│  │
  │  ├──────────────────────────────────────────────────┤  │
  │  │ Service Modules:                                 │  │
  │  │ • Menu & Inventory Engine                        │  │
  │  │ • Order Orchestrator & Server Calculation        │  │
  │  │ • Payment Webhook Verifier (HMAC validation)     │  │
  │  │ • Table Token Security (HMAC-SHA256)             │  │
  │  │ • WebSocket Real-time Dispatcher                 │  │
  │  └──────────────────────────┬───────────────────────┘  │
  └─────────────────────────────┼──────────────────────────┘
                                │
                                ▼
  ┌────────────────────────────────────────────────────────┐
  │                   Data & Storage Layer                 │
  │  • PostgreSQL / SQLite (Relational Store & ACID Trans.)│
  │  • Static Asset Storage & CDN (GLB, HDR, WebP Images)  │
  └────────────────────────────────────────────────────────┘
```

---

## 2. 3D Web Rendering Architecture

The 3D presentation layer is isolated from business transaction logic to prevent rendering bottlenecks from impacting conversion:

1. **WebGL Canvas Manager:**
   - Powered by `@react-three/fiber` and `@react-three/drei`.
   - **Progressive Model Loading:** Employs Suspense boundaries with zero-layout-shift fallback skeletons.
   - **Offscreen Throttling:** Detects when the canvas is scrolled out of viewport via `IntersectionObserver` and drops requestAnimationFrame execution to 0 FPS, saving 100% of GPU resources.
   - **Device Tiering & Fallback:** Inspects `gl.isWebGL2` and hardware limits. If WebGL fails or crashes, it automatically displays an optimized WebP static poster without throwing unhandled exceptions.
   - **Reduced Motion:** Queries `window.matchMedia('(prefers-reduced-motion: reduce)')` to disable camera animations and floating physics.

2. **3D Asset Hierarchy:**
   - **Hero Canvas:** Centerpiece ceramic cup with subsurface scattering approximation, liquid meniscus shader, volumetric steam particle simulation, and instanced floating coffee beans.
   - **Product 360 Viewer:** Floating modal canvas initialized only on-demand when the user clicks "Inspect in 3D".

---

## 3. Data Model & Entity Relationship Schema

The relational schema strictly enforces transactional data integrity and historical price preservation:

```sql
-- Core Categories
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products & 3D Metadata
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY,
    category_id VARCHAR(36) REFERENCES categories(id),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    model_3d_url VARCHAR(500),
    poster_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    dietary_flags JSON, -- e.g. ["vegan", "gluten-free"]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Modifier Groups (e.g. Milk Choice, Roasts)
CREATE TABLE modifier_groups (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    min_selections INT DEFAULT 0,
    max_selections INT DEFAULT 1,
    is_required BOOLEAN DEFAULT FALSE
);

CREATE TABLE product_modifiers (
    id VARCHAR(36) PRIMARY KEY,
    group_id VARCHAR(36) REFERENCES modifier_groups(id),
    name VARCHAR(100) NOT NULL,
    price_adjustment DECIMAL(10, 2) DEFAULT 0.00
);

-- Tables & Secure QR Tokens
CREATE TABLE cafe_tables (
    id VARCHAR(36) PRIMARY KEY,
    table_number VARCHAR(20) UNIQUE NOT NULL,
    capacity INT NOT NULL,
    qr_token_hash VARCHAR(64) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'AVAILABLE' -- 'AVAILABLE', 'OCCUPIED', 'RESERVED'
);

-- Orders & Snapshots (Prices frozen at time of purchase)
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    order_number VARCHAR(30) UNIQUE NOT NULL,
    channel VARCHAR(20) NOT NULL, -- 'ONLINE_PICKUP', 'QR_TABLE', 'DINE_IN'
    table_id VARCHAR(36) REFERENCES cafe_tables(id),
    customer_name VARCHAR(100),
    customer_phone VARCHAR(30),
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status VARCHAR(30) DEFAULT 'PENDING', -- 'PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'
    payment_status VARCHAR(30) DEFAULT 'UNPAID', -- 'UNPAID', 'PENDING', 'PAID', 'REFUNDED'
    payment_provider_ref VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(36) REFERENCES products(id),
    product_name_snapshot VARCHAR(150) NOT NULL,
    unit_price_snapshot DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    selected_modifiers_snapshot JSON,
    item_total DECIMAL(10, 2) NOT NULL
);

-- Real-time Audit Log
CREATE TABLE audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    actor VARCHAR(100) NOT NULL,
    action VARCHAR(100) NOT NULL,
    target_entity VARCHAR(50),
    target_id VARCHAR(36),
    changes JSON,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Security & Business Rules

1. **Zero-Trust Pricing:** Frontend calculates display estimates only. The backend re-queries product prices from the database, sums authorized modifier adjustments, adds applicable taxes (e.g. 5% GST), and generates the final payment payload.
2. **Cryptographic Webhook Handshake:** Payment webhooks (Razorpay/Stripe) must verify HMAC-SHA256 signatures before triggering order status transitions. Unverified browser redirect responses will never mark an order as paid.
3. **Idempotent Order Release:** Webhook listeners check if the order has already been transitioned to `PAID` to prevent duplicate preparation tickets in the Kitchen Display System.
4. **Opaque QR Tokens:** Table QR codes carry an HMAC-signed token (`/order?table=T1&token=a8f9c...`) rather than an easily guessable integer ID, preventing spoofed remote orders from outside the cafe.
