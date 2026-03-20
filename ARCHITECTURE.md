# AgriMarket - System Architecture

## Project Overview
AgriMarket is a comprehensive agricultural marketplace platform connecting farmers with buyers, integrating weather data, soil information, and secure payments.

## System Features

### Core Modules
1. **User Management**
   - Farmer accounts
   - Buyer accounts
   - Admin dashboard
   - JWT authentication

2. **Crop Management**
   - Crop listing & categorization
   - Inventory tracking
   - Pricing management
   - Image uploads

3. **Marketplace**
   - Product browsing
   - Search & filtering
   - Shopping cart
   - Order management

4. **Weather Integration**
   - Real-time weather data
   - Weather forecasts
   - Rain probability alerts
   - Crop-specific recommendations

5. **Soil Information**
   - Soil nutrient data
   - Soil health scoring
   - Soil recommendations

6. **Payment Processing**
   - PayPal integration
   - Stripe (optional)
   - Secure transactions
   - Order tracking

7. **Admin Dashboard**
   - User management
   - Sales analytics
   - Weather alerts
   - Payment monitoring

## Technology Stack

### Frontend
- **HTML5**: Semantic structure
- **CSS3**: Styling, animations, flexbox, grid
- **JavaScript**: DOM manipulation, API calls, state management
- **Libraries**: Tailwind CSS, Animate.css, AOS (scroll animations)

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **JWT**: Authentication
- **Bcrypt**: Password hashing

### Third-Party APIs
- **OpenWeatherMap**: Weather data
- **OpenLandMap Soil API**: Soil information
- **PayPal API**: Payment processing

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                             │
│              (HTML, CSS, JavaScript)                         │
│  ┌──────────────┬──────────────┬──────────────┐             │
│  │   Home Page  │ Marketplace  │   Dashboard  │             │
│  │   Login Page │   Checkout   │   Profile    │             │
│  └──────────────┴──────────────┴──────────────┘             │
└──────────────────────┬──────────────────────────────────────┘
                       │ fetch() API calls
┌──────────────────────▼──────────────────────────────────────┐
│              API GATEWAY LAYER                              │
│                 (Express.js)                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Authentication │ Crops │ Orders │ Payments │ Admin │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼─────┐  ┌────▼────┐  ┌─────▼────────┐
│  MongoDB    │  │Weather  │  │  Soil API    │
│  Database   │  │API      │  │              │
└─────────────┘  └─────────┘  └──────────────┘
                       │
                 ┌─────▼─────┐
                 │  PayPal   │
                 │  API      │
                 └───────────┘
```

## Data Models

### Users Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "email": String (unique),
  "password": String (hashed),
  "role": "farmer" | "buyer" | "admin",
  "phone": String,
  "address": String,
  "city": String,
  "state": String,
  "profileImage": String (URL),
  "verified": Boolean,
  "createdAt": Date,
  "updatedAt": Date
}
```

### Crops Collection
```json
{
  "_id": ObjectId,
  "farmerId": ObjectId (reference to Users),
  "name": String,
  "category": String (e.g., "Vegetables", "Grains"),
  "description": String,
  "price": Number,
  "quantity": Number,
  "unit": String (e.g., "kg", "tons"),
  "images": [String],
  "harvestDate": Date,
  "expiryDate": Date,
  "quality": String,
  "location": String,
  "createdAt": Date,
  "updatedAt": Date
}
```

### Orders Collection
```json
{
  "_id": ObjectId,
  "buyerId": ObjectId,
  "farmerId": ObjectId,
  "items": [{
    "cropId": ObjectId,
    "quantity": Number,
    "price": Number
  }],
  "totalAmount": Number,
  "status": "pending" | "confirmed" | "shipped" | "delivered" | "cancelled",
  "paymentStatus": "unpaid" | "paid" | "refunded",
  "shippingAddress": String,
  "createdAt": Date,
  "updatedAt": Date
}
```

### Payments Collection
```json
{
  "_id": ObjectId,
  "orderId": ObjectId,
  "userId": ObjectId,
  "amount": Number,
  "currency": String,
  "paymentMethod": "paypal" | "stripe",
  "transactionId": String,
  "status": "pending" | "completed" | "failed",
  "paymentDetails": Object,
  "createdAt": Date
}
```

### Soil Reports Collection
```json
{
  "_id": ObjectId,
  "farmerId": ObjectId,
  "location": String,
  "latitude": Number,
  "longitude": Number,
  "nitrogen": Number,
  "phosphorus": Number,
  "potassium": Number,
  "pH": Number,
  "organicMatter": Number,
  "recommendations": String,
  "createdAt": Date
}
```

### Weather Logs Collection
```json
{
  "_id": ObjectId,
  "farmerId": ObjectId,
  "location": String,
  "temperature": Number,
  "humidity": Number,
  "rainfall": Number,
  "forecast": String,
  "cropAlert": Boolean,
  "alertMessage": String,
  "createdAt": Date
}
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout
- GET `/api/auth/profile` - Get user profile

### Crops
- GET `/api/crops` - Get all crops
- GET `/api/crops/:id` - Get single crop
- POST `/api/crops` - Create crop (farmer only)
- PUT `/api/crops/:id` - Update crop
- DELETE `/api/crops/:id` - Delete crop
- GET `/api/crops/search` - Search crops

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders/:id` - Get order details
- PUT `/api/orders/:id` - Update order status
- GET `/api/orders/user/:userId` - Get user orders

### Payments
- POST `/api/payments/create` - Create PayPal transaction
- POST `/api/payments/execute` - Execute payment
- GET `/api/payments/:id` - Get payment status

### Weather
- GET `/api/weather/:location` - Get weather for location
- GET `/api/weather/forecast/:location` - Get weather forecast
- POST `/api/weather/alerts/:farmerId` - Set weather alerts

### Soil Information
- GET `/api/soil/:location` - Get soil data
- POST `/api/soil/report` - Create soil report
- GET `/api/soil/recommendations/:soilType` - Get recommendations

### Admin
- GET `/api/admin/dashboard` - Dashboard statistics
- GET `/api/admin/users` - List all users
- GET `/api/admin/orders` - List all orders
- PUT `/api/admin/users/:id` - Manage users

## Deployment Pipeline

### Frontend Deployment
- Platform: Netlify or Vercel
- Build: Static HTML, CSS, JS
- Environment: Production

### Backend Deployment
- Platform: Render, Railway, or AWS
- Runtime: Node.js
- Database: MongoDB Atlas
- Environment variables: .env file

## Security Measures
- JWT token-based authentication
- Password hashing with bcrypt
- HTTPS/SSL encryption
- CORS configuration
- Input validation & sanitization
- Rate limiting
- Secure payment gateway integration
