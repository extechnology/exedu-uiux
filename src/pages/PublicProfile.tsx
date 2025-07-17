import { FaUser } from "react-icons/fa";
import AttendanceTracker from "../components/profile/AttendanceTracker";
import ProgressSection from "../components/profile/ProgressSection";
import { FaMobile, FaPaypal } from "react-icons/fa";
import Skills from "../components/profile/SkillsSection";
import { useState } from "react";
import type {  StudentCertificates } from "../api/types";
import { PersonStanding } from "lucide-react";
import { LucidePaperclip } from "lucide-react";
import { FiFileText } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FiAward } from "react-icons/fi";
import { useParams } from "react-router-dom";
import usePublicProfile from "../hooks/usePubliProfile";
import usePublicCertificates from "../hooks/usePublicCert";

const PublicProfile = () => {
  const [selectedCert, setSelectedCert] = useState<StudentCertificates | null>(
    null
  );
  const { uniqueId } = useParams();
  const certificate = usePublicCertificates(uniqueId ?? "");
  const { profile, loading, error } = usePublicProfile(uniqueId ?? "");
  const username = profile?.user?.username || "Guest";
  const email = profile?.user?.email || "Not available";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  console.log(uniqueId, "uniqueId");

  console.log(profile, "profile");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex bg-gray-100 pt-18 overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-64 hidden md:block fixed top-0 left-0 h-screen mt-17 bg-gray-200 shadow-md p-5 overflow-y-auto z-30">
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
          
        </ul>
      </aside>

      {/* Main content */}
      <main className="md:ml-64 flex-1 p-0 pt-5 md:p-8 bg-white max-w-full overflow-hidden">
        <div className="flex md:justify-between justify-end items-center px-5">
          <h2 className="md:text-2xl hidden md:block text-gray-700 font-semibold">
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
                <div className="relative w-full">
                  {profile?.profile_image ? (
                    <>
                      <img
                        src={backendUrl + profile.profile_image}
                        alt="Profile"
                        className="rounded-lg mx-auto object-cover aspect-square cursor-pointer hover:opacity-80 transition"
                        width={500}
                        height={500}
                      />
                    </>
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-lg h-60 cursor-pointer hover:bg-gray-50 transition"
                      // onClick={() => setOpenImageModal(true)}
                    >
                      <p className="text-gray-500">No Profile Image</p>
                      {/* <button className="mt-2 px-4 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition">
                        Add Image
                      </button> */}
                    </div>
                  )}
                </div>

                <h3 className="text-center mt-4 font-semibold">
                  Username :{username}
                </h3>
                <p className="text-center text-gray-600 flex justify-center gap-3">
                  <span>Phone : {profile?.phone_number || "N/A"} </span>
                  <span
                    className="content-center cursor-pointer"
                  >
                    {/* <FaEdit
                      className="text-violet-500 cursor-pointer"
                      onClick={() =>
                        setEditingField({
                          fieldKey: "phone_number",
                          fieldName: "Phone Number",
                          value: profile?.phone_number || "",
                        })
                      }
                    /> */}
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
                      {/* <span>
                        <FaEdit
                          className="text-violet-500 cursor-pointer"
                          onClick={() => setOpenEducationModal(true)}
                        />
                      </span> */}
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
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                  <h2 className="md:text-xl text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                    My Certifications
                  </h2>
                  
                </div>

                {/* Certificates Grid */}
                {Array.isArray(certificate?.certificates) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificate.certificates.map((cert: any) => {
                      const isPDF = cert.certificate_file
                        .toLowerCase()
                        .endsWith(".pdf");

                      return (
                        <div
                          key={cert.id}
                          onClick={() => setSelectedCert(cert)}
                          className="group relative overflow-hidden rounded-xl border border-gray-100 hover:border-violet-200 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                        >
                          <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-4">
                            {isPDF ? (
                              <div className="text-center p-4">
                                <div className="mx-auto bg-red-50 w-14 h-14 rounded-full flex items-center justify-center mb-3">
                                  <FiFileText className="w-7 h-7 text-red-500" />
                                </div>
                                <span className="text-xs font-medium text-gray-500">
                                  PDF Document
                                </span>
                              </div>
                            ) : (
                              <img
                                src={`${backendUrl}${cert.certificate_file}`}
                                alt={cert.description}
                                className="w-full h-full object-contain"
                              />
                            )}
                          </div>
                          <div className="p-4 bg-white">
                            <h3 className="font-medium text-gray-900 line-clamp-1">
                              {cert.description}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {isPDF ? "PDF File" : "Image Certificate"}
                            </p>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <span className="text-white text-sm font-medium">
                              View Details
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {/* Empty states - only show if less than 3 certificates */}
                    {certificate.certificates.length < 3 &&
                      Array.from({
                        length: 3 - certificate.certificates.length,
                      }).map((_, index) => (
                        <div
                          key={`empty-${index}`}
                          className="border-2 border-dashed border-gray-200 rounded-xl aspect-[4/3] flex flex-col items-center justify-center p-6 text-center"
                        >
                          <div className="w-12 h-12 bg-violet-50 rounded-full flex items-center justify-center mb-3">
                            <FiAward className="w-5 h-5 text-violet-400" />
                          </div>
                          
                        </div>
                      ))}
                  </div>
                )}

                {/* Certificate Modal */}
                {selectedCert && (
                  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                      <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="font-semibold text-lg">
                          {selectedCert.description}
                        </h3>
                        <button
                          title="Close"
                          onClick={() => setSelectedCert(null)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <FiX className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>

                      <div className="flex-1 overflow-auto p-4">
                        {selectedCert.certificate_file
                          .toLowerCase()
                          .endsWith(".pdf") ? (
                          <iframe
                            src={`${backendUrl}${selectedCert.certificate_file}`}
                            title="PDF Viewer"
                            className="w-full h-full min-h-[70vh] rounded-md border"
                          />
                        ) : (
                          <img
                            src={`${backendUrl}${selectedCert.certificate_file}`}
                            alt={selectedCert.description}
                            className="rounded-md w-full h-auto max-h-[70vh] object-contain mx-auto"
                          />
                        )}
                      </div>

                      <div className="p-4 border-t flex justify-end">
                        <a
                          href={`${backendUrl}${selectedCert.certificate_file}`}
                          download
                          className="px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 text-sm font-medium"
                        >
                          Download Certificate
                        </a>
                      </div>
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

export default PublicProfile;
