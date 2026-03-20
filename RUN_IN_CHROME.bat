@echo off
REM AgriMarket - Startup Script for Windows
REM Starts both backend and frontend servers, then opens Chrome

setlocal enabledelayedexpansion

REM Define paths
set BACKEND_PATH=C:\Users\Sruu\OneDrive\Desktop\miniproject\backend
set FRONTEND_PATH=C:\Users\Sruu\OneDrive\Desktop\miniproject\frontend
set CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe
set WEBSITE_URL=http://localhost:8080/pages/index.html

REM Check if Chrome is installed
if not exist "%CHROME_PATH%" (
    echo ❌ Google Chrome not found at: %CHROME_PATH%
    echo Please install Chrome or update the path in this script
    pause
    exit /b 1
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║           AgriMarket - Startup Script                    ║
echo ║     Starting Backend, Frontend, and Chrome Browser       ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Start Backend Server
echo 🌾 Starting Backend Server on port 5000...
start "AgriMarket Backend" cmd /k "cd /d "%BACKEND_PATH%" && node server.js"
timeout /t 3 /nobreak

REM Start Frontend Server
echo 📄 Starting Frontend Server on port 8080...
start "AgriMarket Frontend" cmd /k "cd /d "%FRONTEND_PATH%" && node server.js"
timeout /t 3 /nobreak

REM Wait for servers to be ready
echo ⏳ Waiting for servers to start...
timeout /t 4 /nobreak

REM Open Chrome
echo 🚀 Opening Google Chrome...
start "" "%CHROME_PATH%" "%WEBSITE_URL%"

echo.
echo ✅ AgriMarket is now running!
echo.
echo 📍 Website: %WEBSITE_URL%
echo 🔧 Backend API: http://localhost:5000/api
echo 📊 Health Check: http://localhost:5000/api/health
echo.
echo Press any key to close this window...
pause > nul

exit /b 0
