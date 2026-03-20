# AgriMarket - Setup & Installation Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v14+ and npm
- **MongoDB** (local or MongoDB Atlas account)
- **Git** (optional)
- **Code Editor** (VS Code recommended)
- **Postman** (for API testing)

## 🎯 Step-by-Step Setup

### Step 1: Clone/Download Project

```bash
# If using git
git clone https://github.com/yourusername/agrimarket.git
cd agrimarket

# Or download and extract ZIP file
```

### Step 2: Frontend Setup

The frontend is a vanilla HTML/CSS/JavaScript project with no build process needed.

```bash
# Navigate to frontend
cd frontend

# Option A: Using Live Server (VS Code Extension)
# Install Live Server extension in VS Code
# Right-click on index.html → Open with Live Server
# Opens at http://localhost:5500

# Option B: Using Python
python -m http.server 5500

# Option C: Using Node.js http-server
npm install -g http-server
http-server -p 5500
```

**Frontend Structure:**
```
frontend/
├── pages/
│   ├── index.html         # Home page (main entry)
│   ├── login.html         # Login page
│   ├── register.html      # Registration page
│   └── [other pages]
├── css/
│   └── main.css          # Main stylesheet (Tailwind + Custom)
├── js/
│   ├── main.js           # Main application logic
│   ├── auth.js           # Authentication functions
│   └── [other JS files]
└── assets/               # Images, icons (add here)
```

### Step 3: Backend Setup

```bash
# Navigate to backend
cd ../backend

# 1. Install dependencies
npm install

# 2. Create .env file
# Copy the content below and save as .env

# 3. Configure environment variables (see section below)

# 4. Start development server
npm run dev
# Server will start on http://localhost:5000

# 5. Test health check
# Visit http://localhost:5000/api/health
```

### Step 4: Environment Variables Setup

Create a `.env` file in the `backend` directory:

```bash
# ==========================================
# Server Configuration
# ==========================================
PORT=5000
NODE_ENV=development

# ==========================================
# Database Configuration
# ==========================================
# For MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/agrimarket?retryWrites=true&w=majority

# For Local MongoDB
# MONGODB_URI=mongodb://localhost:27017/agrimarket

DB_NAME=agrimarket

# ==========================================
# JWT Configuration
# ==========================================
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long_here
JWT_EXPIRE=7d

# ==========================================
# Weather API Configuration
# ==========================================
# Get from: https://openweathermap.org/api
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here

# Get from: https://www.weatherapi.com
WEATHERAPI_KEY=your_weatherapi_key_here

# ==========================================
# Soil API Configuration
# ==========================================
# Get from: https://www.agromonitoring.com/api
AGROMONITORING_API_KEY=your_agromonitoring_key_here

# ==========================================
# PayPal Configuration
# ==========================================
# Get from: https://developer.paypal.com
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
PAYPAL_MODE=sandbox  # Use 'sandbox' for testing, 'live' for production

# ==========================================
# Stripe Configuration (Optional)
# ==========================================
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLIC_KEY=your_stripe_public_key_here

# ==========================================
# Email Configuration
# ==========================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password  # Use App Password for Gmail
SMTP_FROM=noreply@agrimarket.com

# ==========================================
# Frontend Configuration
# ==========================================
FRONTEND_URL=http://localhost:5500

# ==========================================
# File Upload Configuration
# ==========================================
MAX_FILE_SIZE=5242880  # 5MB in bytes
ALLOWED_EXTENSIONS=jpg,jpeg,png,gif

# ==========================================
# Logging
# ==========================================
LOG_LEVEL=debug
```

### Step 5: MongoDB Setup

#### Option A: MongoDB Atlas (Cloud) - Recommended

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier)
4. Get connection string
5. Add to MONGODB_URI in .env

#### Option B: Local MongoDB

**Windows:**
```bash
# Download installer from https://www.mongodb.com/try/download/community
# Run installer and follow prompts
# MongoDB should auto-start

# Verify installation
mongo --version
```

**Mac:**
```bash
# Install with Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Stop MongoDB
brew services stop mongodb-community
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Start MongoDB
sudo service mongod start
```

### Step 6: Get API Keys

#### 1. OpenWeatherMap API
1. Visit https://openweathermap.org/api
2. Sign up for free account
3. Get API key from dashboard
4. Add to .env

#### 2. PayPal API
1. Go to https://developer.paypal.com
2. Create developer account
3. Create Sandbox app
4. Get Client ID and Secret
5. Add to .env

#### 3. Weather API (Alternative)
1. Visit https://www.weatherapi.com
2. Sign up for free
3. Copy API key
4. Add to .env

