import React, { useState } from "react";
import type { FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { ProfileModalProps } from "../api/types";
// import axiosInstance from "../api/axios";

const ProfileModal: React.FC<ProfileModalProps> = ({
  initialProfile,
  isOpen,
  onClose,
  onSubmit,
}) => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profileImage: null as File | null,
    name: "",
    email: "",
    phoneNumber: "",
    secondarySchool: "",
    secondaryYear: "",
    university: "",
    universityMajor: "",
    universityYear: "",
    careerObjective: "",
    skills: "",
    experience: "",
    interests: "",
  });

  const userId = localStorage.getItem("id");
  console.log(userId, "user id");
  const profile = initialProfile;
  console.log(profile, "profile");

  console.log(initialProfile?.unique_id, "profile unique id");


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone_number", formData.phoneNumber);
    data.append("secondary_school", formData.secondarySchool);
    data.append("secondary_year", formData.secondaryYear);
    data.append("university", formData.university);
    data.append("university_major", formData.universityMajor);
    data.append("university_year", formData.universityYear);
    data.append("career_objective", formData.careerObjective);
    data.append("skills", formData.skills);
    data.append("experience", formData.experience);
    data.append("interests", formData.interests);

    if (formData.profileImage) {
      data.append("profile_image", formData.profileImage);
    }

    onSubmit(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 pb-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
            >
              &times;
            </button>
          </div>
          <div className="border-b border-gray-200 mt-4"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-200">
                {formData.profileImage ? (
                  <img
                    src={URL.createObjectURL(formData.profileImage)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <label className="absolute -bottom-2 right-2 bg-white p-1.5 rounded-full shadow-md border border-gray-200 cursor-pointer group-hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  title="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <span className="text-xs text-gray-500">
              Click to upload new photo
            </span>
          </div>

          {/* Form Sections */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", name: "name" },
                  { label: "Email Address", name: "email", type: "email" },
                  { label: "Phone Number", name: "phoneNumber", type: "tel" },
                ].map(({ label, name, type = "text" }) => (
                  <div key={name} className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">
                      {label}
                    </label>
                    <input
                      title="name"
                      type={type}
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Education
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    label: "Secondary School",
                    name: "secondarySchool",
                    type: "text",
                  },
                  {
                    label: "Secondary Year",
                    name: "secondaryYear",
                    type: "number",
                    min: 1900,
                    max: new Date().getFullYear() + 5,
                  },
                  {
                    label: "University",
                    name: "university",
                    type: "text",
                  },
                  {
                    label: "University Major",
                    name: "universityMajor",
                    type: "text",
                  },
                  {
                    label: "University Year",
                    name: "universityYear",
                    type: "number",
                    min: 1900,
                    max: new Date().getFullYear() + 5,
                  },
                ].map(({ label, name, type, min, max }) => (
                  <div key={name} className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">
                      {label}
                    </label>
                    <input
                      title={name}
                      type={type}
                      name={name}
                      value={(formData as any)[name] || ""}
                      onChange={handleInputChange}
                      min={min}
                      max={max}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={
                        type === "number"
                          ? "YYYY"
                          : `Enter ${label.toLowerCase()}`
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Career & Skills */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Career & Skills
              </h3>
              {[
                { label: "Career Objective", name: "careerObjective" },
                { label: "Skills (comma separated)", name: "skills" },
                { label: "Work Experience", name: "experience" },
                { label: "Interests", name: "interests" },
              ].map(({ label, name }) => (
                <div key={name} className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    {label}
                  </label>
                  <textarea
                    title="name"
                    name={name}
                    value={(formData as any)[name]}
                    onChange={handleInputChange}
                    // required={name !== "experience"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
