import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";

const PasswordResetRequestPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/password-reset/",
        { email: email.trim() },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(res.data);
      toast.success("Password reset link sent! Check your email.");
      setEmail("");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.email?.[0] || "Failed to send reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center relative z-50 justify-center min-h-screen bg-black/80">
      <form
        onSubmit={handlePasswordResetRequest}
        className="bg-white p-6 rounded-lg shadow-md w-full mx-3 md:mx-0 max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>

        <label className="block mb-2 text-sm font-medium">Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default PasswordResetRequestPage;
