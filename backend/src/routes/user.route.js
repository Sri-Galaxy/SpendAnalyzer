import express from 'express';
import { 
    userRegisterController,
    userLoginController,
    userLogoutController,
    refreshAccessTokenController,
    getUserController,
    updateUserController,
    deleteUserController
} from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/auth.middleware.js';
import rateLimit from 'express-rate-limit';


const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs,
    skipSuccessfulRequests: true, // Only count failed requests (like failed login attempts)
    message: 'Too many requests from this IP, please try again after 15 minutes'
});


const userRouter = express.Router();

userRouter.post("/register", authLimiter, userRegisterController);
userRouter.post("/login", authLimiter, userLoginController);
userRouter.post("/logout", isAuthenticated, userLogoutController);
userRouter.post("/refresh-token", refreshAccessTokenController);

userRouter.get("/me", isAuthenticated, getUserController);
userRouter.put("/me", isAuthenticated, updateUserController);
userRouter.delete("/me", isAuthenticated, deleteUserController);


export default userRouter;