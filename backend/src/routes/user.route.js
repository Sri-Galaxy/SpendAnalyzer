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


const userRouter = express.Router();

userRouter.post("/register", userRegisterController);
userRouter.post("/login", userLoginController);
userRouter.post("/logout", isAuthenticated, userLogoutController);
userRouter.get("/refresh-token", isAuthenticated, refreshAccessTokenController);

userRouter.get("/me", isAuthenticated, getUserController);
userRouter.put("/me", isAuthenticated, updateUserController);
userRouter.delete("/me", isAuthenticated, deleteUserController);


export default userRouter;