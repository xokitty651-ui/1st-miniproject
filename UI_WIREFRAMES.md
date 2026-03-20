# UI Wireframes & Design System

## Design System

### Color Palette
```css
Primary Green: #2D6A4F      /* Trust, agriculture */
Secondary Green: #40916C   /* Growth */
Accent Orange: #FF9F1C     /* Energy, action */
Light Green: #D8F3DC       /* Backgrounds */
Neutral Dark: #1B263B      /* Text */
Neutral Light: #F1FAEE     /* Backgrounds */
White: #FFFFFF
Gray: #E8E8E8
Error Red: #C1121F
Success Green: #06D6A0
Warning Yellow: #F4D35E
```

### Typography
```css
Font Family: "Poppins", "Inter", sans-serif
Heading 1: 36px, Bold (weight: 700)
Heading 2: 28px, Bold (weight: 700)
Heading 3: 24px, Semi-bold (weight: 600)
Body: 16px, Regular (weight: 400)
Small: 14px, Regular (weight: 400)
Micro: 12px, Regular (weight: 400)
```

### Spacing Scale
```css
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

### Border Radius
```css
sm: 4px
md: 8px
lg: 12px
xl: 16px
full: 9999px (circles)
```

### Shadows
```css
sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg: 0 10px 15px -3px rgba(0, 0, 0, 0.15)
xl: 0 20px 25px -5px rgba(0, 0, 0, 0.2)
```

---

## Page Wireframes

### 1. Home Page (Landing)

```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                            │
│  Logo  [Home] [Marketplace] [Dashboard] [Login] [Sign Up]       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      HERO SECTION                               │
│  Large Banner Image / Video Background                          │
│        "Connect Farmers with Buyers"                            │
│     [Explore Marketplace] [Get Started]                         │
│                                                                 │
│                 [Search Box for crops]                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    FEATURES SECTION                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   🌾 Direct  │  │  🌤️ Weather  │  │  💰 Secure   │         │
│  │  Farmer Link │  │  Integration  │  │  Payments    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  🌱 Soil Info│  │  📦 Tracking │  │  ⭐ Ratings  │         │
│  │  Analytics   │  │  & Delivery  │  │  & Reviews   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   TRENDING CROPS                                │
│  [Crop Card]  [Crop Card]  [Crop Card]  [Crop Card]           │
│  [Crop Card]  [Crop Card]  [Crop Card]  [Crop Card]           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  HOW IT WORKS                                   │
│  Step 1: Browse    →  Step 2: Select  →  Step 3: Pay  →       │
│  Available Crops        Crops             Securely             │
│  Step 4: Receive   →  Step 5: Rate    →  Step 6: Repeat       │
│  Fresh Products        Farmer                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    FOOTER                                       │
│  About | Contact | Privacy | Terms | Social Links              │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Marketplace Page

