import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();

app.set("trust proxy", 1);

app.use(cors({
    origin: process.env.CLIENT_URI,
    credentials: true
}));
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


import userRouter from "./routes/user.route.js";
app.use("/api/v1/user", userRouter);

import expenseRouter from "./routes/expense.route.js";
app.use("/api/v1/expense", expenseRouter);

import analyticsRounter from "./routes/analytics.route.js";
app.use("/api/v1/analytics", analyticsRounter);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Page not found",
    });
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});


export default app;