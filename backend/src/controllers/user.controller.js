import asyncWrap from "../utils/asyncWrap.js";
import CustomError from "../utils/CustomError.js";
import User from "../models/user.model.js";


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
        secure: false,
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
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    };

    return res.status(200).clearCookie("refreshToken", cookieOptions).clearCookie("accessToken", cookieOptions).json({
        success: true,
        message: "User logged out successfully"
    });
});


export {
    userRegisterController,
    userLoginController,
    userLogoutController
}
