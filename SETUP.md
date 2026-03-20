# Backend Server Setup

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```bash
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agrimarket
DB_NAME=agrimarket

# JWT
JWT_SECRET=your_jwt_secret_key_here_minimum_32_characters
JWT_EXPIRE=7d

# Weather API
OPENWEATHERMAP_API_KEY=your_openweathermap_key
WEATHERAPI_KEY=your_weatherapi_key

# Soil API
OPENLANDMAP_API_KEY=your_openlandmap_key
AGROMONITORING_API_KEY=your_agromonitoring_key

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox  # Change to 'live' for production

# Stripe (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@agrimarket.com

# Frontend
FRONTEND_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=5242880  # 5MB in bytes
ALLOWED_EXTENSIONS=jpg,jpeg,png,gif

# Logging
LOG_LEVEL=debug
```

## Installation

1. **Navigate to backend directory:**

```bash
cd backend
```

1. **Install dependencies:**

```bash
npm install
```

1. **Create .env file:**

Create a `.env` file with the variables above.

1. **Start development server:**

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Testing with Postman

1. Import the Postman collection from `docs/postman-collection.json`
2. Set environment variables in Postman
3. Test all endpoints

## Folder Structure

```text
backend/
├── config/              # Configuration files
├── controllers/         # Route controllers
├── middleware/          # Custom middleware
├── models/             # MongoDB schemas
├── routes/             # API routes
├── utils/              # Utility functions
├── server.js           # Main server file
├── package.json        # Dependencies
└── .env               # Environment variables
```

## Database Setup

### MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Add to `MONGODB_URI` in `.env`

### Local MongoDB

```bash
# Install MongoDB
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community

# Start MongoDB
mongod
```

## Running Tests

```bash
# Run tests
npm test

# With coverage report
npm run test:coverage
```

## Deployment

### Deploy to Render

1. Go to [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables
5. Deploy

### Deploy to Railway

1. Go to [Railway](https://railway.app)
2. Create new project
3. Deploy from GitHub
4. Set environment variables

### Deploy to Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create agrimarket-api

# Set environment variables
heroku config:set PORT=5000
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

## API Documentation

See `docs/API_REFERENCE.md` for complete API documentation.

## Security Checklist

- [ ] All sensitive data in .env file
- [ ] CORS configured properly
- [ ] Helmet headers enabled
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL/NoSQL injection prevention
- [ ] HTTPS enabled in production
- [ ] JWT tokens properly implemented
- [ ] Password hashing with bcrypt
- [ ] Error messages don't leak sensitive info

## Troubleshooting

### Port Already in Use

```bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error

- Check MONGODB_URI in .env
- Ensure IP whitelist in MongoDB Atlas
- Verify username and password

### JWT Errors

- Ensure JWT_SECRET is set
- Check token format in Authorization header
- Verify token hasn't expired
