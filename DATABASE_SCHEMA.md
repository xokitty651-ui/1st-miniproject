# Database Schema

## MongoDB Collections & Indexes

### 1. Users Collection

```javascript
db.createCollection("users");

db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ createdAt: -1 });

// Schema
{
  _id: ObjectId,
  name: String,                    // Required
  email: String,                   // Required, Unique
  password: String,                // Required, Hashed with bcrypt
  role: String,                    // "farmer", "buyer", "admin"
  phone: String,
  address: String,
  city: String,
  state: String,
  country: String,
  profileImage: String,            // URL to image
  bio: String,
  verified: Boolean,               // Email verified
  rating: Number,                  // Average rating
  totalRatings: Number,
  followers: [ObjectId],           // Reference to Users
  following: [ObjectId],           // Reference to Users
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
  isActive: Boolean
}
```

### 2. Crops Collection

```javascript
db.createCollection("crops");

db.crops.createIndex({ farmerId: 1 });
db.crops.createIndex({ category: 1 });
db.crops.createIndex({ name: "text", description: "text" });
db.crops.createIndex({ createdAt: -1 });
db.crops.createIndex({ price: 1 });

// Schema
{
  _id: ObjectId,
  farmerId: ObjectId,              // Reference to Users (farmer)
  name: String,                    // Required (e.g., "Organic Tomatoes")
  category: String,                // Required (e.g., "Vegetables")
  subcategory: String,             // e.g., "Root Vegetables"
  description: String,
  price: Number,                   // Price per unit
  quantity: Number,                // Available quantity
  unit: String,                    // "kg", "tons", "piece", etc.
  images: [String],                // URLs to images
  quality: String,                 // "Premium", "Standard", "Grade-A"
  harvestDate: Date,
  expiryDate: Date,
  location: {
    address: String,
    city: String,
    state: String,
    latitude: Number,
    longitude: Number
  },
  specifications: {
    organic: Boolean,
    pesticide_free: Boolean,
    fertilizer_type: String
  },
  ratings: {
    average: Number,
    count: Number,
    reviews: [ObjectId]           // Reference to Reviews
  },
  sold: Number,                    // Total quantity sold
  discount: Number,                // Discount percentage
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Orders Collection

```javascript
db.createCollection("orders");

db.orders.createIndex({ buyerId: 1 });
db.orders.createIndex({ farmerId: 1 });
db.orders.createIndex({ status: 1 });
db.orders.createIndex({ createdAt: -1 });

