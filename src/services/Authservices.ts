import axiosInstance from "../api/axios";
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  AuthResponse,
} from "../api/types";

export const registerUser = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>(
    "/register/",
    data
  );
  return response.data;
};



export const loginUser = async (data: LoginRequest) => {
  const response = await axiosInstance.post("/api/token/", {
    username: data.username,
    password: data.password,
  });
  return response.data;
};



export const verifyOtp = async ({
  email,
  otp,
  username,
  password,
}: {
  email: string;
  otp: string;
  username: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/verify-otp/", {
    email,
    otp,
    username,
    password,
  });

  return response.data;
};



export const resendOtp = async (email: string) => {
  const res = await axiosInstance.post("/resend-otp/", { email });
  return res.data;
};



export const loginWithGoogle = async (token: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("google-auth/", {
    token,
  });
  return response.data;
};