# 🏫 Smart Campus Complaint & Maintenance Management System

A full-stack **MERN application** designed to digitize and simplify the process of reporting, tracking, assigning, and resolving maintenance complaints within a college campus.

The system connects **Students, Administrators, and Maintenance Staff** through a centralized platform, reducing manual complaint handling and improving transparency and response time.

---

## 📌 Project Overview

In many educational institutions, campus maintenance complaints such as electrical issues, plumbing problems, Wi-Fi failures, classroom damage, hostel problems, and cleaning requests are handled manually.

This can lead to:

* Delayed complaint resolution
* Difficulty tracking complaints
* Lack of transparency
* Poor communication between students and maintenance staff
* Difficulty monitoring staff workload

The **Smart Campus Complaint & Maintenance Management System** solves these problems by providing a centralized digital platform where complaints can be submitted, assigned, tracked, updated, and resolved.

---

## 🎯 Objectives

* Digitize campus complaint management
* Reduce manual maintenance processes
* Provide real-time complaint tracking
* Improve communication between students and staff
* Allow administrators to monitor complaints
* Improve maintenance response time
* Maintain complete complaint history
* Collect student feedback after resolution

---

## 👥 User Roles

### 👨‍🎓 Student

Students can:

* Register and login
* Submit maintenance complaints
* Select complaint categories
* Select priority
* Add location and description
* Upload complaint images
* Track complaint status
* View complaint history
* Add comments
* Confirm resolution
* Provide ratings and feedback

### 👨‍💼 Administrator

Administrators can:

* View dashboard statistics
* Manage complaints
* Review complaints
* Assign complaints to maintenance staff
* Change complaint priority
* Update complaint status
* Manage students
* Manage maintenance staff
* Monitor staff workload
* View feedback
* Analyze complaint statistics

### 🧑‍🔧 Maintenance Staff

Maintenance staff can:

* Login securely
* View assigned complaints
* Accept complaints
* Update complaint progress
* Add progress notes
* Add resolution notes
* Mark complaints as resolved
* View completed complaints

---

## 🔄 Complaint Workflow

```text
Student
   │
   ▼
Submit Complaint
   │
   ▼
Admin Reviews
   │
   ▼
Priority Assigned
   │
   ▼
Staff Assigned
   │
   ▼
Staff Accepts
   │
   ▼
Work In Progress
   │
   ▼
Issue Resolved
   │
   ▼
Student Confirms
   │
   ▼
Feedback & Rating
```

---

## 📊 Complaint Status

The system supports the following complaint statuses:

| Status          | Description                      |
| --------------- | -------------------------------- |
| 🟡 Submitted    | Complaint submitted by student   |
| 🔵 Under Review | Admin is reviewing the complaint |
| 🟣 Assigned     | Complaint assigned to staff      |
| 🟠 In Progress  | Staff is working on the issue    |
| 🟢 Resolved     | Maintenance work completed       |
| ✅ Closed        | Student confirmed resolution     |
| 🔴 Rejected     | Complaint rejected by admin      |

---

## 🚨 Priority Levels

Complaints can be categorized according to urgency:

* Low
* Medium
* High
* Critical

This allows administrators to handle important campus issues first.

---

## 🛠️ Complaint Categories

The system supports:

* ⚡ Electrical
* 🚰 Plumbing
* 📡 Wi-Fi / Network
* 🏫 Classroom
* 🔬 Laboratory
* 🛏️ Hostel
* 🧹 Cleaning
* 🪑 Furniture
* 🛡️ Security
* 📋 Other

---

## 💻 Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* React Router
* Axios
* Context API
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JWT
* bcrypt
* Role-Based Access Control
* Protected Routes

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman

---

## 🏗️ System Architecture

```text
┌─────────────────────────────┐
│       React Frontend        │
│                             │
│ Student │ Admin │ Staff     │
└──────────────┬──────────────┘
               │
             Axios
               │
               ▼
┌─────────────────────────────┐
│      Express.js API         │
│                             │
│ Routes │ Controllers        │
│ Middleware │ Authentication │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│          MongoDB            │
│                             │
│ Users │ Complaints          │
│ Feedback                     │
└─────────────────────────────┘
```

---

## 📁 Project Structure

