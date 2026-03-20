# API Reference Guide

## Base URL
```
Development: http://localhost:5000/api
Production: https://agrimarket-api.herokuapp.com/api
```

## Authentication Endpoints

### 1. User Registration
**POST** `/auth/register`

Request Body:
```json
{
  "name": "John Farmer",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "farmer",
  "phone": "9876543210",
  "address": "123 Farm Lane",
  "city": "Springfield",
  "state": "Illinois"
}
```

Response (201):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f5a2c1b3d4e5f6g7h8i9j0",
    "name": "John Farmer",
    "email": "john@example.com",
    "role": "farmer"
  }
}
```

### 2. User Login
**POST** `/auth/login`

Request Body:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

Response (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f5a2c1b3d4e5f6g7h8i9j0",
    "name": "John Farmer",
    "email": "john@example.com",
    "role": "farmer"
  }
}
```

### 3. Get User Profile
**GET** `/auth/profile`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "success": true,
  "user": {
    "_id": "64f5a2c1b3d4e5f6g7h8i9j0",
    "name": "John Farmer",
    "email": "john@example.com",
    "role": "farmer",
    "phone": "9876543210",
    "address": "123 Farm Lane",
    "city": "Springfield",
    "state": "Illinois",
    "profileImage": "https://...",
    "verified": true
  }
}
```

## Crop Management Endpoints

### 1. Get All Crops
**GET** `/crops?page=1&limit=10&category=vegetables`

Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category
- `search` (optional): Search query

Response (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f5a2c1b3d4e5f6g7h8i9j0",
      "farmerId": "64f5a2c1b3d4e5f6g7h8i9j1",
      "name": "Organic Tomatoes",
      "category": "Vegetables",
      "description": "Fresh, pesticide-free tomatoes",
      "price": 50,
      "quantity": 100,
      "unit": "kg",
      "images": ["https://..."],
      "quality": "Premium",
      "location": "Springfield",
      "harvestDate": "2024-11-28",
      "expiryDate": "2024-12-05"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "pages": 15
  }
}
```

### 2. Get Single Crop
**GET** `/crops/:cropId`

Response (200):
```json
{
  "success": true,
  "data": {
    "_id": "64f5a2c1b3d4e5f6g7h8i9j0",
    "farmerId": "64f5a2c1b3d4e5f6g7h8i9j1",
    "name": "Organic Tomatoes",
    "category": "Vegetables",
    "description": "Fresh, pesticide-free tomatoes",
    "price": 50,
    "quantity": 100,
    "unit": "kg",
    "images": ["https://..."],
    "harvestDate": "2024-11-28",
    "expiryDate": "2024-12-05",
    "quality": "Premium",
    "location": "Springfield",
    "farmer": {
      "_id": "64f5a2c1b3d4e5f6g7h8i9j1",
      "name": "John Farmer",
      "phone": "9876543210",
      "rating": 4.5
    }
  }
}
```

### 3. Create Crop (Farmer Only)
**POST** `/crops`

Headers:
```
Authorization: Bearer <token>
Content-Type: application/json
```

Request Body:
```json
{
  "name": "Organic Tomatoes",
  "category": "Vegetables",
  "description": "Fresh, pesticide-free tomatoes",
  "price": 50,
  "quantity": 100,
  "unit": "kg",
  "quality": "Premium",
  "location": "Springfield",
  "harvestDate": "2024-11-28",
  "expiryDate": "2024-12-05",
  "images": ["https://..."]
}
```

Response (201):
```json
{
  "success": true,
  "message": "Crop created successfully",
  "data": {
    "_id": "64f5a2c1b3d4e5f6g7h8i9j0",
    "farmerId": "64f5a2c1b3d4e5f6g7h8i9j1",
    "name": "Organic Tomatoes",
    "category": "Vegetables",
    "price": 50,
    "quantity": 100
  }
}
```

### 4. Update Crop
**PUT** `/crops/:cropId`

Headers:
```
Authorization: Bearer <token>
```

Request Body: (same fields as create)

Response (200):
```json
{
  "success": true,
  "message": "Crop updated successfully",
  "data": { /* updated crop */ }
}
```

