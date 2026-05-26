import asyncWrap from "../utils/asyncWrap.js";
import CustomError from "../utils/CustomError.js";
import User from "../models/user.model.js";


const userRegisterController = async (req, res) => {
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
}


export {
    userRegisterController
}
