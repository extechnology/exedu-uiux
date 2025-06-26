import { SlUser } from "react-icons/sl";
import { FaGraduationCap } from "react-icons/fa6";
import { IoMdCopy } from "react-icons/io";
import { LiaCertificateSolid } from "react-icons/lia";
import ProfileModal from "./ProfileForm";
import { useState } from "react";

const NoAccount = () => {

  const [showModal, setShowModal] = useState(false);
  const handleProfileCick = () => {
    setShowModal(true);
  }


  return (
    <div className="py-20 max-w-7xl mx-auto">
      <div className="flex gap-8">
        <img src="/ri_shining-2-fill.svg" alt="" className="w-16" />
        <div className="pt-5">
          <h1 className="text-3xl font-bold">Welcome to Eduportal </h1>
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
        <p className="pt-6 text-center w-1/3 mx-auto">
          Create an Account to access your personalized dashboard with all your
          educational information in one place
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-8 border-2 border-fuchsia-400 rounded-2xl shadow-lg shadow-fuchsia-300 space-y-4 hover:shadow-md hover:shadow-fuchsia-500 duration-300 transition-all hover:scale-105">
          <FaGraduationCap className="w-10 h-10  text-fuchsia-700 hover:-translate-x-2 duration-300 transition-all  " />
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
        <button
          onClick={handleProfileCick}
          className="w-80 py-3 bg-gradient-to-r font-bold from-fuchsia-500 to-violet-600 text-white rounded-full hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-500 transition-all duration-300"
        >
          Create your Account
        </button>
      </div>
      {showModal && (
        <ProfileModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={(formData: FormData) => console.log(formData)}
          userId={null}
        />
      )}
    </div>
  );
};
export default NoAccount;