```
┌─────────────────────────────────────────────────────────────────┐
│                    NAVIGATION BAR                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ SIDEBAR FILTERS         │          PRODUCTS GRID                │
│ ┌──────────────────┐   │  ┌────────────┐  ┌────────────┐      │
│ │ Category ▼       │   │  │[Product 1] │  │[Product 2] │      │
│ │ Vegetables       │   │  │            │  │            │      │
│ │ Grains           │   │  │ $50/kg     │  │ $30/kg     │      │
│ │ Dairy            │   │  └────────────┘  └────────────┘      │
│ │ Fruits           │   │  ┌────────────┐  ┌────────────┐      │
│ ├──────────────────┤   │  │[Product 3] │  │[Product 4] │      │
│ │ Price Range      │   │  │            │  │            │      │
│ │ $0    - $100     │   │  │ $75/kg     │  │ $45/kg     │      │
│ │ $100  - $500     │   │  └────────────┘  └────────────┘      │
│ │ $500+ ▼          │   │  ┌────────────┐  ┌────────────┐      │
│ ├──────────────────┤   │  │[Product 5] │  │[Product 6] │      │
│ │ Quality          │   │  │            │  │            │      │
│ │ ☑️ Premium       │   │  │ $40/kg     │  │ $25/kg     │      │
│ │ ☑️ Standard      │   │  └────────────┘  └────────────┘      │
│ │ ☑️ Grade-A       │   │                                        │
│ ├──────────────────┤   │  [Load More]                           │
│ │ Rating           │   │                                        │
│ │ ⭐⭐⭐⭐⭐      │   │                                        │
│ │ ⭐⭐⭐⭐       │   │                                        │
│ │ ⭐⭐⭐        │   │                                        │
│ └──────────────────┘   │                                        │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Product Detail Page

```
┌─────────────────────────────────────────────────────────────────┐
│ < Back  |        PRODUCT DETAILS        |  ♥ Wishlist          │
├─────────────────────────────────────────────────────────────────┤
│ [Large Product Image]  │  Product Name: Organic Tomatoes       │
│ [Thumbnail 1]          │  Category: Vegetables                 │
│ [Thumbnail 2]          │  Quality: Premium                     │
│ [Thumbnail 3]          │  Price: $50/kg                        │
│                        │                                        │
│                        │  ⭐⭐⭐⭐⭐ (234 reviews)           │
│                        │                                        │
│                        │  Description:                          │
│                        │  Fresh, pesticide-free tomatoes       │
│                        │  harvested this morning...             │
│                        │                                        │
│                        │  📦 Available: 100 kg                 │
│                        │  📅 Harvest Date: 2024-11-28          │
│                        │  ⏰ Expires: 2024-12-05               │
│                        │  📍 Location: Springfield              │
│                        │                                        │
│                        │  Quantity: [1 ▼]  kg                  │
│                        │  [Add to Cart]  [Buy Now]             │
├─────────────────────────────────────────────────────────────────┤
│ FARMER INFO            │  SHIPPING INFO                         │
│ Name: John Farmer      │  Standard: 3-5 days                   │
│ Rating: 4.8⭐          │  Express: 1-2 days                    │
│ Followers: 1,234       │  Free shipping on orders > $100        │
│ [Follow] [Message]     │                                        │
├─────────────────────────────────────────────────────────────────┤
│ CUSTOMER REVIEWS                                                │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ ⭐⭐⭐⭐⭐ "Very Fresh!" - Sarah B. - 2 days ago      │   │
│ │ Great quality, delivered on time, highly recommend!    │   │
│ └─────────────────────────────────────────────────────────┘   │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ ⭐⭐⭐⭐ "Good but expensive" - John D. - 1 week ago    │   │
│ │ Quality is excellent but a bit pricey                  │   │
│ └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 4. Login Page

```
┌─────────────────────────────────────────────────────────────────┐
│                      AgriMarket Logo                            │
│                                                                 │
│                      LOGIN TO YOUR ACCOUNT                      │
│                                                                 │
│  Email Address                                                  │
│  [___________________________________]                         │
│                                                                 │
│  Password                                                       │
│  [___________________________________] 👁️                     │
│                                                                 │
│  ☑️ Remember Me              [Forgot Password?]                │
│                                                                 │
│  [            LOGIN             ]                              │
│                                                                 │
│  ────────── OR CONTINUE WITH ──────────                        │
│  [🔵 Google] [🔷 Facebook] [📘 PayPal]                        │
│                                                                 │
│  Don't have an account? [SIGN UP]                             │
└─────────────────────────────────────────────────────────────────┘
```

### 5. User Dashboard (Farmer)

