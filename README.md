# Mini SaaS Template Store

A full stack web application built using the MERN stack where users can browse website templates, save favorite templates, and manage authentication securely.

---

# 🚀 Project Overview

Mini SaaS Template Store is a responsive web application that allows users to:

- Register and Login
- Browse website templates
- Add templates to favorites
- Manage favorite templates
- Access protected routes using JWT authentication

This project demonstrates frontend development, backend API integration, authentication, MongoDB database management, and full stack deployment.

---

# 🛠 Tech Stack Used

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- SweetAlert2

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js
- Nodemailer

---

#  Features

- User Registration & Login
- JWT Authentication
- Password Hashing
- Protected Routes
- Browse Templates
- Add to Favorites
- Favorites Page
- Responsive UI
- REST API Integration
- Welcome Email using Nodemailer
- MongoDB Atlas Database

---

#  Folder Structure

```bash
fullstack-intern-task/
│
├── client
│
├── server
│
└── README.md
```

---

# ⚙️ Backend Setup

## Step 1 — Navigate to Server Folder

```bash
cd server
```

---

## Step 2 — Install Dependencies

```bash
npm install
```

---

## Step 3 — Create `.env` File

Create a `.env` file inside the `server` folder and add:

```env
PORT=5100

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_jwt_secret_key

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_email_password
```

---

## Step 4 — Run Backend Server

```bash
npm start
```

Backend runs on:

```txt
http://localhost:5100
```

---

# 💻 Frontend Setup

## Step 1 — Navigate to Client Folder

```bash
cd client
```

---

## Step 2 — Install Dependencies

```bash
npm install
```

---

## Step 3 — Run Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# 🔐 Authentication

This project uses:

- JWT Authentication
- Password Hashing using bcrypt.js
- Protected Routes
- Token-based Authorization

---



# 🗄 Database

MongoDB Atlas is used for storing:

- User Data
- Template Data
- Favorite Templates

---

#  Deployment

## Frontend Deployment
- Vercel / Netlify

## Backend Deployment
- Render

## Database
- MongoDB Atlas

---

#  Author

## Bhuvanesh M

- MERN Stack Developer
- Full Stack Web Developer

---

# 📞 Contact Information

- Email: bhuvaneshmahi2003@gmail.com.com
- GitHub: https://github.com/bhuvanesh-1703/fullstack-intern-task.git
- Deploy: https://fullstack-intern-task-mu.vercel.app/

---

#  Submission Instructions

1. Create a public GitHub repository named:

```txt
fullstack-intern-task
```

2. Push both folders:

```txt
client
server
README
```

3. Add this README.md file

4. Submit the GitHub repository link

---

#  Future Improvements


- Filter by Category
- Admin Dashboard
- Dark Mode
- User Profile Page
- Payment Integration

---

#  Project Status

Completed Successfully ✅