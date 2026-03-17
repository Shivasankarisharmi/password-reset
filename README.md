# Password Reset System

A full-stack password reset application built with **React** (frontend) and **Node.js + Express** (backend), using **MongoDB** for data storage and **Nodemailer** for sending reset emails.

---

## Features

- User can request a password reset by entering their email
- System sends a reset link to the registered email
- Reset link contains a secure random token (expires in 15 minutes)
- User can set a new password using the link
- Login validates against the latest password only
- Wrong or old passwords are rejected with an error message

---

## Project Structure

```
project/
├── frontend/                  # React app (Vite)
│   └── src/
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── ForgotPassword.jsx
│       │   └── ResetPassword.jsx
│       ├── App.jsx
│       └── main.jsx
│
└── backend/                   # Node.js + Express
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── authController.js
    ├── models/
    │   └── User.js
    ├── routes/
    │   └── authRoutes.js
    ├── index.js
    └── .env
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Email | Nodemailer (Gmail) |
| Password Hashing | bcryptjs |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with email and password |
| POST | `/api/auth/forgot-password` | Send password reset email |
| POST | `/api/auth/reset-password/:token` | Reset password using token |

---

## Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=https://your-frontend-url.netlify.app
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> **Note:** Use a Gmail App Password, not your regular Gmail password.

---

## How to Run Locally

### Backend

```bash
cd backend
npm install
node index.js
```

Server runs at `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## How It Works

1. User visits `/forgot-password` and enters their email
2. Backend checks if the email exists in MongoDB
3. If found, a random token is generated and saved with a 15-minute expiry
4. A reset link is emailed to the user: `CLIENT_URL/reset-password/<token>`
5. User clicks the link, enters a new password
6. Backend verifies the token is valid and not expired
7. New password is hashed with bcrypt and saved to MongoDB
8. User is redirected to login after 1 second
9. Login only accepts the latest password — old passwords are rejected

---

## Deployment

- **Frontend** → Netlify
- **Backend** → Render

---

## Live Links

- Frontend: `https://your-app.netlify.app`
- Backend: `https://your-app.onrender.com`