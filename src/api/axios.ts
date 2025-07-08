import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/exedu/",
  headers: {
    "Content-Type": "application/json",
  },
//   withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.log(err);
      toast.error(err.response.data.detail);
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
