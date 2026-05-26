import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [36, "Password cannot exceed 36 characters"],
        trim: true
    },
    refreshToken: {
        type: String,
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { 
            id: this._id,
            name: this.name
        }, 
        process.env.JWT_ACCESS_TOKEN_SECRET, 
        { 
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY 
        }
    );
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id
        }, 
        process.env.JWT_REFRESH_TOKEN_SECRET, 
        { 
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY 
        }
    );
};

const User = mongoose.model("User", userSchema);


export default User;