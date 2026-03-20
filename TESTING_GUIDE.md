# Testing Guide - AgriMarket Complete User Flow

## Prerequisites

- Backend server running on `http://localhost:5000`
- MongoDB connection configured in `.env`
- PayPal sandbox credentials in `.env`

## Step 1: Register a New Account

1. Open frontend: `file://c:/Users/Sruu/OneDrive/Desktop/miniproject/frontend/pages/index.html`
2. Click "Get Started" or navigate to `/frontend/pages/register.html`
3. Fill in:
   - **Email**: `test@example.com`
   - **Password**: `Test@1234`
   - **Confirm Password**: `Test@1234`
   - **Full Name**: Test User
   - **Role**: Buyer
4. Click "Register"
5. **Expected**: Redirected to login page with success message

## Step 2: Login

1. Navigate to `/frontend/pages/login.html`
2. Fill in:
   - **Email**: `test@example.com`
   - **Password**: `Test@1234`
3. Click "Login"
4. **Expected**: Redirected to marketplace with auth token stored in localStorage

## Step 3: Browse Marketplace

1. From home page, click "Explore Marketplace" or navigate to `/frontend/pages/marketplace.html`
2. **Features to test**:
   - View product grid with sample crops
   - Use search bar (search for "tomato" or "apple")
   - Filter by category (vegetables, fruits, grains, dairy)
   - Filter by price range
   - Sort by price or rating
   - See pagination controls
3. Add products to cart:
   - Click "Add" button on any product
   - See cart count increase in navbar
   - Try adding same product again (quantity should increase)

## Step 4: Go to Checkout

1. Click shopping cart icon in navbar (top right)
2. **Expected**: Redirected to `/frontend/pages/checkout.html`
3. **Verify**:
   - Cart items displayed with prices
   - Subtotal calculated correctly
   - Shipping ($10) added
   - Tax (10%) calculated
   - Total amount correct

## Step 5: Fill Billing Information

1. Fill out billing form:
   - **First Name**: John
   - **Last Name**: Doe
   - **Email**: `john@example.com`
   - **Address**: `123 Farm Street`
   - **City**: `Springfield`
   - **State**: `Illinois`
   - **ZIP Code**: `62701`

3.**Verify**: Form fields have green focus borders

## Step 6: PayPal Payment (Test Mode)

### Option A: Using PayPal Sandbox

1. Click "Pay with PayPal" button
2. **Expected**: Redirected to PayPal sandbox login
   - **Email**: `sb-buyer@example.com`
   - **Email**: <sb-buyer@example.com>
   - **Password**: Sandbox123
4.Review order and approve payment
5.**Expected**: Redirected back to checkout with confirmation message
6.**Verify: Order number displayed
8.Automatically redirected to dashboard after 3 seconds

### Option B: Demo Mode (if PayPal SDK not configured)

1. Click "Pay with PayPal" buttonl SDK not configured)
1. Click "Pay with PayPal" button
2.Button should show processing state
3.Check browser console for any errors
4.Verify API calls to backend: `POST /api/payments/create`

## Step 7: Verify Order in Dashboard

1. Navigate to `/frontend/pages/dashboard.html`
2. **Verify**:
   - User profile information displayed
   - Orders tab shows new order
   - Order displays items, total, and status

## Backend API Testing (cURL/Postman)

### Create User Account

```bash
POST http://localhost:5000/api/auth/register
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "farmer@example.com",
  "password": "Test@1234",
}
```

### Login

```bash
POST http://localhost:5000/api/auth/login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
```

**Response**: Returns `token` and `user` object

### List All Crops

Authorization: Bearer {token}

### Create Payment Order

```bash
POST http://localhost:5000/api/payments/create
```

### Create Payment Order

```bash
POST http://localhost:5000/api/payments/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    {
      "id": "crop_id",
      "name": "Tomatoes",
      "price": 150,
      "quantity": 2
    }
  ],
  "total": 330,
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
}
```

**Response**: Returns `approvalUrl` and `paypalOrderId`

### Execute Payment

```bash
POST http://localhost:5000/api/payments/execute
```

**Response**: Returns `approvalUrl` and `paypalOrderId`

}

**Response**: Returns `orderId` and order details

## Database Verification

### Check User Created

```bashalOrderId": "paypal_order_id_from_create"
db.users.findOne({ email: "test@example.com" })
```

**Verify**: User has `_id`, `email`, hashed `password`, `name`, `role`

### Check Order Created

db.orders.findOne({ buyer: "user_id" })

**Verify**: Order has items, total, shipping address, payment status, order number

### Check Payment Record

db.payments.findOne({ "paypal.orderId": "paypal_order_id" })

**Verify**: Payment has PayPal order ID, status (COMPLETED/APPROVED), timestamp

## Error Cases to Test

# In MongoDB

db.orders.findOne({ buyer: "user_id" })

**Verify**: Order has items, total, shipping address, payment status, order number

### Check Payment Record

```bash
# In MongoDB:
db.payments.findOne({ "paypal.orderId": "paypal_order_id" })
```

**Verify**: Payment has PayPal order ID, status (COMPLETED/APPROVED), timestamp

## Error Cases to Test

1. **Empty Cart**:
   - Try accessing checkout.html with empty cart
   - Expected: "Your cart is empty" message with link to marketplace

2. **Not Logged In**:
   - Clear localStorage of authToken
   - Try accessing checkout.html
   - Expected: Redirected to login page

3. **Missing Billing Info**:
   - Leave fields empty
   - Click "Pay with PayPal"
   - Expected: Browser validation shows required field message

4. **API Unavailable**:
   - Stop backend server
   - Try loading marketplace
   - Expected: Falls back to sample crop data with "API unavailable" message

5. **Payment Cancellation**:
   - Go through checkout
   - At PayPal, click "Cancel and return"
   - Expected: Returned to checkout, payment not captured

## Success Criteria Checklist

- ✅ User registration works
- ✅ User login works and sets authToken
- ✅ Marketplace displays products from API
- ✅ Cart stores items in localStorage
- ✅ Checkout page displays correct totals
- ✅ Billing form validates input
- ✅ PayPal payment flow works (create → approve → capture)
- ✅ Order created in MongoDB after payment
- ✅ Order number generated and displayed
- ✅ Order appears in user dashboard
- ✅ Cart cleared after successful payment
- ✅ Crop inventory reduced after payment

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| "API unavailable" on marketplace | Backend not running | Run `npm run dev` in backend directory |
| "Unauthorized" error | JWT token invalid or expired | Login again to refresh token |
| PayPal button not working | .env missing PAYPAL keys | Add valid sandbox credentials to .env |
| 404 on checkout page | Path incorrect | Use absolute path or check pages directory |
| Cart not persisting | localStorage disabled | Check browser privacy settings |
| Order not creating | MongoDB connection failed | Verify MONGODB_URI in .env and local/Atlas connection |

## Notes

- All prices are in USD
- Shipping cost is fixed at $10
- Tax rate is 10% of subtotal
- PayPal sandbox is pre-configured for testing
- Local MongoDB is pre-configured (modify MONGODB_URI for Atlas)
- All timestamps are stored in UTC
