# 🎯 Quick Start Commands

## After Cloning from GitHub

### 1. Install Git (if needed)
```
Download: https://git-scm.com/download/win
```

### 2. Clone Repository
```powershell
git clone https://github.com/YOUR-USERNAME/doctors-appointment-system.git
cd doctors-appointment-system
```

### 3. Install Dependencies (Windows)
```powershell
.\install.bat
```

### 4. Setup MongoDB
**Option A - Cloud (Recommended):**
- Sign up at: https://www.mongodb.com/cloud/atlas
- Create free cluster (M0)
- Get connection string
- Update `server/.env` with your MongoDB URI

**Option B - Local:**
- Download: https://www.mongodb.com/try/download/community
- Install MongoDB Community Server
- Connection string already in `server/.env`

### 5. Seed Database
```powershell
cd server
npm run seed
```

### 6. Start Application

**Terminal 1 - Backend:**
```powershell
cd server
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd client
npm start
```

### 7. Open in Browser
```
http://localhost:3000
```

---

## 📝 Demo Login Credentials

See **INDIAN_CREDENTIALS.md** for all 30 doctors

**Quick Test:**
- Patient: `rajesh@example.com` / `patient123`
- Doctor: `ananya.mukherjee@example.com` / `doctor123`
- Admin: `admin@example.com` / `admin123`

---

## 🔄 Git Commands for Contributors

### First Time Setup
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Making Changes
```powershell
# Check status
git status

# Add files
git add .

# Commit
git commit -m "Your message"

# Push
git push
```

### Keeping Updated
```powershell
# Pull latest changes
git pull origin main
```

---

## 📦 Project Structure

```
doctors-appointment-system/
├── server/                 # Backend (Node.js + Express)
│   ├── config/            # Database & JWT config
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth & error handling
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── utils/             # PDF generator & seeder
│   └── server.js          # Entry point
├── client/                # Frontend (React)
│   ├── public/           
│   └── src/
│       ├── components/    # Reusable components
│       ├── context/       # Auth context
│       ├── pages/         # Patient/Doctor/Admin pages
│       └── utils/         # API client
├── README.md              # Main documentation
├── INDIAN_CREDENTIALS.md  # All login credentials
├── GITHUB_UPLOAD_GUIDE.md # GitHub upload instructions
└── install.bat            # Windows installer
```

---

## 🚀 Tech Stack

**Frontend:**
- React 18.2.0
- React Router 6.20.0
- TailwindCSS 3.3.6
- Axios 1.6.2
- React Icons
- React DatePicker

**Backend:**
- Node.js 16+
- Express.js 4.18.2
- MongoDB + Mongoose 8.0.0
- JWT Authentication
- bcrypt for password hashing
- PDFKit + QRCode for confirmations

---

## 🌐 API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Doctors
- GET `/api/doctors` - Get all doctors
- GET `/api/doctors/:id` - Get doctor by ID
- GET `/api/doctors/:id/available-slots` - Get available slots

### Appointments
- POST `/api/appointments` - Book appointment
- GET `/api/appointments/my-appointments` - Get user's appointments
- PUT `/api/appointments/:id/cancel` - Cancel appointment
- GET `/api/appointments/:id/confirmation` - Download PDF

### Admin
- GET `/api/admin/stats` - System statistics
- GET `/api/admin/pending-doctors` - Pending doctor approvals
- PUT `/api/admin/doctors/:id/approve` - Approve doctor

---

## ⚙️ Environment Variables

Create `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🐛 Common Issues

**MongoDB Connection Failed:**
- Check your connection string in `.env`
- Verify MongoDB service is running
- For Atlas: Check IP whitelist (0.0.0.0/0 for development)

**Port Already in Use:**
```powershell
# Kill process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

**Dependencies Install Failed:**
- Delete `node_modules` folders
- Delete `package-lock.json` files
- Run `npm install` again

---

## 📄 License

MIT License - Feel free to use this project for learning and personal projects!

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 💬 Support

For issues and questions:
- Open an issue on GitHub
- Check README.md for detailed documentation
- See INDIAN_CREDENTIALS.md for demo logins

---

**Made with ❤️ for learning and healthcare management**
