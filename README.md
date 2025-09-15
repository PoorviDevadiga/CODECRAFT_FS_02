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
|
│
├── backend/                      
│   ├── server.js                  
│   ├── package.json              
│   ├── package-lock.json         
│   ├── .env                       
│   ├── middleware/               
│   │   └── authMiddleware.js      
│   ├── models/                   
│   │   ├── Employee.js           
│   │   └── User.js                
│   ├── routes/                   
│   │   ├── auth.js                
│   │   └── employeeRoutes.js     
│   └── node_modules/              
│
├── frontend/                     
│   ├── index.html                 
│   ├── script.js                  
│   └── style.css                  
│
└── README.md                      
     

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
