import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../services/Authservices";
import { resendOtp } from "../../services/Authservices";
import toast from "react-hot-toast";

const OTP_LENGTH = 6;

const VerifyOtp: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const username = location.state?.username;
  const password = location.state?.password;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [resendTimer, setResendTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (value && nextInput) (nextInput as HTMLInputElement).focus();
  };


  if (!email || !username || !password) {
    alert("Missing user details. Please register again.");
    return;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length < OTP_LENGTH) {
      alert("Please enter the full 6-digit OTP.");
      return;
    }

    if (!email || !username || !password) {
      alert("Missing registration details.");
      return;
    }
    setLoading(true);
    try {
      const res = await verifyOtp({
        email,
        otp: enteredOtp,
        username,
        password,
      });

      console.log("OTP verified:", res);
      toast.success("OTP verified successfully!");
      toast.success("Registration successful! Please login.");
      navigate("/login"); 
    } catch (error: any) {
      console.error("OTP verification failed", error);
      alert(
        error.response?.data?.non_field_errors?.[0] ||
          "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };
  

  const handleResend = async () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setResendTimer(30);

    try {
      await resendOtp(email);
      console.log("Resending OTP...");
      toast.success("OTP resent successfully!");
    } catch (error: any) {
      console.error("Failed to resend OTP", error);
      toast.error("Failed to resend OTP.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Branding */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-fuchsia-500 to-violet-500 bg-clip-text">
            ex<span className="text-fuchsia-500">edu</span>
          </h1>
          <p className="text-xs text-gray-500">Hybrid AI Education</p>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Enter OTP <span className="inline-block">🔐</span>
        </h2>
        <p className="text-center text-sm text-gray-600">
          Please enter the 6-digit code sent to your email or phone.
        </p>

        {/* OTP Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-2">
            {otp.map((digit, i) => (
              <input
                title="Enter OTP"
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-10 h-12 text-center text-xl border-2 border-pink-400 rounded-md focus:ring-2 focus:ring-pink-300 outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white font-medium bg-gradient-to-r from-fuchsia-500 to-violet-500 hover:opacity-90 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-center text-sm text-gray-700">
          {resendTimer > 0 ? (
            <p>
              Resend OTP in{" "}
              <span className="font-medium text-gray-800">{resendTimer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-600 hover:underline font-medium"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
