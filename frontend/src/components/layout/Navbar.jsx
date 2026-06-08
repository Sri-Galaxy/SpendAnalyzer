import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../api/user.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logoutUser();
      logout();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-10">

      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-blue-600">MyHundred</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Hello, <span className="font-semibold text-gray-800">{user?.name}</span>
        </span>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition font-medium"
        >
          Logout
        </button>
      </div>

    </header>
  );
}