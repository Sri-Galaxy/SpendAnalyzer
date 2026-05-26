import express from 'express';
import { 
    userRegisterController,
    userLoginController
} from '../controllers/user.controller.js';


const userRouter = express.Router();

userRouter.post("/register", userRegisterController);
userRouter.post("/login", userLoginController);


export default userRouter;