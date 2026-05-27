import asyncWrap from '../utils/asyncWrap.js';
import CustomError from '../utils/CustomError.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


const isAuthenticated = asyncWrap(async (req, res, next) => {    
    const token = req.cookies?.accessToken || req.header('Authorization')?.split(' ')[1];

    if (!token) {
        throw new CustomError(401, 'Unauthorized: No token provided');
    }

    const decoded = await jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded?.id).select('-password -refreshToken');

    if (!user) {
        throw new CustomError(404, 'User not found');
    }

    req.user = user;
    next();
});


export default isAuthenticated;