```
┌─────────────────────────────────────────────────────────────────┐
│        SIDEBAR        │           MAIN CONTENT                 │
│ ┌──────────────────┐  │ ┌──────────────────────────────────┐  │
│ │ 📊 Dashboard     │  │ │ Welcome back, John Farmer!       │  │
│ │ 🌾 My Crops      │  │ ├──────────────────────────────────┤  │
│ │ 📦 Orders        │  │ │ QUICK STATS                      │  │
│ │ 💰 Earnings      │  │ │ Total Sales: $5,234 | Orders: 45│  │
│ │ 🌤️  Weather     │  │ │ Avg Rating: 4.8⭐  | Followers:89│  │
│ │ 🌱 Soil Info     │  │ └──────────────────────────────────┘  │
│ │ ⚙️ Settings      │  │ ┌──────────────────────────────────┐  │
│ │ 🚪 Logout        │  │ │ RECENT ORDERS                    │  │
│ └──────────────────┘  │ │ Order #1: 20kg Tomatoes - $500   │  │
│                       │ │ Order #2: 50kg Corn - $750       │  │
│                       │ │ Order #3: 30kg Wheat - $600      │  │
│                       │ │ [View All]                       │  │
│                       │ └──────────────────────────────────┘  │
│                       │ ┌──────────────────────────────────┐  │
│                       │ │ MY CROPS OVERVIEW                │  │
│                       │ │ [Add New Crop] [+ Inventory]     │  │
│                       │ │ Product | Price | Stock | Action │  │
│                       │ │ Tomatoes| $50/kg| 100kg |Edit   │  │
│                       │ │ Corn    | $30/kg| 200kg |Edit   │  │
│                       │ │ Wheat   | $25/kg| 150kg |Edit   │  │
│                       │ └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 6. User Dashboard (Buyer)

```
┌─────────────────────────────────────────────────────────────────┐
│        SIDEBAR        │           MAIN CONTENT                 │
│ ┌──────────────────┐  │ ┌──────────────────────────────────┐  │
│ │ 📊 Dashboard     │  │ │ Welcome, Sarah Buyer!            │  │
│ │ 🛒 My Orders     │  │ ├──────────────────────────────────┤  │
│ │ ♥️  Wishlist     │  │ │ QUICK STATS                      │  │
│ │ 💳 Payments      │  │ │ Total Spent: $3,421 | Orders: 28 │  │
│ │ 🚚 Deliveries   │  │ │ Active Orders: 2 | Saved: 12     │  │
│ │ ⭐ Ratings      │  │ └──────────────────────────────────┘  │
│ │ ⚙️ Settings      │  │ ┌──────────────────────────────────┐  │
│ │ 🚪 Logout        │  │ │ ACTIVE ORDERS                    │  │
│ └──────────────────┘  │ │ Order #ORD-001: Status: Shipped  │  │
│                       │ │ Tomatoes (20kg) - Expected: 2 days│  │
│                       │ │ Order #ORD-002: Status: Pending  │  │
│                       │ │ Corn (50kg) - Payment Pending    │  │
│                       │ └──────────────────────────────────┘  │
│                       │ ┌──────────────────────────────────┐  │
│                       │ │ RECENT PURCHASES                 │  │
│                       │ │ Farmer: John Farmer - Tomatoes   │  │
│                       │ │ Farmer: Jane Smith - Fresh Milk  │  │
│                       │ │ Farmer: Bob Johnson - Eggs       │  │
│                       │ └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 7. Checkout Page

