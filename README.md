# AgriMarket - Agricultural Marketplace Platform

## 🌾 Project Overview

AgriMarket is a comprehensive agricultural marketplace platform that connects farmers directly with buyers, eliminating middlemen and providing better prices. The platform integrates real-time weather data, soil analysis, and secure payment processing to create a complete agricultural ecosystem.

## ✨ Key Features

### For Farmers
- ✅ Direct product listings
- ✅ Real-time inventory management
- ✅ Weather alerts for crop protection
- ✅ Soil analysis and recommendations
- ✅ Order tracking and management
- ✅ Payment processing
- ✅ Customer ratings and reviews
- ✅ Sales analytics dashboard

### For Buyers
- ✅ Browse and search crops
- ✅ Direct farmer contact
- ✅ Secure payment with PayPal
- ✅ Order tracking
- ✅ Rating system
- ✅ Wishlist functionality
- ✅ Order history
- ✅ Weather-based crop recommendations

### Admin Features
- ✅ User management
- ✅ Sales analytics
- ✅ Order monitoring
- ✅ Weather alerts management
- ✅ System statistics
- ✅ Payment tracking

## 🏗️ Project Structure

```
miniproject/
├── frontend/
│   ├── pages/
│   │   ├── index.html          # Home page
│   │   ├── login.html          # Login page
│   │   ├── register.html       # Registration page
│   │   ├── marketplace.html    # Product listing
│   │   ├── product-detail.html # Single product view
│   │   ├── checkout.html       # Checkout process
│   │   └── dashboard.html      # User dashboard
│   ├── css/
│   │   └── main.css            # Main stylesheet
│   ├── js/
│   │   ├── main.js             # Main JavaScript
│   │   ├── auth.js             # Authentication logic
│   │   ├── api.js              # API calls
│   │   └── utils.js            # Utility functions
│   └── assets/                 # Images, icons, etc
├── backend/
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API routes
│   ├── controllers/            # Route handlers
│   ├── middleware/             # Custom middleware
│   ├── config/                 # Configuration files
│   ├── server.js               # Main server file
│   ├── package.json            # Dependencies
│   └── .env                    # Environment variables
└── docs/
    ├── ARCHITECTURE.md         # System architecture
    ├── API_REFERENCE.md        # API documentation
    ├── DATABASE_SCHEMA.md      # Database design
    └── UI_WIREFRAMES.md        # UI mockups
```

## 🚀 Quick Start

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Open in browser (using Live Server or similar)
# Visit http://localhost:5500 (or your local server port)
```

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with required variables
# See backend/SETUP.md for environment variables

# Start development server
npm run dev

# Server will run on http://localhost:5000
```

## 🔧 Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Styling with Tailwind CSS
- **JavaScript (ES6+)** - Vanilla JS (no frameworks)
- **Libraries**:
  - Tailwind CSS - Utility-first CSS framework
  - Animate.css - Pre-built animations
  - AOS - Scroll animations
  - Boxicons - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Axios** - HTTP client

### Third-Party APIs
- **OpenWeatherMap** - Weather data
- **PayPal** - Payment processing
- **Soil Data APIs** - Agricultural information

## 📋 API Endpoints

### Authentication
```
POST   /api/auth/register         - Register new user
POST   /api/auth/login            - User login
POST   /api/auth/logout           - User logout
GET    /api/auth/profile          - Get user profile
```

### Crops
```
GET    /api/crops                 - Get all crops
GET    /api/crops/:id             - Get single crop
POST   /api/crops                 - Create crop (farmer only)
PUT    /api/crops/:id             - Update crop
DELETE /api/crops/:id             - Delete crop
GET    /api/crops/search          - Search crops
```

### Orders
```
POST   /api/orders                - Create order
GET    /api/orders/:id            - Get order details
PUT    /api/orders/:id            - Update order status
GET    /api/orders/user/:userId   - Get user orders
```

### Weather
```
GET    /api/weather/:location     - Get weather for location
GET    /api/weather/forecast/:location - Get forecast
POST   /api/weather/alerts/:farmerId - Set weather alerts
```

### Payments
```
POST   /api/payments/create       - Create payment
POST   /api/payments/execute      - Execute payment
GET    /api/payments/:id          - Get payment status
```

See `docs/API_REFERENCE.md` for complete API documentation.

## 🗄️ Database Schema

### Collections
1. **Users** - Farmers, buyers, and admins
2. **Crops** - Agricultural products
3. **Orders** - Purchase orders
4. **Payments** - Payment records
5. **Weather Logs** - Weather data
6. **Soil Reports** - Soil analysis
7. **Reviews** - User ratings and reviews
8. **Admin Logs** - System activity logs

See `docs/DATABASE_SCHEMA.md` for detailed schema design.

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- HTTPS/SSL encryption
- CORS configuration
- Input validation and sanitization
- Rate limiting
- SQL/NoSQL injection prevention
- XSS protection with Helmet

## 📊 Development Workflow

### 1. Frontend Development
- Create HTML pages
- Style with CSS
- Add JavaScript interactivity
- Integrate with backend APIs

### 2. Backend Development
- Design database schema
- Create API endpoints
- Implement authentication
- Add business logic

### 3. Integration
- Connect frontend to backend
- Test API endpoints with Postman
- Debug issues
- Optimize performance

### 4. Third-Party Integration
- Integrate weather API
- Setup PayPal payments
- Add soil data API
- Configure email notifications

### 5. Testing & Deployment
- Unit testing
- Integration testing
- Performance testing
- Deploy frontend to Netlify/Vercel
- Deploy backend to Render/Railway

## 🧪 Testing

### API Testing with Postman
1. Import collection from `docs/postman-collection.json`
2. Set environment variables
3. Test all endpoints

### Manual Testing
1. Create user account
2. List crops
3. Add to cart
4. Checkout with PayPal sandbox
5. Verify order creation

## 🌐 Deployment

### Frontend
- **Netlify** - Recommended
  ```bash
  npm install -g netlify-cli
  netlify deploy --prod
  ```
- **Vercel**
  ```bash
  vercel --prod
  ```

### Backend
- **Render** - https://render.com
- **Railway** - https://railway.app
- **Heroku** - https://heroku.com
- **AWS** - https://aws.amazon.com

## 📚 Documentation

- **Architecture**: `docs/ARCHITECTURE.md`
- **API Reference**: `docs/API_REFERENCE.md`
- **Database Design**: `docs/DATABASE_SCHEMA.md`
- **UI Wireframes**: `docs/UI_WIREFRAMES.md`
- **Backend Setup**: `backend/SETUP.md`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 👥 Support

For support, email support@agrimarket.com or open an issue on GitHub.

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] AI-powered crop recommendations
- [ ] Live chat support
- [ ] Video tutorials
- [ ] Blockchain integration
- [ ] Subscription plans
- [ ] Loyalty rewards program
- [ ] Multi-language support

## 🔄 Version History

- **v1.0.0** (Current) - Initial release with core features

## 📞 Contact

- Website: https://agrimarket.com
- Email: info@agrimarket.com
- Phone: +1-800-AGRIMARKET

---

**Made with ❤️ for sustainable agriculture**
