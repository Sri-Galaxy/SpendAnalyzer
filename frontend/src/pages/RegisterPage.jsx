import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser, loginUser } from "../api/user.api";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";


export default function RegisterPage() {
  const { login } = useAuth();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await registerUser(formData.name, formData.email, formData.password);
      toast.success(result.message);

      const loginResult = await loginUser(formData.email, formData.password);
      login(loginResult.data);
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F7F5] flex flex-col items-center justify-center px-4" style={{ fontFamily: "'Syne', sans-serif" }}>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-[#F2A09F]">Create account</h1>
          <p className="text-gray-500 mt-2">Start tracking your spending</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Srinath"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Hint: Don't share it with anyone"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div className="w-md bg-white border border-[#1A1A1A] rounded-lg">
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ y: 5, x: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="cursor-pointer w-full relative bottom-1.5 left-1 bg-[#1A1A1A] hover:bg-[#2e2e2e] text-white font-semibold py-2.75 rounded-lg disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </motion.button>
          </div>

        </form>

        {/* Footer */}
        <p className="text-center text-base text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-red-300 font-medium hover:underline">
            Login
          </Link>
        </p>

    </div>
  );
}