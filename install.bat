@echo off
echo ========================================
echo Doctor's Appointment Booking System
echo Installation Script for Windows
echo ========================================
echo.

echo [1/4] Installing Backend Dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    exit /b %errorlevel%
)
cd ..

echo.
echo [2/4] Installing Frontend Dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    exit /b %errorlevel%
)
cd ..

echo.
echo [3/4] Setting up Environment Variables...
if not exist "server\.env" (
    copy "server\.env.example" "server\.env"
    echo Created server/.env file - Please update MongoDB URI and JWT Secret
) else (
    echo server/.env already exists
)

echo.
echo [4/4] Installation Complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Update server/.env with your MongoDB connection string
echo 2. Run seed script: cd server && npm run seed
echo 3. Start backend: cd server && npm start
echo 4. Start frontend: cd client && npm start
echo.
echo For detailed instructions, see README.md
echo ========================================
pause
