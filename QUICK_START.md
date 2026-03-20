# 🚀 Quick Start Guide - AgriMarket Complete System

## System Status ✅

- **Frontend**: 7 pages (index, login, register, marketplace, checkout, dashboard, about)
- **Backend**: Node.js/Express server with full API
- **Database**: MongoDB ready for connection
- **Payment**: PayPal v2 API integrated
- **Authentication**: JWT-based with secure middleware

## Prerequisites

```powershell
# Check Node.js version (should be 14+)
node --version

# Check npm version
npm --version

# Ensure MongoDB is running locally
# Or configure MONGODB_URI to MongoDB Atlas
```

## Quick Start (5 minutes)

### 1. Start Backend Server

```powershell
cd "c:\Users\Sruu\OneDrive\Desktop\miniproject\backend"
npm install          # If not already done
npm run dev          # Starts on http://localhost:5000
```

**Expected Output**:

```
✓ MongoDB Connected: localhost
✓ Server started on port 5000
✓ All routes loaded successfully
```

### 2. Open Frontend in Browser

**Option A**: Using File Path

```
file:///c:/Users/Sruu/OneDrive/Desktop/miniproject/frontend/pages/index.html
```

**Option B**: Using Live Server (VS Code)

- Right-click `index.html` → "Open with Live Server"

### 3. Test Complete User Flow

```
Homepage → Get Started → Register → Login → Marketplace → Add to Cart → Checkout → PayPal Payment → Dashboard
```

## Key Endpoints

### Authentication API

| Method | Endpoint | Body | Protected |
|--------|----------|------|-----------|
| POST | `/api/auth/register` | { email, password, name, role } | ❌ |
| POST | `/api/auth/login` | { email, password } | ❌ |
| GET | `/api/auth/profile` | - | ✅ |
| PUT | `/api/auth/profile` | { name, phone, address } | ✅ |

### Crops API

| Method | Endpoint | Purpose | Protected |
|--------|----------|---------|-----------|
| GET | `/api/crops` | List all crops | ❌ |
| GET | `/api/crops/:id` | Get single crop | ❌ |
| POST | `/api/crops` | Create crop (farmer only) | ✅ |
| PUT | `/api/crops/:id` | Update crop | ✅ |
| DELETE | `/api/crops/:id` | Delete crop | ✅ |

### Orders API
| Method | Endpoint | Purpose | Protected |
|--------|----------|---------|-----------|
| GET | `/api/orders` | List user's orders | ✅ |
| GET | `/api/orders/:id` | Get order details | ✅ |
| POST | `/api/orders` | Create order | ✅ |

### **Payments API** (New!)

| Method | Endpoint | Purpose | Protected |
|--------|----------|---------|-----------|
| POST | `/api/payments/create` | Create PayPal order | ✅ |
| POST | `/api/payments/execute` | Capture payment | ✅ |
| GET | `/api/payments/status/:orderId` | Check payment status | ✅ |
| POST | `/api/payments/refund` | Process refund | ✅ |
| POST | `/api/payments/webhook/paypal` | PayPal IPN webhook | ❌ |

## File Structure

