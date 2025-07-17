import { FaUser } from "react-icons/fa";
import AttendanceTracker from "../components/profile/AttendanceTracker";
import ProgressSection from "../components/profile/ProgressSection";
import { FaMobile, FaPaypal, FaEdit } from "react-icons/fa";
import Skills from "../components/profile/SkillsSection";
import { useState, useEffect } from "react";
import type { Profile, StudentCertificates } from "../api/types";
import { PersonStanding } from "lucide-react";
import { LucidePaperclip } from "lucide-react";
import useProfile from "../hooks/useProfile";
import axiosInstance from "../api/axios";
import SectionEditModal from "./ProfileForm";
import EducationEditModal from "./EducationModal";
import ImageEditModal from "./EditImage";
import useCertificate from "../hooks/useCertificate";
import { IoIosAddCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { FiFileText } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FiAward } from "react-icons/fi";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";
import {
  GlobeAltIcon,
  LockClosedIcon,
  ShareIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { FaXTwitter } from "react-icons/fa6";
import axiosPublic from "../api/axiosPublic";

const Profile = () => {
  const [selectedCert, setSelectedCert] = useState<StudentCertificates | null>(
    null
  );
  const certificate = useCertificate();
  const [editingSection, setEditingSection] = useState<
    "phone" | "education" | "career" | null
  >(null);
  const [openModal, setOpenModal] = useState(false);
  const [openEducationModal, setOpenEducationModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const userId = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const { profile, loading, error } = useProfile(userId!);
  const [localProfile, setLocalProfile] = useState(profile);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [editingField, setEditingField] = useState<null | {
    fieldKey: string;
    fieldName: string;
    value?: string;
  }>(null);
  const uniqueId = localProfile?.unique_id;
  const [showAddModal, setShowAddModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [updatingVisibility, setUpdatingVisibility] = useState(false);
  useEffect(() => {
    if (profile?.is_public !== undefined) {
      setIsPublic(profile.is_public);
    }
  }, [profile]);
  console.log("Current isPublic state:", isPublic);

  console.log(editingSection);
  console.log(openModal);
  console.log(certificate, "certificate");

  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  useEffect(() => {
    if (profile?.is_public !== undefined) {
      setIsPublic(profile.is_public);
    }
  }, [profile?.is_public]);

  const handleToggleVisibility = async () => {
    if (!uniqueId) return;

    const newStatus = !isPublic;

    setUpdatingVisibility(true);
    setIsPublic(newStatus); 

    try {
      const res = await axiosPublic.put(`/public-profile/${uniqueId}/`, {
        is_public: newStatus,
      });

      const confirmedStatus = res.data.is_public;
      console.log("Confirmed status:", confirmedStatus);

      setIsPublic(confirmedStatus);
      setLocalProfile((prev: any) => ({
        ...prev,
        is_public: confirmedStatus,
      }));

      toast.success(`Profile is now ${confirmedStatus ? "public" : "private"}`);
    } catch (err) {
      setIsPublic(!newStatus); // Revert on failure
      toast.error("Something went wrong while updating your profile status.");
    } finally {
      setUpdatingVisibility(false);
    }
  };

  // const handleShare = () => {
  //   const publicUrl = `${window.location.origin}/profile/public/${profile?.unique_id}`;
  //   navigator.clipboard.writeText(publicUrl);
  //   toast.success("Profile link copied!");
  //   setShowShareModal(true);
  // };

  const handleShare = () => {
    const metaPreviewUrl = `${window.location.origin}/profile/public/${profile?.unique_id}`;
    navigator.clipboard.writeText(metaPreviewUrl);
    toast.success("Shareable profile link copied!");
    setShowShareModal(true);
  };

  console.log(uniqueId, "uniqueId");
  console.log(profile, "profile");
  console.log(userId, "userId in profile");

  const openSectionEditor = (section: "phone" | "education" | "career") => {
    setEditingSection(section);
  };

  const handleClick = () => {
    setOpenModal(true);
  };

  console.log(handleClick);

  const handleSave = async (formData: FormData) => {
    if (!userId) {
      console.error("Profile userId is missing ");
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
      <aside className="w-64 hidden md:block fixed top-0 left-0 h-screen mt-17 bg-gray-200 shadow-md p-5 overflow-y-auto z-30">
        {/* <div className="flex items-center space-x-2">
          <img src="/ex_edu_logo-03.png" alt="" className="p-2" />
        </div> */}
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
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onClick={handleToggleVisibility}
                    disabled={updatingVisibility}
                    className="sr-only peer"
                  />

                  <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                </div>
                <div className="flex items-center gap-2">
                  {isPublic ? (
                    <>
                      <GlobeAltIcon className="w-5 h-5 text-violet-600" />
                      <span className="font-medium text-gray-800 group-hover:text-violet-700 transition-colors">
                        Your profile is public
                      </span>
                    </>
                  ) : (
                    <>
                      <LockClosedIcon className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-sm text-gray-800 group-hover:text-violet-700 transition-colors">
                        Make profile public
                      </span>
                    </>
                  )}
                </div>
                {updatingVisibility && (
                  <svg
                    className="animate-spin ml-2 h-4 w-4 text-violet-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </label>

              {isPublic && (
                <button
                  onClick={handleShare}
                  className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-medium rounded-lg hover:from-violet-700 hover:to-violet-600 transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  <ShareIcon className="w-4 h-4" />
                  🔗 Share Profile
                </button>
              )}
            </div>

            {isPublic && (
              <p className="mt-3 text-sm text-gray-600 flex items-start gap-1.5">
                <InformationCircleIcon className="w-4 h-4 mt-0.5 text-violet-500 flex-shrink-0" />
                Your profile is visible to everyone. You can share the copied
                link .
              </p>
            )}
          </div>
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
                src={
                  profile?.profile_image
                    ? backendUrl + profile.profile_image
                    : "/man.png"
                }
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
                        onClick={() => setOpenImageModal(true)}
                      />
                      <button
                        onClick={() => setOpenImageModal(true)}
                        className="absolute top-2 right-2 px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-lg h-60 cursor-pointer hover:bg-gray-50 transition"
                      onClick={() => setOpenImageModal(true)}
                    >
                      <p className="text-gray-500">No Profile Image</p>
                      <button className="mt-2 px-4 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition">
                        Add Image
                      </button>
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
                    onClick={() => openSectionEditor("phone")}
                  >
                    <FaEdit
                      className="text-violet-500 cursor-pointer"
                      onClick={() =>
                        setEditingField({
                          fieldKey: "phone_number",
                          fieldName: "Phone Number",
                          value: profile?.phone_number || "",
                        })
                      }
                    />
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
                        <FaEdit
                          className="text-violet-500 cursor-pointer"
                          onClick={() => setOpenEducationModal(true)}
                        />
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
                        <FaEdit
                          className="text-violet-500 cursor-pointer"
                          onClick={() =>
                            setEditingField({
                              fieldKey: "career_objective",
                              fieldName: "Career Objective",
                              value: profile?.career_objective || "",
                            })
                          }
                        />
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
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full hover:opacity-90 transition-opacity shadow-sm"
                  >
                    <IoIosAddCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Add New</span>
                  </button>
                </div>

                {/* Certificates Grid */}
                {Array.isArray(certificate?.certificate) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificate.certificate.map((cert) => {
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
                    {certificate.certificate.length < 3 &&
                      Array.from({
                        length: 3 - certificate.certificate.length,
                      }).map((_, index) => (
                        <div
                          key={`empty-${index}`}
                          className="border-2 border-dashed border-gray-200 rounded-xl aspect-[4/3] flex flex-col items-center justify-center p-6 text-center"
                        >
                          <div className="w-12 h-12 bg-violet-50 rounded-full flex items-center justify-center mb-3">
                            <FiAward className="w-5 h-5 text-violet-400" />
                          </div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Add Certificate
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">
                            Upload your certification files
                          </p>
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
                onEdit={(fieldKey, fieldName, value) =>
                  setEditingField({ fieldKey, fieldName, value })
                }
              />
            </div>
          )}
        </div>
      </main>
      <div>
        {openEducationModal && profile && (
          <EducationEditModal
            isOpen={openEducationModal}
            onClose={() => setOpenEducationModal(false)}
            initialData={{
              secondary_school: profile.secondary_school,
              secondary_year: profile.secondary_year,
              university: profile.university,
              university_major: profile.university_major,
              university_year: profile.university_year,
            }}
            onSubmit={handleSave}
          />
        )}
      </div>
      <div>
        {editingField && (
          <SectionEditModal
            isOpen={!!editingField}
            onClose={() => setEditingField(null)}
            fieldName={editingField.fieldName}
            fieldKey={editingField.fieldKey}
            initialValue={editingField.value}
            onSubmit={handleSave}
          />
        )}
      </div>
      <div>
        {openImageModal && (
          <ImageEditModal
            isOpen={openImageModal}
            onClose={() => setOpenImageModal(false)}
            onSubmit={handleSave}
          />
        )}
      </div>
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Upload Certificate</h2>

            <div className="space-y-4">
              {/* Improved File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate File
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      JPG, PNG, PDF (MAX. 10MB)
                    </p>
                    {file && (
                      <p className="mt-2 text-sm text-gray-700">
                        Selected: {file.name}
                      </p>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Description Input */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  placeholder="Enter certificate description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>

              {/* Upload Button */}
              <button
                className="w-full bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={async () => {
                  if (!file || !description) {
                    toast.error(
                      "Please select a file and enter a description."
                    );
                    return;
                  }

                  const formData = new FormData();
                  formData.append("certificate_file", file);
                  formData.append("description", description);
                  formData.append("profile", profile?.unique_id!);

                  try {
                    await axiosInstance.post("/certificate/", formData, {
                      headers: { "Content-Type": "multipart/form-data" },
                    });
                    toast.success("Certificate added successfully");
                    setShowAddModal(false);
                    setFile(null);
                    setDescription("");
                    // Optional: Refresh certificate list
                    window.location.reload();
                  } catch (err) {
                    console.error(err);
                    toast.error("Failed to upload certificate");
                  }
                }}
                disabled={!file || !description}
              >
                Upload Certificate
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                onClick={() => setShowShareModal(false)}
              >
                &times;
              </button>
              <h2 className="text-lg font-semibold mb-4">Share your profile</h2>
              <div className="flex justify-center gap-4">
                <FacebookShareButton
                  url={`${window.location.origin}/profile/public/${profile?.unique_id}`}
                >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
                <WhatsappShareButton
                  url={`${window.location.origin}/profile/public/${profile?.unique_id}`}
                  title="Check out my profile on ExEdu!"
                >
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>
                <TwitterShareButton
                  url={`${window.location.origin}/profile/public/${profile?.unique_id}`}
                  title="Check out my profile on ExEdu!"
                >
                  <FaXTwitter size={30} />
                </TwitterShareButton>
                <TelegramShareButton
                  url={`${window.location.origin}/profile/public/${profile?.unique_id}`}
                  title="Check out my profile on ExEdu!"
                >
                  <TelegramIcon size={40} round />
                </TelegramShareButton>
                <LinkedinShareButton
                  url={`${window.location.origin}/profile/public/${profile?.unique_id}`}
                  title="Check out my profile on ExEdu!"
                >
                  <LinkedinIcon size={40} round />
                </LinkedinShareButton>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Link copied to clipboard
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
