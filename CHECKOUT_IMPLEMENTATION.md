# AgriMarket Checkout System - Implementation Summary

## Overview

A complete end-to-end checkout system has been implemented for the AgriMarket platform, connecting the frontend shopping cart to PayPal payment processing and MongoDB order storage.

## Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                        USER FLOW                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Marketplace Page        → Add items to cart (localStorage)  │
│         ↓                                                     │
│  Click cart icon         → Navigate to checkout.html         │
│         ↓                                                     │
│  Checkout Page           → Display cart summary & billing    │
│         ↓                                                     │
│  Fill billing info       → Form validation (HTML5)           │
│         ↓                                                     │
│  Click "Pay with PayPal" → API: POST /payments/create        │
│         ↓                                                     │
│  PayPal Sandbox Redirect → User approves payment             │
│         ↓                                                     │
│  Return from PayPal      → API: POST /payments/execute       │
│         ↓                                                     │
│  Order Confirmation      → Order created in MongoDB          │
│         ↓                                                     │
│  Dashboard Redirect      → View order in dashboard           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Components

### Frontend Files

#### 1. **checkout.html**

- Order summary with cart items
- Billing information form (first/last name, address, city, state, zip)
- PayPal payment button
- Order confirmation display
- Real-time cost calculation (subtotal, tax, shipping, total)

**Key Features**:

- Responsive Tailwind design
- Toast notifications for user feedback
- Form validation before payment
- Loading states during payment processing
- Order confirmation with order number

#### 2. **checkout.js**

Main controller for checkout functionality:

- **fetchAPI()**: Authenticated API calls with JWT token
- **loadCartItems()**: Loads cart from localStorage and calculates totals
- **calculateTotals()**: Computes subtotal, tax, total with shipping
- **initializePayPalButton()**: Sets up payment flow
- **handlePayPalReturn()**: Processes PayPal callback

**Configuration**:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
const SHIPPING_COST = 10.00;
const TAX_RATE = 0.10;
```

### Backend Files

#### 1. **routes/payments.js**

Exposed endpoints:

- `POST /payments/create` - Create PayPal order
- `POST /payments/execute` - Capture payment and create order record
- `GET /payments/status/:paypalOrderId` - Check payment status
- `POST /payments/refund` - Process refunds
- `POST /payments/webhook/paypal` - Receive PayPal webhooks (public)

#### 2. **controllers/paymentController.js**

Business logic:

- **getPayPalAccessToken()**: OAuth2 token exchange
- **createPayment()**: Create PayPal order, return approval link
- **executePayment()**: Capture payment, create Order in DB, reduce crop inventory
- **getPaymentStatus()**: Query PayPal for order status
- **handlePayPalWebhook()**: Process PAYMENT.CAPTURE events
- **refundPayment()**: Process refund with PayPal API

#### 3. **models/Order.js**

Database schema:

```javascript
{
  orderNumber: String,          // Unique order ID
  buyer: ObjectId,              // Reference to User
  items: [{
    crop: ObjectId,             // Reference to Crop
    name: String,
    quantity: Number,
    price: Number
  }],
  total: Number,
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zip: String
  },
  payment: {
    method: String,             // 'paypal'
    paypalOrderId: String,
    status: String,             // 'CREATED', 'APPROVED', 'COMPLETED', 'FAILED'
    captureId: String
  },
  status: String,               // 'pending', 'confirmed', 'shipped', 'delivered'
  createdAt: Date,
  updatedAt: Date
}
```

## Data Flow

### 1. Create Payment Order

**Frontend → Backend**:

```javascript
POST /api/payments/create
{
  items: [ { id, name, price, quantity }, ... ],
  total: 330,
  shippingAddress: { firstName, lastName, email, address, city, state, zip }
}
```

**Backend Processing**:

- Validate items and availability
- Get PayPal access token
- Create PayPal order via v2 API with item details
- Return approval link and order ID

**Response**:

```json
{
  "approvalUrl": "https://www.paypal.com/checkoutnow?token=...",
  "paypalOrderId": "5O190127TN364715T"
}
```

### 2. Execute Payment Capture

**Frontend → Backend** (after PayPal approval):

```javascript
POST /api/payments/execute
{
  "paypalOrderId": "5O190127TN364715T"
}
```

**Backend Processing**:

1. Get PayPal access token
2. Capture PayPal order (convert to authorized → captured)
3. Create Order document in MongoDB
4. Reduce crop quantities in inventory
5. Save payment details with order

**Response**:

```json
{
  "orderId": "ORD-123456789",
  "status": "confirmed",
  "total": 330,
  "paypalOrderId": "5O190127TN364715T"
}
```

### 3. Database Records Created

**Order Collection**:

- Order number (generated: `ORD-${Date.now()}-${random}`)
- Buyer ID (from JWT token)
- Items array (from cart)
- Totals (subtotal, tax, shipping, total)
- Shipping address (from form)
- Payment details (PayPal order ID, status)
- Timestamps

**Crop Model** (Inventory Reduction):

- For each item: `quantity -= item.quantity`
- Updated in single query

## Security Features

1. **Authentication**:
   - JWT token required for checkout endpoints
   - 401 redirect if unauthorized

2. **Validation**:
   - Item quantity validation against available stock
   - Total amount validation before capture
   - Address validation (required fields)

3. **PayPal Integration**:
   - OAuth2 for secure API access
   - Server-side order creation (prevents tampering)
   - Webhook handler for payment confirmation
   - Order ID verification before capture

4. **Payment Status**:
   - Multiple status checks (CREATED → APPROVED → COMPLETED)
   - Webhook verification for order confirmation
   - Refund support for cancellations

## Environment Configuration

**.env** (Development):

PAYPAL_CLIENT_ID=AUL_demo_client_id
PAYPAL_CLIENT_SECRET=demo_client_secret
PAYPAL_MODE=sandbox
PAYPAL_API_BASE=<https://api-m.sandbox.paypal.com>

**.env** (Production - To Update):

PAYPAL_CLIENT_ID=your_live_client_id
PAYPAL_CLIENT_SECRET=your_live_client_secret
PAYPAL_MODE=live
PAYPAL_API_BASE=<https://api-m.paypal.com>

## Testing

### Manual Test Flow

1. Register and login
2. Browse marketplace and add items to cart
3. Click cart icon to go to checkout
4. Fill billing information
5. Click "Pay with PayPal"
6. Approve payment in PayPal sandbox
7. Confirm order appears in dashboard
8. Verify MongoDB has order record

### API Test (cURL)

```bash
# 1. Register and get token
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test@123","name":"Test","role":"buyer"}'