```
miniproject/
├── 📁 frontend/
│   ├── 📁 pages/
│   │   ├── 📄 index.html          ← Home page (Hero, Features, Products)
│   │   ├── 📄 login.html          ← Login form
│   │   ├── 📄 register.html       ← Registration form
│   │   ├── 📄 marketplace.html    ← Browse & filter products
│   │   ├── 📄 checkout.html       ← 🆕 Checkout & PayPal payment
│   │   ├── 📄 dashboard.html      ← User profile & orders
│   │   └── 📄 about.html          ← Company info
│   ├── 📁 js/
│   │   ├── 📄 main.js             ← Home page logic
│   │   ├── 📄 auth.js             ← Auth form handlers
│   │   ├── 📄 marketplace.js      ← Product filtering
│   │   ├── 📄 checkout.js         ← 🆕 Checkout & payment logic
│   │   └── 📄 dashboard.js        ← Dashboard logic
│   ├── 📁 css/
│   │   └── 📄 main.css            ← Tailwind + custom styles
│   └── 📁 assets/                 ← Images, icons
│
├── 📁 backend/
│   ├── 📁 models/
│   │   ├── 📄 User.js             ← User schema
│   │   ├── 📄 Crop.js             ← Crop schema
│   │   └── 📄 Order.js            ← Order schema
│   ├── 📁 controllers/
│   │   ├── 📄 authController.js   ← Auth logic
│   │   ├── 📄 cropController.js   ← Crop logic
│   │   ├── 📄 orderController.js  ← Order logic
│   │   ├── 📄 paymentController.js ← 🆕 PayPal payment logic
│   │   └── 📄 weatherController.js ← Weather API
│   ├── 📁 routes/
│   │   ├── 📄 auth.js             ← Auth routes
│   │   ├── 📄 crops.js            ← Crop routes
│   │   ├── 📄 orders.js           ← Order routes
│   │   ├── 📄 payments.js         ← 🆕 Payment routes
│   │   └── 📄 weather.js          ← Weather routes
│   ├── 📁 middleware/
│   │   └── 📄 auth.js             ← JWT verification
│   ├── 📄 server.js               ← Express app setup
│   ├── 📄 .env                    ← Environment variables
│   └── 📄 package.json            ← Dependencies
│
├── 📄 README.md                   ← Full documentation
├── 📄 ARCHITECTURE.md             ← System design
├── 📄 API_REFERENCE.md            ← API documentation
├── 📄 DATABASE_SCHEMA.md          ← MongoDB schemas
├── 📄 CHECKOUT_IMPLEMENTATION.md  ← 🆕 Checkout flow
├── 📄 TESTING_GUIDE.md            ← 🆕 Testing instructions
└── 📄 UI_WIREFRAMES.md            ← UI mockups
```

## Frontend Features

### 🏠 Home Page (`index.html`)
- Hero section with CTA
- Features showcase
- Trending products
- Search bar
- Call-to-action buttons

### 🔐 Authentication (`login.html`, `register.html`)
- Email/password forms
- Role selection (Buyer/Farmer)
- Password strength indicator
- Social login UI (placeholder)
- Form validation

### 🛒 Marketplace (`marketplace.html`)
- Product grid (4 columns)
- Search bar
- Category filter
- Price range filter
- Sort options (price, rating)
- Pagination
- Add to cart button
- Cart counter in navbar

### 🛍️ **Checkout (`checkout.html`)** 🆕
- Cart items display
- Real-time total calculation
- Shipping & tax applied
- Billing form with validation
- **PayPal payment integration**
- Order confirmation
- Auto-redirect to dashboard

### 📊 Dashboard (`dashboard.html`)
- User profile section
- Orders tab with history
- Crop listings (for farmers)
- Profile update form
- Order status tracking

### ℹ️ About Page (`about.html`)
- Company mission/vision
- Team section
- FAQ section
- Contact information

## Backend Features

### 🔐 Authentication
- JWT-based token generation
- Bcrypt password hashing
- Protected routes
- Auto token refresh
- Role-based access

### 📦 Crop Management
- Create crop listings
- Update inventory
- Filter by category/price
- Search functionality
- Inventory tracking

### 📋 Order Processing
- Cart to order conversion
- Automatic inventory reduction
- Order number generation
- Order status tracking
- Order history

### **💳 Payment Processing** 🆕
- PayPal v2 API integration
- OAuth2 token management
- Order creation and capture
- Webhook support
- Refund processing
- Payment status tracking

### 🌤️ Weather Integration
- Real-time weather data
- 5-day forecast
- Crop-specific recommendations
- Location-based alerts

## Testing Checklist

### Quick Test (2 minutes)
- [ ] Start backend (`npm run dev`)
- [ ] Open frontend homepage
- [ ] Click "Get Started"
- [ ] Register new account
- [ ] Login successfully
- [ ] See marketplace products
- [ ] Add item to cart
- [ ] Navigate to checkout

