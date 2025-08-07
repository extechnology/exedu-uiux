import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../api/axios";

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    try {
      const res = await axiosInstance.post("google-auth/", {
        token: idToken,
      });
      console.log("Login successful", res.data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default GoogleLoginButton;
