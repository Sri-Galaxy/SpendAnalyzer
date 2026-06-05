import asyncWrap from "../utils/asyncWrap.js";
import CustomError from "../utils/CustomError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


const generateTokens = async (user) => {
    try {
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new CustomError(500, "Error Generating Tokens");
    }
}
const refreshAccessTokenController = asyncWrap(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new CustomError(401, "Unauthorized: No refresh token provided");
    }

    const decoded = await jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded?.id);

    if (!user) {
        throw new CustomError(404, "User Not Found");
    }

    if (incomingRefreshToken !== user.refreshToken) {
        throw new CustomError(401, "Invalid refresh token");
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    };

    return res.status(200).cookie("accessToken", accessToken, cookieOptions).cookie("refreshToken", refreshToken, cookieOptions).json({
        success: true,
        message: "Access token refreshed successfully"
    });
});

const userRegisterController = asyncWrap(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new CustomError(400, "All the fields are mandatory");
    }

    const exists = await User.findOne({ email });

    if (exists) {
        throw new CustomError(400, "User already exists");
    }

    const user = await User.create({ name, email, password })

    const data = {
        id: user._id,
        name: user.name,
        email: user.email
    }

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data
    });
});
const userLoginController = asyncWrap(async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
        throw new CustomError(400, "All the fields are mandatory");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new CustomError(400, "Invalid credentials");
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
        throw new CustomError(400, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    };

    return res.status(200)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("accessToken", accessToken, cookieOptions)
        .json({
            success: true,
            message: "User logged in successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
});
const userLogoutController = asyncWrap(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            refreshToken: undefined
        },
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    };

    return res.status(200).clearCookie("refreshToken", cookieOptions).clearCookie("accessToken", cookieOptions).json({
        success: true,
        message: "User logged out successfully"
    });
});

const getUserController = asyncWrap(async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: req.user
    });
});
const updateUserController = asyncWrap(async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        throw new CustomError(400, "All the fields are mandatory");
    }

    const exists = await User.findOne({ email, _id: { $ne: req.user._id } });
    if (exists) {
        throw new CustomError(400, "Email already in use!");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            name,
            email
        },
        {
            returnDocument: "after",
            runValidators: true
        }
    ).select("-password -refreshToken");

    return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user
    });
});
const deleteUserController = asyncWrap(async (req, res) => {
    await User.findByIdAndDelete(req.user._id);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    };

    return res.status(200)
        .clearCookie("refreshToken", cookieOptions)
        .clearCookie("accessToken", cookieOptions)
        .json({
            success: true,
            message: "User deleted successfully"
        });
});
const changeUserPasswordController = asyncWrap(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new CustomError(400, "All the fields are mandatory");
    }

    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
        throw new CustomError(400, "Invalid credentials");
    }

    const isValid = await user.comparePassword(oldPassword);

    if (!isValid) {
        throw new CustomError(400, "Invalid credentials");
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Password changed successfully"
    });
});


export {
    userRegisterController,
    userLoginController,
    userLogoutController,
    refreshAccessTokenController,
    getUserController,
    updateUserController,
    deleteUserController,
    changeUserPasswordController
}