#### 4. Agromonitoring API (Soil Data)
1. Go to https://www.agromonitoring.com
2. Create account
3. Get API key
4. Add to .env

### Step 7: Database Initialization

```bash
# If MongoDB is running locally
mongo

# In MongoDB shell, create database
use agrimarket

# Create collections (optional - Mongoose auto-creates)
db.createCollection("users")
db.createCollection("crops")
db.createCollection("orders")
db.createCollection("payments")

# Exit
exit
```

### Step 8: Test Everything

```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
cd frontend
# Use Live Server or http-server

# Terminal 3: Open Postman
# Test API endpoints using postman-collection.json

# Browser
# Visit http://localhost:5500 (or your frontend port)
```

## ✅ Verification Checklist

- [ ] Node.js and npm installed (`node -v`, `npm -v`)
- [ ] MongoDB running (check MongoDB Atlas or local MongoDB)
- [ ] .env file created in backend with all keys
- [ ] Backend dependencies installed (`npm install` in backend/)
- [ ] Backend server running on port 5000 (`npm run dev`)
- [ ] Frontend running on port 5500 (or your port)
- [ ] Health check passes: `http://localhost:5000/api/health`
- [ ] Can access home page: `http://localhost:5500`
- [ ] Can access login page: `http://localhost:5500/pages/login.html`

## 🔧 Common Issues & Solutions

### Issue: MongoDB Connection Failed
```
Solution:
1. Check MONGODB_URI in .env
2. Verify MongoDB is running
3. For MongoDB Atlas: whitelist your IP
4. Check username/password
```

### Issue: Port Already in Use
```bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS Error
```
Solution:
1. Ensure FRONTEND_URL is correct in .env
2. Check CORS configuration in backend
3. Clear browser cache
4. Check if backend is running
```

## 📱 Testing Accounts (Demo)

Use these credentials to test the application:

**Farmer Account:**
- Email: farmer@agrimarket.com
- Password: Demo@123

**Buyer Account:**
- Email: buyer@agrimarket.com
- Password: Demo@123

**Admin Account:**
- Email: admin@agrimarket.com
- Password: Demo@123

## 🧪 API Testing with Postman

1. **Import Collection**
   - Open Postman
   - Click Import
   - Select `docs/postman-collection.json`

2. **Set Environment Variables**
   - Create new environment in Postman
   - Add variables: `{{API_URL}}`, `{{TOKEN}}`, etc.

3. **Test Endpoints**
   - Start with Health Check
   - Test Authentication endpoints
   - Test Crop endpoints
   - Test Order endpoints

## 🚀 Development Commands

```bash
# Backend
npm run dev              # Start with nodemon
npm test                 # Run tests
npm run test:coverage    # Run tests with coverage

# Frontend
# No build process - just open HTML files

# Database
mongod                   # Start MongoDB (local)
mongo                    # Connect to MongoDB
```

## 📊 Project Files Overview

### Important Files
- `README.md` - Project overview
- `backend/server.js` - Main backend file
- `backend/.env` - Environment configuration
- `frontend/pages/index.html` - Home page
- `docs/API_REFERENCE.md` - API documentation
- `docs/DATABASE_SCHEMA.md` - Database design

### Frontend Files
- `pages/index.html` - Home/landing page
- `pages/login.html` - Login page
- `pages/register.html` - Registration page
- `css/main.css` - Tailwind + custom CSS
- `js/main.js` - Main application logic
- `js/auth.js` - Authentication logic

### Backend Files
- `models/User.js` - User schema
- `models/Crop.js` - Crop schema
- `models/Order.js` - Order schema
- `routes/auth.js` - Auth routes (to be created)
- `controllers/authController.js` - Auth logic (to be created)

## 🎓 Next Steps

1. **Implement Backend Routes** - Create remaining API endpoints
2. **Add Form Validation** - Validate all form inputs
3. **Implement Payment Integration** - Connect PayPal
4. **Add Weather Integration** - Connect weather API
5. **Deploy** - Deploy frontend and backend
6. **Testing** - Write and run tests
7. **Monitoring** - Setup error tracking

## 📞 Support & Resources

- **MongoDB Documentation**: https://docs.mongodb.com
- **Express.js Documentation**: https://expressjs.com
- **Tailwind CSS**: https://tailwindcss.com
- **PayPal Developer**: https://developer.paypal.com
- **OpenWeatherMap API**: https://openweathermap.org/api

## ✨ Tips

1. Always keep sensitive data in .env
2. Never commit .env file to Git
3. Use environment-specific configurations
4. Test APIs with Postman before frontend integration
5. Keep backend and frontend running in separate terminals
6. Check browser console for frontend errors
7. Check backend logs for server errors

---

**Happy coding! 🎉**
