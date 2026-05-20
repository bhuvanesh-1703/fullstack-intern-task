# 🎨 Frontend - Template Store React App

Modern React-based frontend for Template Store with Vite, Tailwind CSS, and SweetAlert2 notifications.

## 📋 Table of Contents

- [Overview](#overview)
- [Setup Instructions](#setup-instructions)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Components](#components)
- [Pages](#pages)
- [Services](#services)
- [State Management](#state-management)
- [Styling](#styling)
- [Features](#features)

## 📖 Overview

This frontend provides a modern, responsive user interface with:

- User authentication (Login/Register)
- Template browsing with search and filters
- Favorites management
- Responsive mobile-first design
- Real-time notifications
- Protected routes

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:5100/api
```

### 3. Start Development Server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📜 Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server with HMR |
| `npm run build`   | Build production-ready bundle     |
| `npm run preview` | Preview production build locally  |
| `npm run lint`    | Run ESLint to check code quality  |

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation component
│   │   ├── Footer.jsx          # Footer component
│   │   └── TemplateCard.jsx    # Template card display
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   ├── Template.jsx        # Templates listing
│   │   └── Favourites.jsx      # User favorites
│   ├── services/
│   │   └── api.js              # Axios API client
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.html
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env.example
└── README.md
```

## 🧩 Components

### Navbar.jsx

Navigation component with:

- Logo/branding
- Navigation links
- User menu with logout
- Mobile responsive hamburger menu
- Conditional rendering based on auth state

### Footer.jsx

Footer component with:

- Company information
- Quick links
- Contact details
- Copyright notice

### TemplateCard.jsx

Displays individual template card with:

- Template image
- Name and category
- Description
- Add to favorites button
- Hover effects

## 📄 Pages

### Login.jsx

User login page with:

- Email and password inputs
- Form validation
- Error handling
- Link to registration
- Loading state

### Register.jsx

User registration page with:

- Name, email, password inputs
- Password validation
- Error handling
- Link to login

### Template.jsx

Templates listing page with:

- Fetch all templates
- Search functionality
- Category filtering
- Grid display

### Favourites.jsx

User favorites page with:

- Fetch user favorites (protected)
- Display favorited templates
- Remove from favorites
- Empty state handling

## 🔗 Services

### api.js

Axios configuration with:

- Base URL configuration
- JWT token automatic injection
- Request/response interceptors

## 💾 State Management

- Component-level state with `useState`
- JWT token in localStorage
- User data persistence

## 🎨 Styling

### Tailwind CSS

- Utility-first CSS framework
- Responsive design utilities
- Mobile-first approach

## ✨ Features

- Authentication with JWT
- Protected routes
- Search and filtering
- Real-time notifications with SweetAlert2
- Responsive mobile design

## 🚀 Production Build

```bash
npm run build
npm run preview
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Last Updated:** May 2026
