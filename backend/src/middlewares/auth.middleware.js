import asyncWrap from '../utils/asyncWrap.js';
import CustomError from '../utils/CustomError.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


const isAuthenticated = asyncWrap(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

    // Now your error has statusCode: 401
    // Client gets correct status code
    // Client knows exactly what went wrong
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new CustomError(401, 'Token expired - please login again');
        }
        if (error.name === 'JsonWebTokenError') {
            throw new CustomError(401, 'Invalid token');
        }
        throw new CustomError(401, 'Unauthorized - token verification failed');
    }

    const user = await User.findById(decoded?.id).select('-password -refreshToken');

    if (!user) {
        throw new CustomError(404, 'User not found');
    }

    req.user = user;
    next();
});


export default isAuthenticated;