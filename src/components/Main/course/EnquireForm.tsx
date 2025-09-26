import React from "react";
import { useState, useEffect } from "react";
import type { CourseProps } from "../../../api/types";
import axiosInstance from "../../../api/axios";
import toast from "react-hot-toast";
import useSinglePage from "../../../hooks/useSinglePage";
import { Loader } from "lucide-react";

const EnquireForm: React.FC<CourseProps> = ({ course }) => {
  const { singlePage, loading, error } = useSinglePage();
  const detail = Array.isArray(singlePage)
    ? singlePage.find((item) => item.title === course)
    : null;
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    title: "",
  });

  useEffect(() => {
    if (detail?.title) {
      setFormData((prev) => ({
        ...prev,
        title: detail.title,
      }));
    }
  }, [detail]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setErrors(null);

    // Make sure title is set
    const dataToSubmit = {
      ...formData,
      title: formData.title || detail?.title || course || "",
    };

    console.log("Data being submitted:", dataToSubmit);

    try {
      await axiosInstance.post("/enroll-form/", dataToSubmit);
      setSuccess("Form submitted successfully!");
      toast.success("Form submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        title: detail?.title || "",
      });
    } catch (error: any) {
      console.log("Error:", error);
      console.log("Error response:", error.response?.data);

      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: ["Something went wrong. Try again."] });
        toast.error("Something went wrong. Try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto md:px-8 px-5 mt-28 grid grid-cols-1 md:grid-cols-2 mb-8  items-center text-gray-800 shadow-lg shadow-fuchsia-200">
      {/* Left Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold pt-6">
          {detail?.title
            .split("_")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          Join our course and enhance your skills with{" "}
          <span className="text-purple-600 font-medium">expert guidance</span>.
        </p>
        <img
          src="/EnquireForm.jpg"
          alt="enquireForm"
          className="w-full md:w-3/5 mx-auto"
        />
      </div>

      {/* Right Section - Form */}
      <div className="bg-white shadow-md rounded-md md:p-8 p-4 w-full max-w-md mx-auto mb-10 md:mb-0">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            title="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          {errors?.name && (
            <p className="text-red-400 text-sm">{errors.name[0]}</p>
          )}

          <label htmlFor="email">Email</label>
          <input
            name="email"
            title="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          {errors?.email && (
            <p className="text-red-400 text-sm">{errors.email[0]}</p>
          )}

          <label htmlFor="Phone">Phone</label>
          <input
            name="phone"
            title="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          {errors?.phone && (
            <p className="text-red-400 text-sm">{errors.phone[0]}</p>
          )}

          {/* Hidden title field for debugging */}
          <input
            name="title"
            type="hidden"
            value={formData.title || detail?.title || course || ""}
            onChange={handleChange}
          />

          {/* Debug info */}
          {/* <div className="text-xs text-gray-500">
            Title: {formData.title || detail?.title || course || "NOT SET"}
          </div> */}

          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-2 px-6 rounded-md w-fit"
            type="submit"
            disabled={
              !formData.name || !formData.email || !formData.phone || submitting
            }
          >
            {submitting ? "Submitting..." : "Enroll Now"}
          </button>

          {success && <p className="text-green-600 pt-4">{success}</p>}
          {errors?.general && (
            <p className="text-red-400 pt-4">{errors.general[0]}</p>
          )}

          {/* Show all errors for debugging */}
          {errors && (
            <div className="text-xs text-red-500">
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </div>
          )}
        </form>
        <div className="flex justify-between items-center mt-6 text-sm text-gray-700">
          <a
            href="https://wa.me/919072123466"
            target="_blank"
            rel="noreferrer noopener"
          >
            <button className="hover:underline">
              Chat with course counselor
            </button>
          </a>
          <button className="hover:underline">Download Brochure</button>
        </div>
      </div>
    </div>
  );
};

export default EnquireForm;
