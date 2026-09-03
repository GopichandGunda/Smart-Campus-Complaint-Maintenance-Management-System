# Smart Campus Complaint & Maintenance Management System

A comprehensive web-based platform for managing campus maintenance complaints and requests. This system streamlines the process of reporting maintenance issues, tracking resolutions, and managing campus facilities efficiently.

**Author:** Gunda Gopichand  
**B.Tech** — Computer Science and Engineering  
**GitHub:** [https://github.com/GopichandGunda](https://github.com/GopichandGunda)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
- [Key Features](#key-features)
- [System Workflow](#system-workflow)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Demo Credentials](#demo-credentials)
- [Future Enhancements](#future-enhancements)

---

## Project Overview

The Smart Campus Complaint & Maintenance Management System is a centralized platform designed to improve the efficiency of campus maintenance operations. It enables students to report maintenance problems, allows administrators to manage and prioritize complaints, and facilitates maintenance staff to resolve issues effectively.

---

## Problem Statement

Campus maintenance management traditionally relies on manual processes, leading to:
- **Slow Response Times:** Complaints take time to reach the maintenance team
- **Poor Tracking:** Students cannot track complaint status in real-time
- **Inefficient Coordination:** No centralized system for admin and staff communication
- **Limited Analytics:** Lack of data-driven insights about maintenance patterns

---

## Proposed Solution

A digital platform that:
1. Enables **quick and easy complaint submission** by students
2. Provides **real-time status tracking** for all parties
3. Centralizes **admin management and priority assignment**
4. Streamlines **staff task assignment and management**
5. Maintains **complete audit trail** with feedback collection
6. Generates **analytics for campus management**

---

## Key Features

### 👤 Student Portal
- ✅ User registration and authentication
- ✅ Submit complaints with details (title, category, location, priority, image)
- ✅ View complaint history and status
- ✅ Real-time status tracking
- ✅ Add comments to complaints
- ✅ Provide feedback and ratings (1-5 stars)
- ✅ Search and filter complaints by status, category, priority

### 🔐 Admin Dashboard
- ✅ Comprehensive dashboard with statistics
- ✅ View all complaints with filtering options
- ✅ Change complaint status and priority
- ✅ Assign complaints to maintenance staff
- ✅ View student and staff lists
- ✅ Monitor recent feedback
- ✅ Manage complaint lifecycle

### 🔧 Staff Portal
- ✅ View assigned complaints
- ✅ Accept complaints and start work
- ✅ Update complaint progress and status
- ✅ Add resolution notes
- ✅ Mark complaints as resolved
- ✅ Add comments and communicate with students
- ✅ Track workload and performance

### 🔒 Security Features
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (RBAC)
- ✅ Protected routes and API endpoints
- ✅ Input validation and sanitization
- ✅ CORS protection

---

## System Workflow

```
1. STUDENT SUBMITS COMPLAINT
   ↓
2. ADMIN REVIEWS COMPLAINT
   ↓
3. ADMIN ASSIGNS PRIORITY & CATEGORY
   ↓
4. ADMIN ASSIGNS TO MAINTENANCE STAFF
   ↓
5. STAFF ACCEPTS COMPLAINT
   ↓
6. STAFF UPDATES PROGRESS & ADDS NOTES
   ↓
7. STAFF MARKS AS RESOLVED
   ↓
8. STUDENT CONFIRMS RESOLUTION
   ↓
9. STUDENT PROVIDES RATING & FEEDBACK
   ↓
10. COMPLAINT CLOSED - ANALYTICS UPDATED
```

**Complaint Statuses:**
- `Submitted` - Initial complaint submission
- `Under Review` - Admin is reviewing
- `Assigned` - Assigned to staff member
- `In Progress` - Staff actively working
- `Resolved` - Work completed
- `Closed` - Final closure after feedback
- `Rejected` - Admin rejected the complaint

**Priority Levels:**
- `Low` - Non-urgent maintenance
- `Medium` - Standard maintenance
- `High` - Urgent issues
- `Critical` - Emergency situations

**Categories:**
- Electrical
- Plumbing
- Wi-Fi / Network
- Classroom
- Laboratory
- Hostel
- Cleaning
- Furniture
- Security
- Other

---

## Technology Stack

### Frontend
- **React.js 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **Lucide React** - Icon library
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variables

### Development Tools
- **Nodemon** - Auto-reload for development
- **Vite Dev Server** - Fast HMR
- **ESLint** - Code quality (optional)

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   CLIENT (React + Vite)             │
│  ┌──────────────────────────────────────────────┐   │
│  │  Pages: Home, Auth, Student, Admin, Staff   │   │
│  │  Components: Cards, Tables, Forms, Badges   │   │
│  │  Services: Axios API Client                 │   │
│  │  Context: Auth State Management             │   │
│  └──────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/REST API
┌──────────────────────┴──────────────────────────────┐
│              SERVER (Express.js)                     │
│  ┌──────────────────────────────────────────────┐   │
│  │ Routes:                                      │   │
│  │  - Auth: /api/auth/register, /login         │   │
│  │  - Users: /api/users/profile                │   │
│  │  - Complaints: /api/complaints              │   │
│  │  - Feedback: /api/feedback                  │   │
│  │  - Admin: /api/admin/...                    │   │
│  ├──────────────────────────────────────────────┤   │
│  │ Controllers:                                 │   │
│  │  - Auth, Users, Complaints, Feedback        │   │
│  ├──────────────────────────────────────────────┤   │
│  │ Middleware:                                  │   │
│  │  - JWT Authentication, Error Handling       │   │
│  ├──────────────────────────────────────────────┤   │
│  │ Models:                                      │   │
│  │  - User, Complaint, Feedback                │   │
│  └──────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────┘
                       │ MongoDB Driver
┌──────────────────────┴──────────────────────────────┐
│         DATABASE (MongoDB)                           │
│  ├─ Users Collection                               │
│  ├─ Complaints Collection                          │
│  └─ Feedback Collection                            │
└───────────────────────────────────────────────────────┘
```

---

## Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['student', 'admin', 'staff']),
  phone: String (required),
  college: String,
  department: String,
  studentId: String (for students),
  employeeId: String (for staff),
  profilePicture: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaint Model
```javascript
{
  title: String (required),
  description: String (required),
  category: String (enum: [10 categories]),
  location: String (required),
  priority: String (enum: ['Low', 'Medium', 'High', 'Critical']),
  status: String (enum: [7 statuses]),
  image: String (optional),
  submittedBy: ObjectId (ref: User),
  assignedTo: ObjectId (ref: User, optional),
  comments: [{
    user: ObjectId (ref: User),
    text: String,
    createdAt: Date
  }],
  resolutionNotes: String,
  createdAt: Date,
  updatedAt: Date,
  resolvedAt: Date (optional)
}
```

### Feedback Model
```javascript
{
  complaint: ObjectId (ref: Complaint),
  student: ObjectId (ref: User),
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
```

---

## API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
```

### Users
```
GET    /api/users/profile          - Get user profile
PUT    /api/users/profile          - Update profile
GET    /api/users                  - Get all users
GET    /api/users/role/:role       - Get users by role
```

### Complaints
```
POST   /api/complaints             - Create complaint
GET    /api/complaints             - Get all complaints
GET    /api/complaints/:id         - Get complaint details
GET    /api/complaints/my/complaints - Get student's complaints
GET    /api/complaints/staff/assigned - Get staff's assigned complaints
PUT    /api/complaints/:id/status  - Update status
PUT    /api/complaints/:id/priority - Update priority
PUT    /api/complaints/:id/assign  - Assign to staff
POST   /api/complaints/:id/comments - Add comment
PUT    /api/complaints/:id/resolution-notes - Add resolution notes
DELETE /api/complaints/:id         - Delete complaint
```

### Feedback
```
POST   /api/feedback               - Submit feedback
GET    /api/feedback               - Get all feedback
GET    /api/feedback/:complaintId  - Get complaint feedback
```

### Admin
```
GET    /api/admin/statistics       - Get dashboard statistics
GET    /api/admin/students         - Get all students
GET    /api/admin/staff            - Get all staff
GET    /api/admin/feedback/recent  - Get recent feedback
```

---

## Project Structure

```
smart-campus-complaint-system/
├── client/                              # React Frontend
│   ├── src/
│   │   ├── assets/                      # Images, fonts
│   │   ├── components/                  # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── PriorityBadge.jsx
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── Alert.jsx
│   │   ├── context/                     # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── layouts/                     # Layout components
│   │   ├── pages/                       # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── student/
│   │   │   │   ├── StudentDashboard.jsx
│   │   │   │   ├── StudentComplaints.jsx
│   │   │   │   ├── CreateComplaint.jsx
│   │   │   │   └── ComplaintDetail.jsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminComplaints.jsx
│   │   │   │   ├── AdminComplaintDetail.jsx
│   │   │   │   ├── AdminStudents.jsx
│   │   │   │   └── AdminStaff.jsx
│   │   │   └── staff/
│   │   │       ├── StaffDashboard.jsx
│   │   │       ├── StaffComplaints.jsx
│   │   │       └── StaffComplaintDetail.jsx
│   │   ├── services/                    # API Services
│   │   │   ├── api.js
│   │   │   └── services.js
│   │   ├── styles/                      # CSS files
│   │   ├── utils/                       # Utility functions
│   │   ├── App.jsx                      # Main App component
│   │   ├── main.jsx                     # Entry point
│   │   └── index.css                    # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── server/                              # Express Backend
│   ├── config/
│   │   └── database.js                  # MongoDB connection
│   ├── controllers/                     # Request handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── complaintController.js
│   │   ├── feedbackController.js
│   │   └── adminController.js
│   ├── middleware/                      # Middleware
│   │   ├── auth.js                      # JWT authentication
│   │   └── errorHandler.js
│   ├── models/                          # Database models
│   │   ├── User.js
│   │   ├── Complaint.js
│   │   └── Feedback.js
│   ├── routes/                          # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── complaintRoutes.js
│   │   ├── feedbackRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/                           # Utilities
│   │   └── jwt.js                       # JWT functions
│   ├── server.js                        # Main server file
│   ├── package.json
│   └── .env.example
│
├── screenshots/                         # Project screenshots
├── .gitignore
├── README.md                            # This file
└── package.json                         # Root package.json (monorepo)
```

---

## Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/GopichandGunda/Smart-Campus-Complaint-Maintenance-Management-System.git
cd "Smart Campus Complaint & Maintenance Management System"
```

### Step 2: Setup MongoDB

#### Option A: Local MongoDB
1. Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # Windows
   mongod
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection URI: `mongodb+srv://username:password@cluster.mongodb.net/smart-campus`

### Step 3: Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `server/.env`:**
```
MONGO_URI=mongodb://localhost:27017/smart-campus
JWT_SECRET=your_jwt_secret_key_change_this
PORT=5000
NODE_ENV=development
```

### Step 4: Setup Frontend

```bash
cd ../client

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Verify `client/.env`:**
```
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Application

### Terminal 1 - Start Backend Server

```bash
cd server
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB Connected: localhost
```

### Terminal 2 - Start Frontend Development Server

```bash
cd client
npm run dev
```

Expected output:
```
VITE v4.x.x  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## Configuration

### Environment Variables

#### Backend (`server/.env`)
```
# MongoDB
MONGO_URI=mongodb://localhost:27017/smart-campus
# OR (for MongoDB Atlas)
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/smart-campus

# JWT
JWT_SECRET=your_super_secret_key_minimum_32_chars

# Server
PORT=5000
NODE_ENV=development
```

#### Frontend (`client/.env`)
```
VITE_API_URL=http://localhost:5000/api
```

---

## Demo Credentials

You can create test accounts using the registration page.

**Example Test Users:**

| Role | Email | Password |
|------|-------|----------|
| Student | student@example.com | password123 |
| Admin | admin@example.com | admin123 |
| Staff | staff@example.com | staff123 |

### Create Test Data:

1. **Register as Student** - Create a complaint with sample data
2. **Login as Admin** - Assign priority and staff
3. **Login as Staff** - Update progress and resolve

---

## Build for Production

### Frontend
```bash
cd client
npm run build

# Output: client/dist/
```

### Backend
No build step needed for Express.js. Deploy the `server/` directory as-is.

---

## Error Handling

The application includes comprehensive error handling:

- **Invalid Credentials** - Clear error message on login
- **Validation Errors** - Form validation with field-level errors
- **Database Errors** - Graceful error responses
- **Network Errors** - Automatic retry with user feedback
- **Unauthorized Access** - Redirect to login or home
- **404 Errors** - Custom "Not Found" pages

---

## Security Best Practices

1. ✅ **Never commit `.env` files** - Use `.env.example`
2. ✅ **Always use HTTPS in production**
3. ✅ **Update dependencies regularly** - `npm audit`, `npm update`
4. ✅ **Rotate JWT_SECRET periodically**
5. ✅ **Use strong MongoDB passwords**
6. ✅ **Enable MongoDB network access restrictions**
7. ✅ **Implement rate limiting** (recommended for production)
8. ✅ **Add input validation** (already implemented)

---

## Troubleshooting

### Issue: Cannot connect to MongoDB
**Solution:**
- Verify MongoDB is running: `mongosh`
- Check MONGO_URI in `.env`
- Verify network access (if using Atlas)

### Issue: CORS errors
**Solution:**
- Ensure backend is running on port 5000
- Verify VITE_API_URL in client `.env`
- Check CORS middleware in server.js

### Issue: Port already in use
**Solution:**
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or use different port in .env
PORT=5001
```

### Issue: Module not found errors
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Future Enhancements

1. **Mobile App** - React Native mobile application
2. **Email Notifications** - Automatic status update emails
3. **SMS Alerts** - Critical complaint notifications
4. **Advanced Analytics** - Dashboard with charts and reports
5. **Staff Performance Metrics** - Track resolution times and ratings
6. **Bulk Operations** - Import complaints from Excel
7. **Complaint Templates** - Pre-defined complaint types
8. **SLA Management** - Service level agreement tracking
9. **Multi-language Support** - Internationalization
10. **Dark Mode** - UI theme switching
11. **File Attachments** - Multiple file uploads
12. **Complaint History** - Archive and historical analysis
13. **Integration APIs** - Calendar sync, third-party tools
14. **QR Code Scanning** - Quick complaint submission

---

## Contributing

This project is a portfolio project. For contributions, improvements, or bug reports, please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is open source and available under the MIT License.

---

## Support & Contact

For questions, issues, or feedback:

📧 **Email:** gopichand@example.com  
🔗 **GitHub:** [GopichandGunda](https://github.com/GopichandGunda)  
💼 **LinkedIn:** [Gunda Gopichand](#)

---

## Project Statistics

- **Total Files:** 70+
- **Backend Endpoints:** 25+
- **Frontend Pages:** 12+
- **Reusable Components:** 10+
- **Database Models:** 3
- **Lines of Code:** 4000+

---

## Acknowledgments

- React.js documentation and community
- Express.js best practices
- MongoDB design patterns
- Open-source contributors

---

**Last Updated:** September 3, 2024  
**Version:** 1.0.0

---

Made with ❤️ by **Gunda Gopichand**
