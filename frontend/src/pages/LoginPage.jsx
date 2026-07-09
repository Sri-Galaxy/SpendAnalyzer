import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from "../api/user.api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, transform } from 'framer-motion';



const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const { login } = useAuth();

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await loginUser(formData.email, formData.password);
            login(result.data);
            navigate("/dashboard");
            toast.success(result.message);
        } catch (err) {
            const message = err.response?.data?.message || "Something went wrong";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#F8F7F5] flex flex-col items-center justify-center p-8" style={{ fontFamily: "'Syne', sans-serif" }}>

            <div className="mb-12 text-center">
                <h1 className="text-6xl font-bold text-gray-800">Welcome back</h1>
                <p className="text-gray-500 mt-2">Login to MyHundred</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                    <label className="block text-base font-medium text-gray-700 mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-md border border-gray-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
                    />
                </div>

                <div>
                    <label className="block text-base font-medium text-gray-700 mb-1" htmlFor="pass">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="pass"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="I don't know"
                        required
                        className="w-md border border-gray-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
                    />
                </div> <br />

                <div className="w-md bg-red-100 border border-[#F2A09F] rounded-lg">
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileTap={{ y: 6, x: -4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="cursor-pointer w-full relative bottom-1.5 left-1 bg-[#F2A09F] hover:bg-[#fcb0ae] text-white font-semibold py-2.75 rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </motion.button>
                </div>

            </form>

            <p className="text-center text-base text-gray-500 mt-6">
                Don't have an account?{" "}
                <Link to="/register" className='text-red-300 font-medium hover:underline'>Register</Link>
            </p>

        </div>
    );
}


export default LoginPage;