```
┌─────────────────────────────────────────────────────────────────┐
│                      CHECKOUT                                   │
│  Step 1 ✓  Step 2 ✓  Step 3 (Payment)  Step 4 (Review)       │
├─────────────────────────────────────────────────────────────────┤
│ LEFT (Order Summary)      │  RIGHT (Payment Details)           │
│ ┌──────────────────────┐  │  ┌────────────────────────────┐   │
│ │ ORDER ITEMS          │  │  │ PAYMENT METHOD             │   │
│ │                      │  │  │ ☑️ PayPal                 │   │
│ │ Tomatoes (20kg)      │  │  │ ☐ Stripe Card            │   │
│ │ $50/kg x 20 = $1,000 │  │  │ ☐ UPI                    │   │
│ │                      │  │  ├────────────────────────────┤   │
│ │ Corn (50kg)          │  │  │ SHIPPING ADDRESS           │   │
│ │ $30/kg x 50 = $1,500 │  │  │ Name: Sarah Buyer          │   │
│ │                      │  │  │ Address: 456 Main St       │   │
│ │ ├──────────────────┤ │  │  │ City, State ZIP            │   │
│ │ │ Subtotal: $2,500 │ │  │  │ [Change Address]           │   │
│ │ │ Shipping: Free   │ │  │  ├────────────────────────────┤   │
│ │ │ Tax: $250        │ │  │  │ BILLING ADDRESS            │   │
│ │ │ ───────────────── │ │  │  │ ☑️ Same as Shipping       │   │
│ │ │ TOTAL: $2,750    │ │  │  │ ☐ Different Address       │   │
│ │ └──────────────────┘ │  │  ├────────────────────────────┤   │
│ │                      │  │  │ [Continue to PayPal]       │   │
│ │ [Apply Coupon]       │  │  │ [Place Order]              │   │
│ └──────────────────────┘  │  └────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 8. Admin Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│                        ADMIN PANEL                              │
│ [Dashboard] [Users] [Crops] [Orders] [Payments] [Reports]     │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│ │ Total Users  │  │ Total Orders │  │ Total Revenue│         │
│ │     1,234    │  │      5,678   │  │   $456,789   │         │
│ └──────────────┘  └──────────────┘  └──────────────┘         │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│ │ Active Crops │  │ Pending Pay. │  │ Avg Rating   │         │
│ │    2,345     │  │      123     │  │    4.6⭐     │         │
│ └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ REVENUE CHART (Last 7 Days)                             │   │
│ │ $200K ┤                                                 │   │
│ │ $150K ┤    ┌──┐                                         │   │
│ │ $100K ┤    │  │    ┌──┐                                │   │
│ │  $50K ┤┌──┐│  │┌──┐│  │                                │   │
│ │   $0K ┤├─┬┤  ├┤┬─┼─ ┤                                 │   │
│ │       └──┴───┴──┴────┘                                  │   │
│ │       Mon Tue Wed Thu Fri Sat Sun                        │   │
│ └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ RECENT TRANSACTIONS                                     │   │
│ │ User | Order | Amount | Status | Date      | Action    │   │
│ │ John | #123  | $1,000 | Paid   | 2024-11-29| View     │   │
│ │ Jane | #124  | $750   | Pending| 2024-11-29| Verify   │   │
│ │ Bob  | #125  | $500   | Failed | 2024-11-28| Resend   │   │
│ └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Specifications

### Product Card Component
```
┌────────────────────┐
│  [Product Image]   │
│   (300x200px)      │
├────────────────────┤
│ Organic Tomatoes   │ (16px, Semi-bold)
│ Premium Quality    │ (12px, Gray)
│ by John Farmer     │ (12px, Gray)
├────────────────────┤
│ ⭐⭐⭐⭐⭐ (234)   │
│ $50/kg  [♥]  [+]   │
│ Stock: 100 kg      │
└────────────────────┘
Dimensions: 280px x 380px
Margin: 16px
Hover: Lift up, shadow increase
```

### Order Tracking Component
```
┌────────────────────────────────────┐
│ Pending → Confirmed → Shipped      │
│    ✓          ✓          ✓         │
│             (Currently at this step)│
│ Expected Delivery: 2 days          │
│ Tracking #: TRK-2024-00123         │
│ [Track on Map] [Contact Support]   │
└────────────────────────────────────┘
```

## Animation Specifications

### Scroll Animations (AOS)
- Fade-in on scroll
- Slide-up on scroll
- Zoom-in on scroll
- Stagger effect for lists

### Hover Effects
- Scale: 1.02
- Shadow: lg
- Duration: 200ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

### Loading States
- Skeleton screens for product cards
- Pulse animation for loading
- Spinner animation for API calls

### Success/Error States
- Toast notifications with slide animation
- Alert boxes with fade-in
- Success checkmark animation