# 2. Login to get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test@123"}'

# 3. Create payment order
curl -X POST http://localhost:5000/api/payments/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"items":[{"id":"1","name":"Tomatoes","price":150,"quantity":2}],"total":330,"shippingAddress":{...}}'

# 4. Execute payment (with paypalOrderId from step 3)
curl -X POST http://localhost:5000/api/payments/execute \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"paypalOrderId":"5O190127TN364715T"}'
```

## Key Integrations

### Cart Management

- Items stored in **localStorage** with key `'cart'`
- Format: `[{ id, name, price, quantity }, ...]`
- Persists across page reloads

### JWT Authentication

- Token stored in **localStorage** with key `'authToken'`
- Attached to all authenticated requests
- Auto-redirect on 401 Unauthorized

### PayPal v2 API

- OAuth2 flow for server-side authentication
- Order creation with full line items
- Order capture (authorization → settled)
- Webhook support for payment confirmation

### MongoDB Integration

- Order persistence with full details
- Buyer reference to User collection
- Crop inventory management
- Payment details saved for reconciliation

## Error Handling

1. **Payment Creation Fails**:
   - Toast notification with error message
   - Button re-enabled for retry
   - No order created

2. **Payment Capture Fails**:
   - Toast notification
   - "Try Again" button to restart
   - No inventory reduction
   - No order created

3. **Missing Billing Info**:
   - HTML5 form validation
   - Browser shows required field indicators
   - Prevents API call

4. **Empty Cart**:
   - Checkout page shows "Your cart is empty"
   - Link to marketplace to continue shopping

5. **Network Errors**:
   - Graceful fallback messages
   - Retry button provided
   - Console logs for debugging

## Performance Considerations

1. **Cart Caching**: localStorage reduces API calls
2. **Lazy Loading**: Crops loaded on-demand during checkout
3. **Minimal Redirects**: Direct payment flow without extra pages
4. **Efficient DB**: Indexed lookups on buyer and payment ID

## Future Enhancements

1. **Additional Payment Methods**:
   - Stripe integration
   - Apple Pay / Google Pay
   - Direct bank transfer

2. **Order Management**:
   - Partial refunds
   - Subscription orders
   - Bulk orders with discounts

3. **Notifications**:
   - Email confirmations
   - SMS order updates
   - Push notifications

4. **Admin Features**:
   - Order analytics
   - Payment reconciliation
   - Refund management interface

5. **User Features**:
   - Save billing addresses
   - Repeat orders
   - Order tracking

## Deployment Checklist

- [ ] Update PayPal credentials to live sandbox/production
- [ ] Configure MongoDB Atlas connection string
- [ ] Set JWT_SECRET to strong value
- [ ] Enable HTTPS for all endpoints
- [ ] Configure CORS for production domain
- [ ] Set up PayPal IPN webhook
- [ ] Test payment flow end-to-end
- [ ] Set up monitoring and error logging
- [ ] Configure backup for order data
- [ ] Test refund process

## Files Modified/Created

### Created

- `frontend/pages/checkout.html`
- `frontend/js/checkout.js`
- `TESTING_GUIDE.md`
- `CHECKOUT_IMPLEMENTATION.md`

### Modified

- `frontend/pages/index.html` (added checkout link)
- `frontend/pages/marketplace.html` (added checkout link)
- `backend/controllers/paymentController.js` (full implementation)
- `backend/routes/payments.js` (all endpoints)
- `backend/.env` (PayPal credentials)

## Support

For issues or questions:

1. Check `TESTING_GUIDE.md` for troubleshooting
2. Review browser console for error messages
3. Check backend logs for API errors
4. Verify MongoDB connection
5. Confirm PayPal credentials are set