```text
Smart-Campus-Complaint-Maintenance-Management-System/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── student/
│   │   │   ├── admin/
│   │   │   └── staff/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── screenshots/
│
├── .gitignore
├── README.md
└── package.json
```

---

## 🗄️ Database Design

### User

```text
User
├── name
├── email
├── password
├── role
├── phone
├── college
├── department
├── studentId
├── employeeId
└── createdAt
```

### Complaint

```text
Complaint
├── title
├── description
├── category
├── location
├── priority
├── status
├── image
├── submittedBy
├── assignedTo
├── comments
├── resolutionNotes
├── createdAt
├── updatedAt
└── resolvedAt
```

### Feedback

```text
Feedback
├── complaint
├── student
├── rating
├── comment
└── createdAt
```

---

## 🔐 Authentication

The application uses secure authentication mechanisms:

* JWT-based authentication
* Password hashing using bcrypt
* Protected API routes
* Role-based authorization
* Student/Admin/Staff access control
* Secure environment variables
* Automatic handling of unauthorized requests

Passwords are never stored in plain text.

---

## 🔌 API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Users

```text
GET  /api/users/profile
PUT  /api/users/profile
GET  /api/users
```

### Complaints

```text
POST   /api/complaints
GET    /api/complaints
GET    /api/complaints/:id
PUT    /api/complaints/:id
DELETE /api/complaints/:id
```

### Student

```text
GET  /api/complaints/my
POST /api/complaints/:id/comments
POST /api/complaints/:id/feedback
```

### Admin

```text
GET /api/admin/complaints
PUT /api/admin/complaints/:id/status
PUT /api/admin/complaints/:id/priority
PUT /api/admin/complaints/:id/assign
GET /api/admin/students
GET /api/admin/staff
GET /api/admin/statistics
```

### Staff

```text
GET /api/staff/complaints
PUT /api/staff/complaints/:id/status
PUT /api/staff/complaints/:id/resolve
```

### Feedback

```text
POST /api/feedback
GET  /api/feedback
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/GopichandGunda/Smart-Campus-Complaint-Maintenance-Management-System.git
```

### 2. Navigate to the project

```bash
cd Smart-Campus-Complaint-Maintenance-Management-System
```

---

## 📦 Backend Setup

Navigate to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## 🌐 Frontend Setup

Open another terminal.

Navigate to:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🍃 MongoDB Setup

Create a MongoDB database using MongoDB Atlas or a local MongoDB installation.

Add the MongoDB connection string to:

```text
server/.env
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-campus
```

Never upload the `.env` file to GitHub.

---

## 📸 Screenshots

Add application screenshots here after completing the project.

### Home Page

```text
screenshots/home.png
```

### Student Dashboard

```text
screenshots/student-dashboard.png
```

### Submit Complaint

```text
screenshots/submit-complaint.png
```

### Complaint Details

```text
screenshots/complaint-details.png
```

### Admin Dashboard

```text
screenshots/admin-dashboard.png
```

### Staff Dashboard

```text
screenshots/staff-dashboard.png
```

---

## 🚀 Future Enhancements

The project can be extended with:

* 🤖 AI-based complaint classification
* 🎯 Automatic priority prediction
* 📧 Email notifications
* 📱 SMS notifications
* 📍 Campus location mapping
* 📊 Advanced analytics
* 🗺️ Campus complaint heatmap
* 🔔 Real-time notifications
* 📱 Mobile application
* 📷 QR-code complaint reporting
* 🔧 Predictive maintenance
* 📈 Maintenance performance analytics

---

## 🎓 Learning Outcomes

Through this project, the following concepts are demonstrated:

* MERN Stack development
* React component architecture
* REST API development
* Node.js and Express.js
* MongoDB database management
* Mongoose relationships
* JWT authentication
* Password hashing
* Role-based authorization
* CRUD operations
* API integration
* State management
* Protected routes
* Responsive UI development
* Git and GitHub
* Full-stack application development

---

## 👨‍💻 Author

**Gunda Gopichand**

B.Tech — Computer Science and Engineering

GitHub:
https://github.com/GopichandGunda

---

## 📄 License

This project is licensed under the **MIT License**.

---

⭐ If you find this project useful, consider giving the repository a star!!
