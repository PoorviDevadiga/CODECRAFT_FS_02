# Employee Management System

A full-stack web application for managing employees with authentication. 
Built with **Node.js, Express, MongoDB** (backend) and **HTML, CSS, JS** (frontend).


## ✨ Features
- User authentication (signup/login with JWT) 
- Add, update, delete employees 
- View employees in a modern styled frontend 
- Secure routes (only logged-in users can manage employees) 

## 📂 Project Structure

CODECRAFT_FS_01/
│
├── backend/                      
│   ├── server.js                  # Express server entry point
│   ├── package.json               # Dependencies
│   ├── package-lock.json          # Dependency lock file
│   ├── .env                       # Environment variables (Mongo URI, JWT secret)
│   ├── middleware/               
│   │   └── authMiddleware.js      # Middleware to protect routes
│   ├── models/                   
│   │   ├── Employee.js            # Employee schema
│   │   └── User.js                # User schema
│   ├── routes/                   
│   │   ├── auth.js                # Authentication routes (login/signup)
│   │   └── employeeRoutes.js      # Employee CRUD routes
│   └── node_modules/              # Installed dependencies
│
├── frontend/                     
│   ├── index.html                 # Homepage / Dashboard
│   ├── script.js                  # Frontend logic
│   └── style.css                  # Styles
│
└── README.md                      # Documentation 
     

## 🛠️ Tech Stack
**Backend:** Node.js, Express, MongoDB, JWT, bcrypt 
**Frontend:** HTML, CSS, JavaScript 
**Database:** MongoDB

## 🛠️ Setup Instructions
### Backend
1. Go inside backend folder 
   ```bash
   cd backend
   npm install
   node server.js
### MongoDB 
1. Database Name: `employeeDB`
2. Collection Name:  `employees`
                     `users`
