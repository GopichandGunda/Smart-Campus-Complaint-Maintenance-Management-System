# Complete Setup Guide

## System Requirements

- Windows 10/11, macOS, or Linux
- Node.js v16+ and npm
- MongoDB (local or Atlas)
- 2GB RAM minimum
- 500MB disk space

---

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/GopichandGunda/Smart-Campus-Complaint-Maintenance-Management-System.git
cd "Smart Campus Complaint & Maintenance Management System"
```

### 2. Install MongoDB

**Windows/macOS/Linux:**
- Download from: https://www.mongodb.com/try/download/community
- Install following official documentation
- Start MongoDB service

**Or use MongoDB Atlas (Cloud):**
1. Visit: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string

### 3. Backend Setup

```bash
cd server
npm install
```

**Create `.env` file:**
```
MONGO_URI=mongodb://localhost:27017/smart-campus
JWT_SECRET=your-secret-key-change-this-in-production
PORT=5000
NODE_ENV=development
```

### 4. Frontend Setup

```bash
cd ../client
npm install
```

**Verify `.env` file:**
```
VITE_API_URL=http://localhost:5000/api
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 6. Access Application

Open browser: http://localhost:3000

---

## First Time Setup

### Create Test Accounts:

1. **Register as Student**
   - Email: student@college.edu
   - Password: Test@123

2. **Register as Admin** (manually in MongoDB or via app)
   - Edit user document: `role: "admin"`

3. **Register as Staff** (manually in MongoDB or via app)
   - Edit user document: `role: "staff"`

### Test Workflow:

1. **Login as Student** → Submit complaint
2. **Login as Admin** → Assign staff and priority
3. **Login as Staff** → Accept and resolve complaint
4. **Login as Student** → Provide feedback

---

## Production Deployment

### Deploy Backend (Heroku):

1. Login: `heroku login`
2. Create app: `heroku create app-name`
3. Set env vars:
   ```bash
   heroku config:set MONGO_URI=...
   heroku config:set JWT_SECRET=...
   ```
4. Deploy: `git push heroku main`

### Deploy Frontend (Vercel):

1. Login: `vercel login`
2. Deploy: `vercel`
3. Set env vars in Vercel dashboard:
   - `VITE_API_URL=https://your-backend.com/api`

### Deploy Backend (DigitalOcean/AWS):

1. Setup droplet/EC2
2. Install Node.js and MongoDB
3. Copy server folder
4. Run with PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "smart-campus"
   ```

---

## Common Commands

### Development
```bash
# Start backend
cd server && npm run dev

# Start frontend
cd client && npm run dev

# Build frontend
cd client && npm run build

# Run in production
cd server && npm start
```

### Database
```bash
# MongoDB CLI
mongosh

# Connect to remote
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/smart-campus"
```

---

## File Structure Quick Reference

```
server/
├── models/          ← Database schemas
├── controllers/     ← Business logic
├── routes/          ← API endpoints
├── middleware/      ← Auth, validation
└── server.js        ← Entry point

client/
├── pages/           ← Page components
├── components/      ← Reusable UI
├── services/        ← API client
└── App.jsx          ← Root component
```

---

## Credentials & Roles

| Role | Permissions |
|------|------------|
| Student | Submit complaints, view own complaints, give feedback |
| Admin | View all, assign staff, manage priorities, view stats |
| Staff | View assigned, update status, add notes, resolve |

---

## API Testing

Use Postman or curl:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123","phone":"1234567890"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'
```

---

**For more details, see README.md**
