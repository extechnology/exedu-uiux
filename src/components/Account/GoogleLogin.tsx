import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    try {
      const res = await axios.post("http://localhost:8000/google-auth/", {
        token: idToken,
      });
      console.log("Login successful", res.data);
      // Store auth token if needed
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log('Login Failed')}
    />
  );
};

export default GoogleLoginButton;
