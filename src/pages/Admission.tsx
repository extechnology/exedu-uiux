import { FaLocationDot } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";

export default function Admission() {
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

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full md:w-1/2 px-4 py-3 bg-[var(--quaternary-bg-color)] border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              data-aos="fade-up"
              data-aos-duration="1200"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full md:w-1/2 px-4 py-3 bg-[var(--quaternary-bg-color)] border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              data-aos="fade-up"
              data-aos-duration="1200"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 bg-[var(--quaternary-bg-color)] border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            data-aos="fade-up"
            data-aos-duration="1300"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full mb-4 px-4 py-3 bg-[var(--quaternary-bg-color)] border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            data-aos="fade-up"
            data-aos-duration="1400"
          />

          <textarea
            placeholder="Message"
            className="w-full mb-6 px-4 py-3 h-28 resize-none bg-[var(--quaternary-bg-color)] border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            data-aos="fade-up"
            data-aos-duration="1500"
          ></textarea>

          <button
            data-aos="zoom-in-up"
            data-aos-duration="1000"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 py-3 rounded-md text-white font-semibold tracking-wide flex items-center justify-center gap-2 hover:brightness-110 transition-all"
          >
            Send it
            <span className="inline-block animate-bounce">🚀</span>
          </button>
          <div className="absolute -bottom-8 left-40 w-28 h-28 bg-purple-500 blur-3xl rounded-full opacity-20 z-10" />
        </div>

        {/* Right Side - Robot Image */}
        <div className="w-full md:w-1/2  md:rounded-r-xl md:rounded-l-none rounded-xl flex items-center justify-center">
          {/* <div className="absolute bottom-90 right-40 w-28 h-28 bg-purple-500 blur-3xl rounded-full opacity-30 z-1" /> */}

          <img
            src="https://img.freepik.com/free-photo/front-view-woman-working-desk-while-wearing-headset-looking-laptop_23-2148434727.jpg?uid=R160032739&ga=GA1.1.1208105082.1712396076&semt=ais_hybrid&w=740"
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
              exeduone@gmail.in
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
