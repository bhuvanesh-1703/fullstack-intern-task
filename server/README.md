# 🔧 Backend - Template Store API

Professional Node.js and Express backend API for Template Store with MongoDB integration, JWT authentication, and email notifications.

## 📋 Table of Contents

- [Overview](#overview)
- [Setup Instructions](#setup-instructions)
- [Available Scripts](#available-scripts)
- [API Routes](#api-routes)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Email Configuration](#email-configuration)

## 📖 Overview

This backend provides a RESTful API with:

- User authentication and registration
- JWT-based authorization
- Template management
- Favorites system
- Email notifications via Nodemailer

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```env
PORT=5100
MONGO_URL=mongodb://127.0.0.1:27017/template_store
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 3. Database Setup

Ensure MongoDB is running and seed initial templates:

```bash
npm run seed
```

### 4. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:5100`

## 📜 Available Scripts

| Command        | Description                              |
| -------------- | ---------------------------------------- |
| `npm run dev`  | Start development server with hot reload |
| `npm run seed` | Seed database with sample templates      |
| `npm test`     | Run test suite                           |

## 🔌 API Routes

### Authentication Endpoints

#### Register User

```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: {
  "success": true,
  "message": "User registered successfully. Welcome email sent!",
  "userId": "64a1b2c3d4e5f6g7h8i9j0k1"
}
```

#### Login User

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: {
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### Template Endpoints

#### Get All Templates

```
GET /api/templates

Response: {
  "success": true,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Modern SaaS Dashboard",
      "description": "A sleek and responsive SaaS dashboard...",
      "category": "Dashboard",
      "thumbnail_url": "...",
      "createdAt": "2024-05-20T10:30:00Z"
    }
  ]
}
```

#### Get Single Template

```
GET /api/templates/:id

Response: {
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Modern SaaS Dashboard",
    ...
  }
}
```

### Favorites Endpoints (Protected Routes)

#### Add to Favorites

```
POST /api/favorites/:templateId
Authorization: Bearer {token}

Response: {
  "success": true,
  "message": "Template added to favorites"
}
```

#### Get User Favorites

```
GET /api/favorites
Authorization: Bearer {token}

Response: {
  "success": true,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Modern SaaS Dashboard",
      ...
    }
  ]
}
```

## 🗄️ Database Models

### User Model

```javascript
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

### Template Model

```javascript
{
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  thumbnail_url: {
    type: String,
    required: false,
    default: 'https://via.placeholder.com/300x200?text=Template'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## 🔐 Authentication

### JWT Implementation

- Tokens expire in 24 hours
- Token stored in Authorization header: `Bearer {token}`
- Middleware validates token on protected routes

### Password Security

- Passwords hashed with bcryptjs (10 salt rounds)
- Never store plain text passwords
- Always use HTTPS in production

### Protected Routes

All endpoints starting with `/api/favorites` require valid JWT token in Authorization header.

## 📧 Email Configuration

### Nodemailer Setup

- Service: Gmail SMTP
- Sender: Configured email from `EMAIL_USER`
- Authentication: App password (not regular Gmail password)

### Email Features

- Professional HTML templates
- Automatic welcome emails on registration
- Customizable email content
- Error logging

### Gmail Setup Steps

1. Enable 2-Step Verification
2. Generate App Password for "Mail"
3. Use generated password as `EMAIL_PASS`

## 🛡️ Error Handling

All endpoints implement comprehensive error handling:

```javascript
try {
  // Business logic
} catch (error) {
  console.error("Operation Error:", error.message);
  return res.status(500).json({
    success: false,
    message: "Operation failed",
    error: error.message,
  });
}
```

### Common Error Responses

| Status | Message                 | Meaning                     |
| ------ | ----------------------- | --------------------------- |
| 400    | All fields are required | Missing request body fields |
| 400    | User already exists     | Email already registered    |
| 400    | User not found          | Invalid email               |
| 400    | Invalid password        | Wrong password              |
| 401    | Unauthorized            | Missing or invalid token    |
| 500    | Internal server error   | Unexpected error            |

## 📁 Project Structure

```
BackEnd/
├── controllers/
│   ├── authController.js       # User auth logic
│   ├── templateController.js   # Template operations
│   └── favouriteController.js  # Favorites management
├── middleware/
│   └── auth.js                 # JWT verification
├── models/
│   ├── User.js                 # User schema
│   └── Template.js             # Template schema
├── routes/
│   ├── authRoutes.js          # /api/auth routes
│   ├── templateRoutes.js      # /api/templates routes
│   └── favouriteRoutes.js     # /api/favorites routes
├── utils/
│   └── nodemailer.js          # Email service
├── app.js                     # Express app configuration
├── seed.js                    # Database seeding script
├── package.json
├── .env
└── .env.example
```

## 🧪 Testing Endpoints

### Using cURL

Register User:

```bash
curl -X POST http://localhost:5100/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Login:

```bash
curl -X POST http://localhost:5100/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Get Templates:

```bash
curl http://localhost:5100/api/templates
```

## 📝 Middleware

### Auth Middleware (`auth.js`)

- Validates JWT token from Authorization header
- Extracts user information
- Passes to next middleware/route handler
- Returns 401 if token is invalid or missing

## 🚀 Production Deployment

### Pre-deployment Checklist

- [ ] Update JWT_SECRET to strong random value
- [ ] Set NODE_ENV=production
- [ ] Use production MongoDB URL (MongoDB Atlas)
- [ ] Configure production email credentials
- [ ] Enable HTTPS
- [ ] Set CORS origins correctly
- [ ] Test all API endpoints

### Deployment Platforms

- **Render.com** - Recommended
- **Railway.app**
- **Heroku** (paid)
- **AWS**
- **DigitalOcean**

## 🐛 Debugging

Enable detailed logging:

```javascript
console.log("Debug message:", variable);
console.error("Error:", error.message);
```

Check logs in:

- Terminal output
- MongoDB logs
- Email service logs

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB & Mongoose](https://mongoosejs.com/)
- [JWT Guide](https://jwt.io/)
- [Nodemailer](https://nodemailer.com/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

---

**Last Updated:** May 2026
