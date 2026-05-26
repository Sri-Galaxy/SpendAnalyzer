import express from 'express';
import { 
    userRegisterController
} from '../controllers/user.controller.js';


const userRouter = express.Router();

userRouter.get("/register", userRegisterController);


export default userRouter;