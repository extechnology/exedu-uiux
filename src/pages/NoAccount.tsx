import { SlUser } from "react-icons/sl";
import { IoMdCopy } from "react-icons/io";
import { LiaCertificateSolid } from "react-icons/lia";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

const NoAccount = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [canAccess] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isLoggedIn = localStorage.getItem("accessToken") !== null;
  const email = localStorage.getItem("email");

  const handleRequestAccess = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/request-profile-access/");
      setRequestMessage("Access request sent! We’ll notify you through email once approved.");
    } catch (error) {
      setRequestMessage("Failed to send request. Try again later.");
    }
    setLoading(false);
  };


  const handleProfileClick = () => {
    if (!token) {
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }
  };

  const token = localStorage.getItem("accessToken");

  return (
    <div className="py-20 max-w-7xl mx-auto">
      <div className="md:flex gap-8">
        <img src="/ri_shining-2-fill.svg" alt="" className="md:w-16 w-12" />
        <div className="pt-5">
          <h1 className="text-3xl md:text-start text-center font-bold">
            Welcome to Eduportal{" "}
          </h1>
          <p className="text-center pt-2">
            Your Personal education dashboard awaits
          </p>
        </div>
      </div>
      <div className="py-14">
        <SlUser className="w-12 h-12  mx-auto text-fuchsia-500" />
        <h1 className="text-center text-xl md:text-2xl font-bold pt-4">
          Your Profile is Empty
        </h1>
        <h1 className="text-center text-lg md:text-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 text-transparent bg-clip-text font-medium pt-4">Your are currently logged in as : <span className="font-semibold">{email}</span></h1>
        <p className="pt-6 text-center md:w-1/3 w-[92%] md:px-0 mx-auto">
          Create an Account to access your personalized dashboard with all your
          educational information in one place
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 md:px-0">
        <div className="p-8 border-2 border-fuchsia-400 rounded-2xl shadow-lg shadow-fuchsia-300 space-y-4 hover:shadow-md hover:shadow-fuchsia-500 duration-300 transition-all hover:scale-105">
          <PiGraduationCapDuotone className="w-10 h-10  text-fuchsia-700 hover:-translate-x-2 duration-300 transition-all  " />
          <h1 className="text-2xl font-bold hover:-translate-y-1 duration-300 transition-all">
            Track Courses
          </h1>
          <p className="hover:-translate-y-1 duration-300 transition-all">
            Monitor your progress, deadlines and achievements across all your
            courses
          </p>
        </div>
        <div className="p-8 border-2 border-fuchsia-400 rounded-2xl shadow-lg shadow-fuchsia-300 space-y-4 hover:shadow-md hover:shadow-fuchsia-500 duration-300 transition-all hover:scale-105">
          <IoMdCopy className="w-10 h-10  text-fuchsia-700 hover:-translate-x-2 duration-300 transition-all  " />
          <h1 className="text-2xl font-bold hover:-translate-y-1 duration-300 transition-all">
            Manage Projects
          </h1>
          <p className="hover:-translate-y-1 duration-300 transition-all">
            Monitor your progress, deadlines and achievements across all your
            courses
          </p>
        </div>
        <div className="p-8 border-2 border-fuchsia-400 rounded-2xl shadow-lg shadow-fuchsia-300 space-y-4 hover:shadow-md hover:shadow-fuchsia-500 duration-300 transition-all hover:scale-105">
          <LiaCertificateSolid className="w-10 h-10  text-fuchsia-700 hover:-translate-x-2 duration-300 transition-all  " />
          <h1 className="text-2xl font-bold hover:-translate-y-1 duration-300 transition-all">
            Store Certificates
          </h1>
          <p className="hover:-translate-y-1 duration-300 transition-all">
            Monitor your progress, deadlines and achievements across all your
            courses
          </p>
        </div>
      </div>
      <div className="flex justify-center pt-12">
        {!isLoggedIn ? (
          <button
            onClick={handleProfileClick}
            className="w-80 py-3 bg-gradient-to-r font-bold from-fuchsia-500 to-violet-600 text-white rounded-full hover:from-violet-600 hover:to-fuchsia-500 transition-all duration-300"
          >
            Create your Account
          </button>
        ) : !canAccess ? (
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleRequestAccess}
              disabled={loading}
              className="w-80 py-3 bg-gradient-to-r font-bold from-fuchsia-500 to-violet-600 text-white rounded-full hover:from-emerald-600 hover:to-green-500 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Requesting..." : "Request Access"}
            </button>
            {requestMessage && (
              <p className="text-center text-green-600">{requestMessage}</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default NoAccount;