// Schema
{
  _id: ObjectId,
  orderNumber: String,             // Unique order ID (e.g., "ORD-2024-0001")
  buyerId: ObjectId,               // Reference to Users
  farmerId: ObjectId,              // Reference to Users
  items: [
    {
      cropId: ObjectId,            // Reference to Crops
      cropName: String,
      quantity: Number,
      pricePerUnit: Number,
      subtotal: Number,
      discount: Number
    }
  ],
  totalQuantity: Number,
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  totalAmount: Number,
  status: String,                  // "pending", "confirmed", "shipped", "delivered", "cancelled"
  paymentStatus: String,           // "unpaid", "paid", "refunded", "partial"
  paymentMethod: String,           // "paypal", "stripe", "cash"
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  trackingNumber: String,
  notes: String,
  estimatedDelivery: Date,
  actualDelivery: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Payments Collection

```javascript
db.createCollection("payments");

db.payments.createIndex({ orderId: 1 });
db.payments.createIndex({ userId: 1 });
db.payments.createIndex({ status: 1 });
db.payments.createIndex({ createdAt: -1 });

// Schema
{
  _id: ObjectId,
  orderId: ObjectId,               // Reference to Orders
  userId: ObjectId,                // Reference to Users (buyer)
  farmerId: ObjectId,              // Reference to Users
  amount: Number,
  currency: String,                // "USD", "INR", etc.
  paymentMethod: String,           // "paypal", "stripe", "wallet"
  status: String,                  // "pending", "completed", "failed", "refunded"
  transactionId: String,           // Payment gateway transaction ID
  paymentDetails: {
    provider: String,
    payerId: String,
    payerEmail: String
  },
  refund: {
    amount: Number,
    reason: String,
    date: Date,
    refundId: String
  },
  metadata: {
    ip: String,
    userAgent: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Soil Reports Collection

```javascript
db.createCollection("soilReports");

db.soilReports.createIndex({ farmerId: 1 });
db.soilReports.createIndex({ createdAt: -1 });

// Schema
{
  _id: ObjectId,
  farmerId: ObjectId,              // Reference to Users
  location: {
    address: String,
    city: String,
    state: String,
    latitude: Number,
    longitude: Number
  },
  nitrogen: Number,                // mg/kg
  phosphorus: Number,              // mg/kg
  potassium: Number,               // mg/kg
  calcium: Number,
  magnesium: Number,
  sulphur: Number,
  pH: Number,
  electricalConductivity: Number,
  organicMatter: Number,           // percentage
  soilType: String,                // "Sandy", "Loamy", "Clay"
  classification: String,
  recommendations: String,
  suggestedCrops: [String],
  fertilizer_recommendations: String,
  tested_by: String,               // Lab name
  testDate: Date,
  createdAt: Date
}
```

### 6. Weather Logs Collection

```javascript
db.createCollection("weatherLogs");

db.weatherLogs.createIndex({ farmerId: 1 });
db.weatherLogs.createIndex({ createdAt: -1 });
db.weatherLogs.createIndex({ "location.latitude": 1, "location.longitude": 1 });

// Schema
{
  _id: ObjectId,
  farmerId: ObjectId,              // Reference to Users (optional)
  location: {
    address: String,
    city: String,
    latitude: Number,
    longitude: Number
  },
  temperature: Number,             // Celsius
  humidity: Number,                // percentage
  rainfall: Number,                // mm
  windSpeed: Number,               // km/h
  pressure: Number,                // hPa
  visibility: Number,              // km
  description: String,             // "Clear", "Rainy", "Cloudy"
  feelsLike: Number,
  rainProbability: Number,         // percentage
  uvIndex: Number,
  forecast: [
    {
      date: Date,
      maxTemp: Number,
      minTemp: Number,
      description: String,
      rainProbability: Number,
      humidity: Number
    }
  ],
  cropAlert: Boolean,
  alertMessage: String,
  alertType: String,               // "frost", "rainfall", "drought", "heat"
  lastUpdated: Date,
  createdAt: Date
}
```

### 7. Reviews Collection

```javascript
db.createCollection("reviews");

db.reviews.createIndex({ cropId: 1 });
db.reviews.createIndex({ userId: 1 });
db.reviews.createIndex({ createdAt: -1 });

// Schema
{
  _id: ObjectId,
  cropId: ObjectId,                // Reference to Crops
  userId: ObjectId,                // Reference to Users (reviewer)
  rating: Number,                  // 1-5
  title: String,
  comment: String,
  verified: Boolean,               // Verified purchase
  helpful: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 8. Admin Logs Collection

```javascript
db.createCollection("adminLogs");

db.adminLogs.createIndex({ userId: 1 });
db.adminLogs.createIndex({ createdAt: -1 });
db.adminLogs.createIndex({ action: 1 });

// Schema
{
  _id: ObjectId,
  userId: ObjectId,                // Reference to Users (admin)
  action: String,                  // "user_deleted", "crop_removed", etc.
  target: String,                  // Entity affected (user, crop, order)
  targetId: ObjectId,
  details: String,
  oldValue: Object,
  newValue: Object,
  ipAddress: String,
  userAgent: String,
  createdAt: Date
}
```

## Relationships

```
Users
├── Farmers
│   ├── Crops (one-to-many)
│   │   ├── Orders (one-to-many)
│   │   └── Reviews (one-to-many)
│   ├── Soil Reports (one-to-many)
│   └── Weather Logs (one-to-many)
├── Buyers
│   └── Orders (one-to-many)
│       ├── Payments (one-to-many)
│       └── Items → Crops
└── Admin
    └── Admin Logs (one-to-many)
```

## Sample MongoDB Queries

```javascript
// Find all crops from a specific farmer
db.crops.find({ farmerId: ObjectId("...") })

// Get completed orders for a buyer
db.orders.find({ buyerId: ObjectId("..."), status: "delivered" })

// Calculate total revenue
db.payments.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
])

// Get top-selling crops
db.crops.aggregate([
  { $sort: { sold: -1 } },
  { $limit: 10 }
])

// Get weather alerts for a farmer
db.weatherLogs.find({ farmerId: ObjectId("..."), cropAlert: true })
```
