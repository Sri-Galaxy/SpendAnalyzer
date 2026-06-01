import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { updateMe, changePassword, deleteMe, logoutUser } from "../api/user.api";

export default function ProfilePage() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  // Update profile form
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [profileLoading, setProfileLoading] = useState(false);

  // Change password form
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Delete account
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Handlers
  function handleProfileChange(e) {
    setProfileData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePasswordChange(e) {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const result = await updateMe(profileData.name, profileData.email);
      login(result.data);
      toast.success(result.message);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setProfileLoading(false);
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    setPasswordLoading(true);
    try {
      const result = await changePassword(
        passwordData.oldPassword,
        passwordData.newPassword
      );
      toast.success(result.message);
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setPasswordLoading(false);
    }
  }

  async function handleDeleteAccount() {
    if (deleteConfirm !== user?.email) {
      toast.error("Email doesn't match");
      return;
    }

    setDeleteLoading(true);
    try {
      await deleteMe();
      await logoutUser();
      logout();
      navigate("/register");
      toast.success("Account deleted successfully");
    } catch (error) {
      toast.error("Failed to delete account");
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account settings</p>
      </div>

      {/* Section 1 — Update Profile */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={profileLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition disabled:opacity-50"
          >
            {profileLoading ? "Saving..." : "Save Changes"}
          </button>

        </form>
      </div>

      {/* Section 2 — Change Password */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Change Password
        </h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              required
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={passwordLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition disabled:opacity-50"
          >
            {passwordLoading ? "Updating..." : "Update Password"}
          </button>

        </form>
      </div>

      {/* Section 3 — Danger Zone */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-red-100">
        <h2 className="text-lg font-semibold text-red-600 mb-1">
          Danger Zone
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          This will permanently delete your account and all your expenses.
          This action cannot be undone.
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type your email to confirm —{" "}
              <span className="text-red-500 font-semibold">{user?.email}</span>
            </label>
            <input
              type="email"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder={user?.email}
              className="w-full border border-red-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <button
            onClick={handleDeleteAccount}
            disabled={deleteLoading || deleteConfirm !== user?.email}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition disabled:opacity-50"
          >
            {deleteLoading ? "Deleting..." : "Delete My Account"}
          </button>
        </div>
      </div>

    </div>
  );
}