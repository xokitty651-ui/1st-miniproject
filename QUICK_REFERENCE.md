# AgriMarket - Quick Reference Guide

## 🚀 Quick Start (5 Minutes)

### 1. Backend Setup
```bash
cd backend
npm install
# Create .env file with your API keys (use .env.example as template)
npm run dev
# Backend runs on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend
# Using VS Code Live Server: Right-click index.html → Open with Live Server
# OR: python -m http.server 5500
# Frontend runs on http://localhost:5500
```

### 3. Test
- Visit http://localhost:5500
- Click "Explore Marketplace"
- Test login and registration

---

## 📁 File Structure Quick Reference

```
miniproject/
├── frontend/
│   ├── pages/index.html         ← Home page (START HERE)
│   ├── pages/login.html         ← Login
│   ├── pages/register.html      ← Registration
│   ├── css/main.css             ← All styling
│   ├── js/main.js               ← Main logic
│   └── js/auth.js               ← Authentication
├── backend/
│   ├── server.js                ← Main server file
│   ├── models/User.js           ← User schema
│   ├── models/Crop.js           ← Crop schema
│   ├── models/Order.js          ← Order schema
│   ├── package.json             ← Dependencies
│   └── .env                     ← Your secrets
└── docs/
    ├── ARCHITECTURE.md          ← System design
    ├── API_REFERENCE.md         ← API endpoints
    ├── DATABASE_SCHEMA.md       ← DB design
    └── UI_WIREFRAMES.md         ← UI mockups
```

---

## 🔑 Required API Keys (Get These First!)

| Service | URL | Why |
|---------|-----|-----|
| OpenWeatherMap | https://openweathermap.org/api | Weather data |
| PayPal | https://developer.paypal.com | Payments |
| MongoDB | https://mongodb.com/cloud/atlas | Database |

---

## 💻 Commands Cheat Sheet

### Backend
```bash
npm install              # Install packages
npm run dev             # Start with auto-reload
npm test                # Run tests
npm start               # Start production
```

### Frontend
```bash
# No build needed! Just open in browser
# OR use Live Server or http-server
```

### MongoDB
```bash
mongod                  # Start MongoDB
mongo                   # Connect to MongoDB
```

---

## 🌐 URLs Reference

| Purpose | URL |
|---------|-----|
| Frontend | http://localhost:5500 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/api/health |
| Home Page | http://localhost:5500/pages/index.html |
| Login | http://localhost:5500/pages/login.html |
| Register | http://localhost:5500/pages/register.html |
| MongoDB (local) | mongodb://localhost:27017 |

---

## 🔐 Demo Credentials

```
Email: demo@agrimarket.com
Password: Demo@123
```

---

## 📝 Key Features Implemented

✅ Home page with hero section  
✅ User authentication pages (login/register)  
✅ Responsive design with Tailwind CSS  
✅ Product card component  
✅ Search functionality  
✅ Cart management (localStorage)  
✅ API integration skeleton  
✅ Authentication module (JWT)  
✅ MongoDB models (User, Crop, Order)  
✅ Express server setup  

---

## 🎯 Next Steps

### Immediate (Phase 1)
1. [ ] Get all API keys
2. [ ] Set up MongoDB
3. [ ] Test backend & frontend connection
4. [ ] Create remaining pages

### Short Term (Phase 2)
5. [ ] Build all API endpoints
6. [ ] Implement PayPal integration
7. [ ] Connect Weather API
8. [ ] Test all functionality

### Medium Term (Phase 3)
9. [ ] Deploy frontend to Netlify
10. [ ] Deploy backend to Render
11. [ ] Setup production database
12. [ ] Optimize and secure

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

### MongoDB connection error
- Check MongoDB is running: `mongod`
- Check MONGODB_URI in .env
- For MongoDB Atlas: whitelist your IP

### CORS error
- Ensure backend is running
- Check FRONTEND_URL in backend .env
- Clear browser cache

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentation Map

| Document | Purpose |
|----------|---------|
| README.md | Project overview |
| SETUP_GUIDE.md | Detailed setup instructions |
| docs/ARCHITECTURE.md | System architecture |
| docs/API_REFERENCE.md | All API endpoints |
| docs/DATABASE_SCHEMA.md | Database design |
| docs/UI_WIREFRAMES.md | UI mockups |
| backend/SETUP.md | Backend configuration |

---

## 🔗 Important Links

- **MongoDB**: https://www.mongodb.com/cloud/atlas
- **PayPal Sandbox**: https://sandbox.paypal.com
- **OpenWeatherMap**: https://openweathermap.org/api
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Express.js**: https://expressjs.com/
- **Postman**: https://www.postman.com/

---

## 📞 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Port in use | Kill process using `lsof` or `netstat` |
| DB not connecting | Check MONGODB_URI and whitelist IP |
| CORS error | Verify FRONTEND_URL in .env |
| API key invalid | Check API key format and limits |
| Module not found | Run `npm install` again |

---

## ✅ Verification Checklist

- [ ] Backend running: `http://localhost:5000/api/health` returns success
- [ ] Frontend loading: `http://localhost:5500` displays home page
- [ ] MongoDB connected: No connection errors in terminal
- [ ] Environment variables: All .env values populated
- [ ] Dependencies installed: No missing packages
- [ ] Can login/register page loads
- [ ] Network tab shows API calls (when implemented)

---

## 🎓 Learning Resources

- **Node.js**: https://nodejs.org/docs/
- **Express**: https://expressjs.com/
- **MongoDB**: https://docs.mongodb.com/
- **JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/
- **REST API**: https://restfulapi.net/
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## 💡 Pro Tips

1. Use Postman to test APIs before connecting frontend
2. Keep .env file updated with all keys
3. Check browser console for frontend errors
4. Check terminal for backend errors
5. Restart backend after changing .env
6. Use MongoDB Compass to visualize data
7. Test in incognito mode to clear cache

---

## 🚀 Deployment Quick Links

- **Frontend**: Netlify (Connect GitHub)
- **Backend**: Render (Connect GitHub)
- **Database**: MongoDB Atlas (Free tier available)
- **CDN**: Cloudflare (Free tier)

---

## 📊 Project Statistics

- **Frontend Files**: HTML, CSS, JS
- **Backend Files**: Node.js, Express, MongoDB
- **Third-Party APIs**: 3+ integrations
- **Database Collections**: 8+
- **API Endpoints**: 30+
- **UI Components**: 20+

---

## ⚡ Performance Tips

1. Use lazy loading for images
2. Minimize CSS/JS files
3. Use CDN for libraries
4. Cache API responses
5. Enable compression
6. Optimize database queries
7. Use production mode in NODE_ENV

---

**Last Updated**: November 2024  
**Version**: 1.0.0  
**Status**: Ready for Development
