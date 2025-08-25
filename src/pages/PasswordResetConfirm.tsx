import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";

const PasswordResetConfirmPage: React.FC = () => {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/password-reset-confirm/", {
        password,
        confirm_password: confirmPassword,
        uidb64,
        token,
      });

      toast.success("Password reset successful! Please login.");
      navigate('/login');
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/80">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mx-3 md:mx-0 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Set New Password</h2>

        <label className="block mb-2 text-sm font-medium">New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="block mt-4 mb-2 text-sm font-medium">
          Confirm New Password
        </label>
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-2 px-4 rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default PasswordResetConfirmPage;