### Payment Test (5 minutes)
- [ ] Complete checkout form
- [ ] Click "Pay with PayPal"
- [ ] Approve payment in PayPal sandbox
- [ ] See order confirmation
- [ ] Verify order in dashboard
- [ ] Check MongoDB for order record

### Edge Cases
- [ ] Empty cart handling
- [ ] Missing form fields
- [ ] Not logged in redirect
- [ ] API unavailable fallback
- [ ] Payment cancellation

## Configuration

### Environment Variables (`.env`)

**Development** (Already Set):

```
PAYPAL_CLIENT_ID=demo_client_id
PAYPAL_CLIENT_SECRET=demo_client_secret
PAYPAL_MODE=sandbox
```

**For Production** (To Update):

```
PAYPAL_CLIENT_ID=your_live_id
PAYPAL_CLIENT_SECRET=your_live_secret
PAYPAL_MODE=live
```

### Database Configuration

**Local MongoDB**:

```
MONGODB_URI=mongodb://localhost:27017/agrimarket
```

**MongoDB Atlas** (Cloud):

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agrimarket
```

## Troubleshooting

### Backend won't start

```powershell
# Check Node version
node --version

# Check ports
netstat -ano | findstr :5000

# Reinstall dependencies
cd backend
rm -r node_modules
npm install
npm run dev
```

### API returning 401 Unauthorized
- Check localStorage has authToken
- Login again to refresh token
- Check JWT_SECRET in .env matches

### PayPal payment not working
- Verify PAYPAL_CLIENT_ID in .env
- Check PayPal sandbox credentials
- Ensure backend is running on port 5000

### MongoDB connection failed
- Start MongoDB locally: `mongod`
- OR update MONGODB_URI to Atlas connection string
- Check MONGODB_URI in .env

### Cart items not persisting
- Enable localStorage in browser
- Check browser privacy settings
- Look for console errors

## Performance Tips

1. **Frontend Caching**: Uses localStorage for cart (no API calls)
2. **Lazy Loading**: Products loaded on-demand
3. **Rate Limiting**: 100 requests per 15 minutes per IP
4. **Database Indexes**: Optimized for common queries

## Security Features

✅ JWT authentication
✅ Password hashing (bcrypt)
✅ CORS configured
✅ Helmet security headers
✅ Rate limiting
✅ Input validation
✅ PayPal OAuth2
✅ Protected payment endpoints

## Next Steps

1. **Deploy Frontend**:
   - Netlify: `netlify deploy --prod --dir frontend`
   - Vercel: `vercel`

2. **Deploy Backend**:
   - Render: Connect GitHub repo
   - Railway: `railway link` then `railway deploy`

3. **Database**:
   - Use MongoDB Atlas (free tier available)
   - Connection string in .env

4. **SSL Certificate**:
   - Enable HTTPS
   - Update API endpoints to https://

## Support Resources

- **Testing Guide**: `TESTING_GUIDE.md`
- **Checkout Implementation**: `CHECKOUT_IMPLEMENTATION.md`
- **API Reference**: `API_REFERENCE.md`
- **Architecture**: `ARCHITECTURE.md`
- **Database Schema**: `DATABASE_SCHEMA.md`

## System Status Checklist

- ✅ Frontend pages created (7 pages)
- ✅ Backend server configured
- ✅ Authentication implemented
- ✅ Product management implemented
- ✅ Order processing implemented
- ✅ **Checkout page created** ✨
- ✅ **PayPal payment integrated** ✨
- ✅ **Order confirmation working** ✨
- ✅ Environment variables set
- ✅ Database schemas created
- ✅ API endpoints tested
- ✅ Error handling implemented
- ✅ Responsive design applied
- ✅ Accessibility features added
- ✅ Documentation complete

## Ready to Deploy!

The AgriMarket platform is now **feature-complete** and ready for:
- ✅ User testing
- ✅ Quality assurance
- ✅ Performance optimization
- ✅ Production deployment

For live testing, use PayPal sandbox credentials and test user accounts in `TESTING_GUIDE.md`.
