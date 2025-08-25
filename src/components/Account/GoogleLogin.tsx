import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../api/axios";

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse: any) => {
    console.log("Google credentialResponse:", credentialResponse);

    const idToken = credentialResponse?.credential;
    console.log("Extracted ID Token:", idToken);

    if (!idToken) {
      console.error("No ID token received from Google!");
      return;
    }

    try {
      const res = await axiosInstance.post("google-auth/", {
        token: idToken,
      });
      console.log("Login successful:", res.data);
    } catch (error: any) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
      } else {
        console.error("Login failed:", error.message);
      }
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.error("Google Login Failed")}
    />
  );
};

export default GoogleLoginButton;