### 5. Delete Crop
**DELETE** `/crops/:cropId`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "success": true,
  "message": "Crop deleted successfully"
}
```

## Order Management Endpoints

### 1. Create Order
**POST** `/orders`

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "items": [
    {
      "cropId": "64f5a2c1b3d4e5f6g7h8i9j0",
      "quantity": 10
    }
  ],
  "shippingAddress": "123 Buyer Street, Springfield, IL"
}
```

Response (201):
```json
{
  "success": true,
  "data": {
    "_id": "64f5a2c1b3d4e5f6g7h8i9j0",
    "buyerId": "64f5a2c1b3d4e5f6g7h8i9j2",
    "items": [
      {
        "cropId": "64f5a2c1b3d4e5f6g7h8i9j0",
        "quantity": 10,
        "price": 50,
        "subtotal": 500
      }
    ],
    "totalAmount": 500,
    "status": "pending",
    "paymentStatus": "unpaid"
  }
}
```

### 2. Get User Orders
**GET** `/orders/user/:userId`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f5a2c1b3d4e5f6g7h8i9j0",
      "status": "delivered",
      "totalAmount": 500,
      "createdAt": "2024-11-20"
    }
  ]
}
```

## Payment Endpoints

### 1. Create PayPal Payment
**POST** `/payments/create`

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "orderId": "64f5a2c1b3d4e5f6g7h8i9j0",
  "amount": 500,
  "currency": "USD",
  "returnUrl": "https://agrimarket.com/checkout/success",
  "cancelUrl": "https://agrimarket.com/checkout/cancel"
}
```

Response (200):
```json
{
  "success": true,
  "paymentUrl": "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=...",
  "transactionId": "EC-123456789"
}
```

### 2. Execute PayPal Payment
**POST** `/payments/execute`

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "transactionId": "EC-123456789",
  "payerId": "PAYER123"
}
```

Response (200):
```json
{
  "success": true,
  "message": "Payment completed successfully",
  "data": {
    "_id": "64f5a2c1b3d4e5f6g7h8i9j0",
    "orderId": "64f5a2c1b3d4e5f6g7h8i9j0",
    "amount": 500,
    "status": "completed",
    "transactionId": "PAY-123456789"
  }
}
```

## Weather API Endpoints

### 1. Get Current Weather
**GET** `/weather/:location`

Example: `/weather/Springfield`

Response (200):
```json
{
  "success": true,
  "data": {
    "location": "Springfield",
    "temperature": 25,
    "humidity": 65,
    "windSpeed": 10,
    "description": "Partly Cloudy",
    "rainProbability": 20,
    "feelsLike": 23,
    "pressure": 1013,
    "visibility": 10
  }
}
```

### 2. Get Weather Forecast
**GET** `/weather/forecast/:location`

Response (200):
```json
{
  "success": true,
  "data": {
    "location": "Springfield",
    "forecast": [
      {
        "date": "2024-11-30",
        "temp": 22,
        "description": "Rainy",
        "rainProbability": 80,
        "humidity": 75
      },
      {
        "date": "2024-12-01",
        "temp": 20,
        "description": "Cloudy",
        "rainProbability": 40,
        "humidity": 70
      }
    ]
  }
}
```

## Soil Information Endpoints

### 1. Get Soil Data
**GET** `/soil/:location`

Response (200):
```json
{
  "success": true,
  "data": {
    "location": "Springfield",
    "nitrogen": 45,
    "phosphorus": 20,
    "potassium": 180,
    "pH": 6.8,
    "organicMatter": 3.5,
    "classification": "Loamy",
    "recommendations": "Good for wheat and corn cultivation"
  }
}
```

### 2. Create Soil Report
**POST** `/soil/report`

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "location": "Springfield",
  "latitude": 39.7817,
  "longitude": -89.6501,
  "nitrogen": 45,
  "phosphorus": 20,
  "potassium": 180,
  "pH": 6.8,
  "organicMatter": 3.5
}
```

Response (201):
```json
{
  "success": true,
  "message": "Soil report created successfully",
  "data": { /* soil report */ }
}
```

## Admin Dashboard Endpoints

### 1. Get Dashboard Statistics
**GET** `/admin/dashboard`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalCrops": 450,
    "totalOrders": 320,
    "totalRevenue": 125000,
    "averageOrderValue": 390.63,
    "recentOrders": [],
    "topCrops": [],
    "userGrowth": []
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    "Email is required",
    "Password must be at least 8 characters"
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required or token expired"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "You don't have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details in development mode"
}
```
