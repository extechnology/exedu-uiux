import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/exedu/",
  headers: {
    "Content-Type": "application/json",
  },
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      console.log(err);
      alert("Session expired. Please login again.");
      toast.error(err.response.data.detail);
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
