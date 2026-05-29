import express from "express";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
app.use("/api/v1/user", userRouter);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Page not found",
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});


export default app;