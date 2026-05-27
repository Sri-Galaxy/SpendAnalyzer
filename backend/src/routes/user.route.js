import express from 'express';
import { 
    userRegisterController,
    userLoginController,
    userLogoutController
} from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/auth.middleware.js';


const userRouter = express.Router();

userRouter.post("/register", userRegisterController);
userRouter.post("/login", userLoginController);
userRouter.post("/logout", isAuthenticated, userLogoutController);


export default userRouter;