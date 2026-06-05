# SpendAna

SpendAnalyzer is an expense tracking web application that helps users monitor spending, view analytics, and manage expenses with authentication. Also can interact with the platform through chat to get more insights.

## Features

- User registration and login
- Add, edit, delete expenses
- View expense summaries and analytics
- Charts for categories, monthly trends, and payment methods
- Protected routes for authenticated users
- Interact with data using prompts and get insights

## Tech Stack

### Backend

- Node.js
- Express
- MongoDB / Mongoose
- JWT authentication
- bcrypt password hashing
- dotenv, cors, cookie-parser

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- React Hot Toast

## Setup and Run

### Backend

1. Open a terminal and navigate to `backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (or copy from `.env.sample`) and set environment variables for your database and JWT secret.
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Open a terminal and navigate to `frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

Then open the Vite URL shown in the frontend terminal (usually `http://localhost:5173`) to access the app.

## Project Structure

```
SpendAnalyzer/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── index.js
│   │   ├── controllers/
│   │   │   ├── analytics.controller.js
│   │   │   ├── expense.controller.js
│   │   │   └── user.controller.js
│   │   ├── db/
│   │   │   └── index.js
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   ├── expense.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── analytics.route.js
│   │   │   ├── expense.route.js
│   │   │   └── user.route.js
│   │   └── utils/
│   │       ├── asyncWrap.js
│   │       └── CustomError.js
│   ├── package.json
│   └── .env.sample

├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js

└── README.md
```

## Notes

- Configure backend environment variables before starting.
- Ensure MongoDB is running and reachable from the backend.
- The app uses separate frontend and backend services for development.
