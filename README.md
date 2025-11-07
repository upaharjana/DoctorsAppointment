# 🏥 Doctor's Appointment Booking System

A complete full-stack web application for booking doctor appointments with role-based access for Patients, Doctors, and Admins. Built with React, Node.js, Express, and MongoDB.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.2.0-blue)

## 🌟 Features

### 👨‍⚕️ For Patients
- ✅ User registration and authentication
- ✅ Browse doctors by specialization
- ✅ View doctor profiles with ratings and reviews
- ✅ Check real-time doctor availability
- ✅ Book appointments with date/time selection
- ✅ View appointment history and status
- ✅ Cancel or reschedule appointments
- ✅ **Download appointment confirmation slip (PDF)** with QR code
- ✅ Responsive dashboard

### 👩‍⚕️ For Doctors
- ✅ Doctor registration (requires admin approval)
- ✅ Set available time slots and schedule
- ✅ View and manage patient appointments
- ✅ Approve or reject appointment requests
- ✅ View patient details and appointment history
- ✅ Dashboard with appointment statistics
- ✅ Update profile and consultation fees

### 🛠️ For Admins
- ✅ Admin dashboard with system statistics
- ✅ Approve new doctor registrations
- ✅ Manage users (patients and doctors)
- ✅ View all appointments
- ✅ System-wide analytics (revenue, appointments count)
- ✅ Activate/deactivate user accounts

## 💻 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **React DatePicker** - Date selection
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **PDFKit** - PDF generation
- **QRCode** - QR code generation

## 📁 Project Structure

```
DoctorsAppointment/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── PrivateRoute.js
│   │   │   └── LoadingSpinner.js
│   │   ├── context/          # React context
│   │   │   └── AuthContext.js
│   │   ├── pages/            # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── patient/
│   │   │   │   ├── PatientDashboard.js
│   │   │   │   ├── DoctorList.js
│   │   │   │   ├── BookAppointment.js
│   │   │   │   └── PatientAppointments.js
│   │   │   ├── doctor/
│   │   │   │   ├── DoctorDashboard.js
│   │   │   │   └── DoctorAppointments.js
│   │   │   └── admin/
│   │   │       └── AdminDashboard.js
│   │   ├── utils/
│   │   │   └── api.js        # Axios configuration
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                    # Node.js backend
│   ├── config/               # Configuration files
│   │   ├── db.js
│   │   └── jwt.js
│   ├── models/               # Mongoose schemas
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── controllers/          # Business logic
│   │   ├── authController.js
│   │   ├── doctorController.js
│   │   ├── appointmentController.js
│   │   └── adminController.js
│   ├── routes/               # API routes
│   │   ├── authRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── pdfRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/           # Custom middleware
│   │   ├── auth.js
│   │   └── error.js
│   ├── utils/                # Utility functions
│   │   ├── pdfGenerator.js
│   │   └── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .env.example
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd DoctorsAppointment
```

### 2. Setup Backend

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Update MongoDB connection string and JWT secret
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doctors_appointment
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CLIENT_URL=http://localhost:3000

# Seed database with dummy data
npm run seed

# Start the server
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Setup Frontend

Open a new terminal:

```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Start the React app
npm start
```

The frontend will run on `http://localhost:3000`

## 🗄️ Database Setup

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   mongod
   ```
3. Update `MONGODB_URI` in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/doctors_appointment
   ```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get connection string
3. Update `MONGODB_URI` in `.env`:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/doctors_appointment
   ```

## 🧪 Seeding Database

Run the seed script to populate the database with dummy data:

```bash
cd server
npm run seed
```

This will create:
- 1 Admin user
- 3 Patient users
- 5 Doctor profiles
- Sample appointments

### Demo Login Credentials

#### Admin
- **Email:** admin@example.com
- **Password:** admin123

#### Patients
- **Email:** john@example.com | **Password:** patient123
- **Email:** jane@example.com | **Password:** patient123
- **Email:** mike@example.com | **Password:** patient123

#### Doctors
- **Email:** sarah.wilson@example.com | **Password:** doctor123
- **Email:** david.brown@example.com | **Password:** doctor123
- **Email:** emily.davis@example.com | **Password:** doctor123
- **Email:** michael.chen@example.com | **Password:** doctor123
- **Email:** lisa.anderson@example.com | **Password:** doctor123

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Doctors
- `GET /api/doctors` - Get all approved doctors (with filters)
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/:id/available-slots` - Get available time slots
- `POST /api/doctors/register` - Register as doctor
- `GET /api/doctors/me/profile` - Get my doctor profile
- `PUT /api/doctors/profile` - Update doctor profile

### Appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/my-appointments` - Get user's appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `GET /api/appointments/:id/confirmation` - Download PDF confirmation slip
- `PUT /api/appointments/:id/status` - Update appointment status (doctor)
- `PUT /api/appointments/:id/cancel` - Cancel appointment (patient)
- `PUT /api/appointments/:id/reschedule` - Reschedule appointment
- `PUT /api/appointments/:id/complete` - Complete appointment with diagnosis

### Admin
- `GET /api/admin/stats` - Get system statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/doctors` - Get all doctors
- `PUT /api/admin/doctors/:id/approval` - Approve/reject doctor
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/users/:id/toggle-status` - Activate/deactivate user
- `GET /api/admin/appointments` - Get all appointments
- `DELETE /api/admin/appointments/:id` - Delete appointment

## 📄 Appointment Confirmation Slip

The system automatically generates a professional PDF confirmation slip for each confirmed appointment containing:

- **Appointment ID** (unique identifier)
- **Patient Details** (name, email, phone, age)
- **Doctor Details** (name, specialization, qualifications, experience)
- **Appointment Date & Time**
- **Consultation Fee**
- **Clinic Address**
- **Status** (color-coded)
- **QR Code** (for quick verification)
- **Professional Layout** with healthcare branding

Patients can download the PDF from:
- Confirmation page after booking
- Appointment details page
- Appointment history list

## 🎨 UI Screenshots & Features

### Patient Dashboard
- Quick stats overview
- Recent appointments
- Quick action buttons
- Responsive design

### Doctor Browsing
- Filter by specialization
- Search by name
- Doctor cards with ratings
- Consultation fees

### Booking Flow
- Calendar date picker
- Real-time slot availability
- Appointment form
- Instant confirmation

### Doctor Dashboard
- Appointment statistics
- Pending approvals
- Schedule management
- Patient information

### Admin Dashboard
- System-wide statistics
- User management
- Doctor approval queue
- Revenue tracking

## 🧰 Development Scripts

### Backend
```bash
npm start          # Start server
npm run dev        # Start with nodemon (auto-reload)
npm run seed       # Seed database
npm test           # Run tests
```

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (RBAC)
- ✅ Protected routes on frontend and backend
- ✅ Input validation
- ✅ XSS protection
- ✅ CORS configuration

## 🚀 Deployment

### Backend (Node.js)
Deploy to platforms like:
- Heroku
- Render
- Railway
- DigitalOcean

### Frontend (React)
Deploy to platforms like:
- Vercel
- Netlify
- AWS S3 + CloudFront

### Environment Variables for Production
Make sure to update:
- `MONGODB_URI` - Production database
- `JWT_SECRET` - Strong secret key
- `CLIENT_URL` - Frontend production URL
- `NODE_ENV=production`

## 📝 Future Enhancements

- [ ] Email notifications (using Nodemailer)
- [ ] SMS reminders (using Twilio)
- [ ] Video consultation integration
- [ ] Payment gateway integration
- [ ] Doctor ratings and reviews
- [ ] Medical records management
- [ ] Prescription management
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Mobile app (React Native)

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
# Windows: Start MongoDB service from Services
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
# Windows: netstat -ano | findstr :5000
#          taskkill /PID <PID> /F
# Mac/Linux: lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
# Similar process for port 3000
```

### CORS Errors
- Ensure backend CORS is configured to allow frontend URL
- Check `CLIENT_URL` in backend `.env`

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Contact: your-email@example.com

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the database
- Express.js community
- TailwindCSS for utility-first CSS

---

**Built with ❤️ for better healthcare access**
