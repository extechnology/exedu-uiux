import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import AttendanceTracker from "../components/profile/AttendanceTracker";
import ProgressSection from "../components/profile/ProgressSection";
import Skills from "../components/profile/SkillsSection";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type Certificate = {
  id: number;
  file: string;
  description: string;
  profile: number;
};

type Profile = {
  id: number;
  certificates: Certificate[];
  name: string;
  email: string;
  profile_image: string;
  clerk_user_id: string;
  phone_number: string;
  secondary_school: string;
  secondary_year: string;
  university: string;
  university_major: string;
  university_year: string;
  career_objective: string;
  skills: string;
  experience: string;
  interests: string;
};

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const userId = params?.id;

  console.log(loading);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://server.exedu.in/api/profiles/${userId}/`
        );
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return (
    <div className="flex bg-gray-100 pt-20 overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-64 hidden md:block bg-gray-200 shadow-md p-5 pt-10">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
          <h1 className="text-xl font-semibold">exedu</h1>
        </div>
        <ul className="mt-8 space-y-4">
          <li className="flex items-center space-x-2 text-fuchsia-500 font-semibold">
            <FaUser />
            <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
              My dashboard
            </span>
          </li>
          <li className="flex items-center space-x-2 text-gray-500">
            <IoMdSettings />
            <span>Accounts</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-500">
            <span>Mobile</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-500">
            <span>Payments</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-500">
            <span>Complaints</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-500">
            <span>Supports</span>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="md:flex-1 p-0 pt-5 md:p-8 bg-white max-w-full overflow-hidden">
        <div className="flex justify-between items-center px-5">
          <h2 className="md:text-2xl text-gray-700 font-semibold">
            Welcome to exedu student portal
          </h2>
          <div className="flex items-center space-x-4 md:pr-4">
            {/* <FaBell className="text-gray-600" /> */}
            <div className="flex items-center space-x-2">
              <img
                src={profile?.profile_image || "/man.png"}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
                width={40}
                height={40}
              />
              <span>Hello {profile?.name}</span>
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
                  src={profile?.profile_image || "/default-avatar.png"}
                  alt="Profile"
                  className="rounded-lg mx-auto object-cover aspect-square"
                  width={500}
                  height={500}
                />

                <h3 className="text-center mt-4 font-semibold">
                  {profile?.name}
                </h3>
                <p className="text-center text-gray-600">
                  {profile?.phone_number}
                </p>
                <p className="text-center text-gray-600">{profile?.email}</p>
                {/* <div className="text-center mt-4">
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600">
                    Save
                  </button>
                </div> */}
              </div>

              {/* Right Section */}
              <div className="space-y-6 w-full md:w-2/3">
                {/* Education Section */}
                <div className="md:flex gap-6 justify-between space-y-6 md:space-y-0">
                  <div className="bg-white p-6 rounded-2xl shadow-md md:w-1/2">
                    <h3 className="font-semibold">
                      <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                        Education
                      </span>
                    </h3>
                    <p className="text-gray-600 pb-1">
                      Secondary School:{profile?.secondary_school}
                    </p>
                    <p className="text-gray-600 pb-1">
                      Year of Passing: {profile?.secondary_year}
                    </p>
                    <p className="text-gray-600 mt-4 pb-1">Graduation</p>
                    <p className="text-gray-900 pb-1">{profile?.university}</p>
                    <p className="text-gray-600 pb-1">
                      Degree: {profile?.university_major}
                    </p>
                    <p className="text-gray-600">
                      Graduation Year: {profile?.university_year}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-md md:w-1/2">
                    <h1>
                      <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                        Career Objective
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

                {/* Profile Details */}
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
                    <p className="text-gray-900 font-bold pb-1">
                      {/* Course Name */}
                    </p>
                    <p className="text-gray-600 pb-1">
                      Course Duration: 3 Months{/* Duration */}
                    </p>
                    <p className="text-gray-600">
                      Class Start Date: 20/04/2025{/* Start Date */}
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

            {/* Attendance Tracker */}
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
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

                  {/* Add dummy placeholders if fewer than 3 certificates */}
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
                </div>

                {/* Modal Popup */}
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
    </div>
  );
};

export default Profile;
