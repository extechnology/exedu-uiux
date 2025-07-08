import { FaUser } from "react-icons/fa";
import AttendanceTracker from "../components/profile/AttendanceTracker";
import ProgressSection from "../components/profile/ProgressSection";
import { FaMobile, FaPaypal, FaEdit } from "react-icons/fa";
import Skills from "../components/profile/SkillsSection";
import { useState } from "react";
import type { Profile, StudentCertificates } from "../api/types";
import { PersonStanding } from "lucide-react";
import { FcSupport } from "react-icons/fc";
import { LucidePaperclip } from "lucide-react";
import useProfile from "../hooks/useProfile";
import axiosInstance from "../api/axios";
import ProfileModal from "./ProfileForm";

const Profile = () => {
  // const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedCert, setSelectedCert] = useState<StudentCertificates | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  // const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const { profile, loading, error } = useProfile(userId!);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  console.log(profile, "profile");
  console.log(userId, "userId in profile");

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleSave = async (formData: FormData) => {
    if (!userId) {
      console.error("Profile userId is missing again");
      return;
    }

    try {
      const res = await axiosInstance.put(
        `/profile/user/${userId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Profile updated:", res.data);
      window.location.reload();
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex bg-gray-100 pt-18 overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-64 hidden md:block bg-gray-200 shadow-md p-5 pt-10">
        <div className="flex items-center space-x-2">
          <img src="/ex_edu_logo-03.png" alt="" className="p-2" />
        </div>
        <ul className="mt-8 space-y-4 cursor-pointer">
          <li className="flex items-center space-x-2 text-fuchsia-500 font-semibold">
            <FaUser />
            <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
              My dashboard
            </span>
          </li>
          <li className="flex items-center space-x-2 text-gray-500 bg-white p-2 rounded">
            <FaMobile className="bg-gray-200  rounded-full" />
            <span>Mobile</span>
          </li>
          <li className="flex items-center space-x-2 text-gray- bg-white p-2 rounded">
            <FaPaypal className="bg-gray-200  rounded-full" />
            <span>Payments</span>
          </li>
          <li className="flex items-center space-x-2 text-gray- bg-white p-2 rounded">
            <LucidePaperclip className="w-4 h-4 bg-gray-200  rounded-full" />
            <span>Complaints</span>
          </li>
          <li className="flex items-center space-x-2 text-gray- bg-white p-2 rounded">
            <PersonStanding className="w-5 h-5 bg-gray-200  rounded-full" />
            <span>Supports</span>
          </li>
          <li className="flex items-center space-x-2 text-gray- bg-white p-2 rounded ">
            <FcSupport className="bg-gray-200  rounded-full" />
            <span onClick={handleClick}>Edit Profile</span>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="md:flex-1 p-0 pt-5 md:p-8 bg-white max-w-full overflow-hidden">
        <div className="flex justify-between items-center px-5">
          <h2 className="md:text-2xl text-gray-700 font-semibold">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
              exedu
            </span>{" "}
            student portal
          </h2>
          <div className="flex items-center space-x-4 md:pr-4">
            {/* <FaBell className="text-gray-600" /> */}
            <div className="flex items-center space-x-2">
              <img
                src={backendUrl + profile?.profile_image || "/man.png"}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
                width={40}
                height={40}
              />
              <span>
                Hello <span className="font-semibold text-md">{username}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Background Section */}
        <div>
          <div className="bg-gray-100 md:bg-[url('https://img.freepik.com/free-vector/abstract-elegant-geometric-shape-background-design_1017-50120.jpg')] bg-no-repeat bg-cover rounded-2xl md:p-6 p-4 mt-6 w-full overflow-hidden">
            <div className="md:flex gap-6 space-y-6 md:space-y-0">
              {/* Profile Card */}
              <div className="bg-white p-6 w-full md:w-1/3 rounded-2xl shadow-md">
                <img
                  src={
                    backendUrl + profile?.profile_image || "/default_avatar.jpg"
                  }
                  alt="Profile"
                  className="rounded-lg mx-auto object-cover aspect-square"
                  width={500}
                  height={500}
                />

                <h3 className="text-center mt-4 font-semibold">
                  Username :{username}
                </h3>
                <p className="text-center text-gray-600 flex justify-center gap-3">
                  <span>Phone : {profile?.phone_number || "N/A"} </span>
                  <span className="content-center">
                    <FaEdit className="text-violet-500" />
                  </span>
                </p>
                <p className="text-center text-gray-600">Email : {email}</p>
              </div>

              {/* Right Section */}
              <div className="space-y-6 w-full md:w-2/3">
                {/* Education Section */}
                <div className="md:flex gap-6 justify-between space-y-6 md:space-y-0">
                  <div className="bg-white p-6 rounded-2xl shadow-md md:w-1/2">
                    <h3 className="font-semibold flex items-center justify-between">
                      <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                        Education
                      </span>
                      <span>
                        <FaEdit className="text-violet-500" />
                      </span>
                    </h3>
                    <p className="text-gray-600 pb-1">
                      Secondary School:{" "}
                      <span className="font-semibold  ">
                        {profile?.secondary_school}
                      </span>
                    </p>
                    <p className="text-gray-600 pb-1">
                      Year of Passing:{" "}
                      <span className="font-semibold ">
                        {profile?.secondary_year}
                      </span>
                    </p>
                    <p className="text-gray-600 mt-4 pb-1">Graduation</p>
                    <p className="text-gray-600 pb-1 font-semibold ">
                      {profile?.university}
                    </p>
                    <p className="text-gray-600 pb-1">
                      Degree:{" "}
                      <span className="font-semibold ">
                        {profile?.university_major}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Graduation Year:{" "}
                      <span className="font-semibold ">
                        {profile?.university_year}
                      </span>
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-md md:w-1/2">
                    <h1 className="font-semibold flex items-center justify-between">
                      <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                        Career Objective
                      </span>
                      <span>
                        <FaEdit className="text-violet-500" />
                      </span>
                    </h1>
                    <ul className="text-gray-600 pt-2 space-y-2">
                      {profile?.career_objective
                        ?.split(",")
                        .map((obj, index) => (
                          <li key={index}>{obj.trim()}</li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6  md:flex justify-between rounded-2xl shadow-md">
                  <div>
                    <h3 className="font-semibold pb-2">
                      <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                        exedu Profile
                      </span>
                    </h3>
                    <p className="text-gray-600 pb-1">
                      Joined Course: AI Hybrid Digital Marketing
                    </p>
                    <p className="text-gray-900 font-bold pb-1"></p>
                    <p className="text-gray-600 pb-1">
                      Course Duration: 3 Months
                    </p>
                    <p className="text-gray-600">
                      Class Start Date: 20/04/2025
                    </p>
                  </div>
                  <div className="content-center pt-4 md:pt-0">
                    <img
                      src={"/online-test.png"}
                      alt="no image"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 md:flex gap-6 space-y-6 md:space-y-0 ">
              <div>
                <AttendanceTracker />
              </div>
              <div className="bg-white text-black p-6 rounded-2xl shadow-lg w-full">
                <h1 className="mb-6">
                  <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                    Certificates
                  </span>
                </h1>

                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  {profile?.certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => setSelectedCert(cert)}
                    >
                      <img
                        src={cert.file}
                        alt={cert.description}
                        width={200}
                        height={140}
                        className="w-[75%] shadow-md"
                      />
                      <h1 className="mt-2 text-sm font-medium">
                        {cert.description}
                      </h1>
                    </div>
                  ))}

                  {Array.from({
                    length: Math.max(
                      0,
                      3 - (profile?.certificates?.length ?? 0)
                    ),
                  }).map((_, index) => (
                    <div
                      key={`dummy-${index}`}
                      className="flex flex-col items-center opacity-50 pointer-events-none"
                    >
                      <img
                        src="/quality.png"
                        alt="Dummy Certificate"
                        width={200}
                        height={140}
                        className="w-[75%]"
                      />
                      <h1 className="mt-2 text-sm font-medium">
                        Certificate Placeholder
                      </h1>
                    </div>
                  ))}
                </div> */}

                {selectedCert && (
                  <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-lg flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg overflow-auto relative">
                      <button
                        onClick={() => setSelectedCert(null)}
                        className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-black"
                      >
                        &times;
                      </button>
                      <img
                        src={selectedCert.file}
                        alt={selectedCert.description}
                        width={800}
                        height={600}
                        className="rounded-md w-[95%] mx-auto "
                      />
                      <h2 className="text-center mt-2 text-base font-semibold">
                        {selectedCert.description}
                      </h2>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <ProgressSection />
          </div>
          {profile && (
            <div>
              <Skills
                skills={profile.skills}
                experience={profile.experience}
                interests={profile.interests}
              />
            </div>
          )}
        </div>
      </main>
      <ProfileModal
        initialProfile={profile}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSave}
      />
    </div>
  );
};

export default Profile;
