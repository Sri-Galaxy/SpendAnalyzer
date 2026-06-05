import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from "../api/user.api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";



const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await loginUser(formData.email, formData.password);
            login(result.data);
            toast.success(result.message);
        } catch (err) {
            const message = err.response?.data?.message || "Something went wrong";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
                    <p className="text-gray-500 mt-2">Login to your Spend Analyzer</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
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
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pass">
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
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className='text-blue-500 font-medium hover:underline'>Register</Link>
                </p>

            </div>
        </div>
    );
}


export default LoginPage;