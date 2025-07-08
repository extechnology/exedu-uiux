import { FaLocationDot } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { useSectionImages } from "../hooks/useSectionImages";
import Loader from "../components/common/Loader";
import type { SectionImage } from "../api/types";
import axiosInstance from "../api/axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Admission() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    course: "",
    message: "",
  });

  const courseOptions = [
    "Full Stack Development",
    "Data Science",
    "Cybersecurity",
    "UI/UX Design",
    "Digital Marketing",
  ];

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const { sectionImages, loading, error } = useSectionImages();

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

    try {
      await axiosInstance.post("/contact/", formData);
      setSuccess("Form submitted successfully!");
      toast.success("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        number: "",
        course: "",
        message: "",
      });
    } catch (error: any) {
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

  const LeadingSolution: SectionImage | undefined = sectionImages.find(
    (img: SectionImage) => img.section === "contact"
  );

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  if (loading) return <Loader />;
  if (error) return <div>Error:</div>;
  return (
    <div className="max-w-7xl mx-auto  text-gray-700 pt-24 pb-16">
      <div className="text-center py-10  ">
        <img src="/ri_shining-2-fill.svg" alt="" />
        <h1
          className="md:text-7xl text-4xl font-bold "
          data-aos="fade-up"
          data-aos-duration="800"
        >
          Get in touch
        </h1>
        <p
          className=" md:text-2xl text-xl py-5 px-4 md:px-0"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          Reach out , and let's create a universe of possibilities together{" "}
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-0 text-white border border-gray-300 rounded-xl flex flex-col-reverse  space-y-5 md:space-y-0 md:flex-row">
        {/* Left Side - Contact Form */}
        <div
          className="w-full md:w-1/2 bg-gray-100 text-gray-700 p-10 mt-5 md:mt-0 rounded-xl md:rounded-l-xl md:rounded-r-none flex flex-col justify-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="absolute bottom-80 left-40 w-28 h-28 bg-purple-500 blur-3xl rounded-full opacity-20 z-10" />

          <h2
            className="md:text-4xl text-3xl font-bold tracking-wider mb-8"
            data-aos="fade-up"
            data-aos-duration="1100"
          >
            Let’s connect
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-full md:w-1/2">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-400 rounded-md"
                />
                {errors?.name && (
                  <p className="text-red-400 text-sm">{errors.name[0]}</p>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-400 rounded-md"
                />
                {errors?.email && (
                  <p className="text-red-400 text-sm">{errors.email[0]}</p>
                )}
              </div>
            </div>

            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
              type="tel"
              placeholder="Phone Number"
              className="w-full mb-4 px-4 py-3 border border-gray-400 rounded-md"
            />
            {errors?.number && (
              <p className="text-red-400 text-sm">{errors.number[0]}</p>
            )}

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              title="course"
              className="w-full mb-4 px-4 py-3 border text-gray-400 border-gray-400 rounded-md"
            >
              <option value="" disabled>
                -- Select Course --
              </option>
              {courseOptions.map((course) => (
                <option key={course} value={course} className="text-gray-700">
                  {course}
                </option>
              ))}
            </select>
            {errors?.course && (
              <p className="text-red-400 text-sm">{errors.course[0]}</p>
            )}

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full mb-6 px-4 py-3 h-28 resize-none border border-gray-400 rounded-md"
            />
            {errors?.message && (
              <p className="text-red-400 text-sm">{errors.message[0]}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-purple-600 py-3 rounded-md text-white font-semibold"
            >
              {submitting ? "Submitting..." : "Send it 🚀"}
            </button>

            {success && <p className="text-green-600 pt-4">{success}</p>}
            {errors?.general && (
              <p className="text-red-400 pt-4">{errors.general[0]}</p>
            )}
          </form>

          <div className="absolute -bottom-8 left-40 w-28 h-28 bg-purple-500 blur-3xl rounded-full opacity-20 z-10" />
        </div>

        {/* Right Side - Robot Image */}
        <div className="w-full md:w-1/2  md:rounded-r-xl md:rounded-l-none rounded-xl flex items-center justify-center">
          {/* <div className="absolute bottom-90 right-40 w-28 h-28 bg-purple-500 blur-3xl rounded-full opacity-30 z-1" /> */}

          <img
            src={BACKEND_URL + LeadingSolution?.image}
            alt="Robot"
            className="max-w-full object-contain md:rounded-r-xl md:rounded-l-none rounded-xl"
            data-aos="fade-up"
            data-aos-duration="1000"
          />
        </div>
      </div>
      <div className="md:pt-18 pt-10">
        <h1 className="text-center text-3xl font-semibold pb-7">Contact Us</h1>
        <p className="text-center px-6 md:px-0 ">
          Questions,Comments,Suggestions? Simply fill in the form and we'll be
          in touch shortly
        </p>
        <div className="flex items-center font-bold justify-center pt-7">
          <ul className="flex flex-col gap-2">
            <li className="flex items-start gap-2 text-left ">
              <FaLocationDot className="relative top-1 text-fuchsia-600" />
              Room No: 20/884, <br /> Opp. Bus Stand, <br /> Ramanattukara{" "}
              <br />
              Kozhikode, <br /> Kerala 673633
            </li>
            <li className="flex items-start gap-2 text-left">
              <FiPhoneCall className="relative top-1 text-fuchsia-600" />
              9072123466
            </li>
            <li className="flex items-start gap-2 text-left">
              <IoIosMail className="relative top-1 text-fuchsia-600" />
              exeduone@gmail.com
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
