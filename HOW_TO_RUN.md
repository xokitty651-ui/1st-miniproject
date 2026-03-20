# 🚀 AgriMarket - How to Run the Project

## Quick Start (Copy & Paste)

### Step 1: Open PowerShell Terminal 1

```powershell
cd "C:\Users\Sruu\OneDrive\Desktop\miniproject\backend"
node server.js
```

You should see:

╔═══════════════════════════════════╗
║      AgriMarket Backend Server    ║
╚═══════════════════════════════════╝

🚀 Server running on port 5000
🔧 Environment: development
📚 API Documentation: <http://localhost:5000/api>
⚡ Health Check: <http://localhost:5000/api/health>

**✅Leave this terminal running**

---

### Step 2: Open PowerShell Terminal 2 (NEW WINDOW)

```powershell
cd "C:\Users\Sruu\OneDrive\Desktop\miniproject\frontend"
node server.js
```

You should see:

🚀 Frontend server running on <http://localhost:8080>
📄 Open: <http://localhost:8080/pages/index.html>

**✅ Leave this terminal running**

---

### Step 3: Open Browser

Open your web browser and go to:

```
http://localhost:8080/pages/index.html
```

**🎉 Done! Website is now live!**

---

## Project Structure

```
C:\Users\Sruu\OneDrive\Desktop\miniproject\
│
├── backend/                    ← API Server (PORT 5000)
│   ├── server.js              ← Run this: node server.js
│   ├── package.json
│   ├── .env                   ← Configuration
│   ├── controllers/           ← Business logic
│   ├── routes/                ← API endpoints
│   ├── models/                ← Database schemas
│   └── node_modules/          ← Dependencies
│
├── frontend/                   ← Website (PORT 8080)
│   ├── server.js              ← Run this: node server.js
│   ├── pages/
│   │   ├── index.html         ← Home page
│   │   ├── marketplace.html   ← Shop page
│   │   ├── checkout.html      ← Cart & payment
│   │   ├── dashboard.html     ← User profile
│   │   ├── login.html         ← Login page
│   │   ├── register.html      ← Sign up page
│   │   └── ...
│   ├── js/                    ← JavaScript logic
│   ├── css/                   ← Styling
│   ├── assets/                ← Images
│   └── svg/                   ← SVG illustrations
│
└── documentation/             ← Guides & setup
    ├── COMPLETE_GUIDE.md
    ├── API_REFERENCE.md
    └── ...
```

---

## What Each Server Does

| Server | Port | Purpose | Command |
|--------|------|---------|---------|
| **Backend** | 5000 | API endpoints, database, payments | `cd backend && node server.js` |
| **Frontend** | 8080 | Website HTML/CSS/JavaScript | `cd frontend && node server.js` |

---

## Access Points

After both servers are running:

- **Website:** <http://localhost:8080/pages/index.html>
- **Home Page:** <http://localhost:8080/pages/index.html>
- **Marketplace:** <http://localhost:8080/pages/marketplace.html>
- **Checkout:** <http://localhost:8080/pages/checkout.html>
- **Dashboard:** <http://localhost:8080/pages/dashboard.html>
- **API Health:** <http://localhost:5000/api/health>
- **API Root:** <http://localhost:5000/api>

---

## Troubleshooting

### "Cannot find module"

```
Solution: npm install in backend folder
cd C:\Users\Sruu\OneDrive\Desktop\miniproject\backend
npm install
```

### Port already in use

```
Solution: Kill existing process
# For port 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# For port 8080 (frontend)
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Website shows 404

```
Solution: Make sure both servers are running
- Terminal 1: Backend on port 5000
- Terminal 2: Frontend on port 8080
```

---

## Summary

**From where to run:**

1. **Backend** - Run from `C:\Users\Sruu\OneDrive\Desktop\miniproject\backend`
   - Command: `node server.js`
   - Serves API on port 5000

2. **Frontend** - Run from `C:\Users\Sruu\OneDrive\Desktop\miniproject\frontend`
   - Command: `node server.js`
   - Serves website on port 8080

3. **Access** - Open browser to `http://localhost:8080/pages/index.html`

---

## Features Available

✅ User Registration & Login
✅ Browse Marketplace
✅ Add Items to Cart
✅ Checkout Process
✅ User Dashboard
✅ Product Filtering & Search
✅ Weather Integration
✅ PayPal Payment (Sandbox Mode)
✅ Responsive Design
✅ Farming Theme with Animations

---

**Everything is ready to go! Just open 2 terminals and run the commands above.** 🌾
