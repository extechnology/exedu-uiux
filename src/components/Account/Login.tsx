import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/Authservices";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { loginWithGoogle } from "../../services/Authservices";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({ username, password });

      localStorage.setItem("accessToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);
      localStorage.setItem("username", username);
      localStorage.setItem("email", response.email);
      localStorage.setItem("id", response.user_id);

      console.log("Login successful:", response);
      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.detail || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 pt-10">
      <div className="w-full max-w-md space-y-6 ">
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
          Welcome Back <span className="inline-block">👋</span>
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-gray-700">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your Username"
              className="w-full px-4 py-2 border-2 border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-gray-700">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full px-4 py-2 border-2 border-pink-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            {/* <div className="text-right mt-1">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div> */}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-2 cursor-pointer rounded-md text-white font-medium bg-gradient-to-r from-fuchsia-500 to-violet-500 hover:opacity-90"
          >
            Sign in
          </button>
        </form>
        {/* Divider */}
        <div className="text-center text-gray-500 text-sm">Or</div>
        {/* Google Login */}
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
        {/* Sign Up Prompt */}
        <p className="text-center text-sm text-gray-700">
          Don't you have an account?{" "}
          <Link to={"/register"} className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
