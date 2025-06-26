import React, { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Certificate {
  file: File | null;
  description: string;
}

interface FormDataState {
  profileImage: File | null;
  name: string;
  email: string;
  phoneNumber: string;
  secondarySchool: string;
  secondaryYear: string;
  university: string;
  universityMajor: string;
  universityYear: string;
  careerObjective: string;
  certificates: Certificate[];
  skills: string;
  experience: string;
  interests: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  userId: string | null; // Pass userId as prop instead of Clerk
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userId,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataState>({
    profileImage: null,
    name: "",
    email: "",
    phoneNumber: "",
    secondarySchool: "",
    secondaryYear: "",
    university: "",
    universityMajor: "",
    universityYear: "",
    careerObjective: "",
    certificates: [{ file: null, description: "" }],
    skills: "",
    experience: "",
    interests: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (name === "certificateDescription" && index !== undefined) {
      const updatedCertificates = [...formData.certificates];
      updatedCertificates[index].description = value;
      setFormData((prev) => ({ ...prev, certificates: updatedCertificates }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (index !== undefined) {
        const updatedCertificates = [...formData.certificates];
        updatedCertificates[index].file = file;
        setFormData((prev) => ({ ...prev, certificates: updatedCertificates }));
      } else {
        setFormData((prev) => ({ ...prev, profileImage: file }));
      }
    }
  };

  const addCertificate = () => {
    setFormData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, { file: null, description: "" }],
    }));
  };

  const removeCertificate = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("phone_number", formData.phoneNumber);
    data.append("name", formData.name);
    data.append("email", formData.email);
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

    try {
      const profileResponse = await fetch(
        `https://server.exedu.in/api/profiles/`,
        {
          method: "POST",
          body: data,
          credentials: "include",
          headers: {
            "Clerk-User-ID": userId || "",
          },
        }
      );

      if (!profileResponse.ok) throw new Error("Failed to create profile");

      const profileResult = await profileResponse.json();
      const profileId = profileResult.id;
      localStorage.setItem("profileId", String(profileId));
      navigate(`/profile/${profileId}`);

      for (const certificate of formData.certificates) {
        if (certificate.file) {
          const certData = new FormData();
          certData.append("profile", profileId);
          certData.append("file", certificate.file);
          certData.append("description", certificate.description);
          await fetch(`https://server.exedu.in/api/certificates/`, {
            method: "POST",
            body: certData,
            credentials: "include",
          });
        }
      }

      toast.success("Profile created successfully!", { position: "top-right" });
      onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to create profile. Please try again.", {
        position: "top-right",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl mx-4 sm:mx-0 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-600">
            Profile Information
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col py-4 items-center justify-center text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                {formData.profileImage ? (
                  <img
                    src={URL.createObjectURL(formData.profileImage)}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-2xl">📷</span>
                )}
              </div>
              <label className="cursor-pointer bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition text-sm">
                Upload your profile image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </label>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Information
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                required
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Secondary Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Education
            </label>
            <input
              required
              type="text"
              name="secondarySchool"
              value={formData.secondarySchool}
              onChange={handleInputChange}
              placeholder="Enter your secondary school name"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passing Year
            </label>
            <input
              required
              type="text"
              name="secondaryYear"
              value={formData.secondaryYear}
              onChange={handleInputChange}
              placeholder="e.g. 2015"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Graduation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Graduation
            </label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              placeholder="Enter your college or university name"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stream
            </label>
            <input
              type="text"
              name="universityMajor"
              value={formData.universityMajor}
              onChange={handleInputChange}
              placeholder="e.g. Computer Science, Engineering"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year of Graduation
            </label>
            <input
              type="text"
              name="universityYear"
              value={formData.universityYear}
              onChange={handleInputChange}
              placeholder="e.g. 2019"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Career Objective */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Career Objective
            </label>
            <textarea
              required
              name="careerObjective"
              value={formData.careerObjective}
              onChange={handleInputChange}
              placeholder="Describe your career goals and aspirations..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Certificates (Updated) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certificates
            </label>
            {formData.certificates.map((certificate, index) => (
              <div
                key={index}
                className="mb-4 p-4 border rounded-md bg-gray-50 relative"
              >
                {/* Certificate File Upload */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Certificate File {index + 1}
                  </label>
                  <label className="cursor-pointer bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition text-sm">
                    {certificate.file
                      ? certificate.file.name
                      : "Upload Certificate"}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(e, index)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Certificate Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Description
                  </label>
                  <textarea
                    name="certificateDescription"
                    value={certificate.description}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Describe this certificate (e.g., title, issuer, date)..."
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                </div>

                {/* Remove Certificate Button */}
                {formData.certificates.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCertificate(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCertificate}
              className="mt-2 text-pink-600 hover:text-pink-800"
            >
              + Add Another Certificate
            </button>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="List your key skills..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience
            </label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Describe your work experience..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interests
            </label>
            <textarea
              name="interests"
              value={formData.interests}
              onChange={handleInputChange}
              placeholder="Share your interests, hobbies..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
