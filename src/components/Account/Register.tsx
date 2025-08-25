import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/Authservices";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { loginWithGoogle } from "../../services/Authservices";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(error);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirm) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await registerUser(formData);
      console.log("response:", res);
      toast.success("OTP sent successfully! Please verify.");
      navigate("/verify-otp", {
        state: {
          email: formData.email,
          username: formData.username,
          password: formData.password,
        },
      });
    } catch (err: any) {
      const data = err.response?.data;

      if (typeof data === "string") {
        setError(data);
        toast.error(data);
      } else if (data?.email) {
        setError(data.email);
        toast.error(data.email);
      } else if (data?.username) {
        setError(data.username);
        toast.error(data.username);
      } else if (data?.non_field_errors) {
        setError(data.non_field_errors[0]);
      } else {
        setError("Registration failed. Please try again.");
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-28 pb-10 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <img
            src="/ex_edu_logo-03.png"
            alt="exedu-logo"
            className="w-32 mx-auto"
          />

          <p className="text-xs text-gray-500">Hybrid AI Education</p>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create Account <span className="inline-block">🎉</span>
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm mb-1 text-gray-700">Name</label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-2 border-2 border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 border-2 border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="w-full px-4 py-2 pr-10 border-2 border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-1 text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirm"
                required
                minLength={8}
                value={formData.password_confirm}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="w-full px-4 py-2 pr-10 border-2 border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-medium bg-gradient-to-r from-fuchsia-500 to-violet-500 hover:opacity-90 
          ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Sending OTP..." : "Sign up"}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center text-gray-500 text-sm">Or</div>

        {/* Google Sign Up */}
        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse: CredentialResponse) => {
              const token = credentialResponse?.credential;

              if (!token) {
                toast.error("Google credential is missing.");
                return;
              }

              try {
                const response = await loginWithGoogle(token);

                localStorage.setItem("accessToken", response.access);
                localStorage.setItem("refreshToken", response.refresh);
                localStorage.setItem("username", response.username);
                localStorage.setItem("email", response.email);
                localStorage.setItem("id", `${response.user_id}`);

                toast.success("Logged in with Google!");
                navigate("/");
              } catch (err: any) {
                toast.error("Google login failed.");
                console.error(err);
              }
            }}
          />
        </div>

        {/* Login Prompt */}
        <p className="text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
