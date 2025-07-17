import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="bg-gradient-to-r relative z-[40] from-slate-800 to-slate-900 text-white pt-10 pb-5 shadow-t-2xl">
      <div className="grid grid-cols-1 md:grid-cols-4 max-w-7xl mx-auto px-5 space-y-8 md:space-y-0">
        <div>
          <h1 className="font-medium text-xl">Quick Links</h1>
          <ul className="space-y-2 text-sm pt-4">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/about"}>
              <li>About</li>
            </Link>
            <Link to={"/course"}>
              <li>Courses</li>
            </Link>
            <Link to={"/admission"}>
              <li>Admission</li>
            </Link>
          </ul>
        </div>
        <div>
          <h1 className="font-medium text-xl">Contact</h1>
          <ul className="space-y-2 pt-4 text-sm">
            <li>Room No: 20/884,</li>
            <li>Opposite Bus Stand,</li>
            <li>Ramanattukara, Kozhikode</li>
            <li>Kerala 673633 </li>
            <li>Ph: +91 9072123466</li>
            <li>Email : exeduone@gmail.in</li>
          </ul>
        </div>
        <div>
          <h1 className="font-medium text-xl">Follow Us</h1>
          <ul className="flex space-x-5 pt-4">
            <li>
              <Link
                target="_blank"
                to="https://www.instagram.com/exedu.in?igsh=bnFpeDk5b2tucWZq"
              >
                <FaInstagram className="w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://www.facebook.com/profile.php?id=61573566939195"
              >
                <FaFacebook className="w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://www.youtube.com/@Exeduai">
                <FaYoutube className="w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://x.com/Exedu_">
                <FaXTwitter className="w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://www.linkedin.com/company/exedus/"
              >
                <FaLinkedin className="w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://in.pinterest.com/exedu_/_profile/"
              >
                <FaPinterest className="w-6 h-6" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-col justify-center space-y-8">
          <div className="flex md:justify-end">
            <img
              src="/ex_edu_logo-03.png"
              alt="logo"
              width={200}
              height={200}
              className=""
            />
          </div>
        </div>
      </div>
      <hr className=" mt-10 text-slate-700 border-[1px]" />
      <div className=" max-w-7xl mx-auto px-5 pt-5">
        <div className="grid grid-cols-1 md:grid-cols-3 space-y-4 md:space-y-0">
          <div className="">
            {/* <img src="/EX_TECHNOLOGY_LOGO-01.png" alt="" height={70} width={70} /> */}
            <p className="text-sm font-light text-gray-300">
              Our Parent Company is{" "}
              <span className="font-bold pl-1">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://exmedia.in/"
                >
                  exmedia
                </a>
              </span>
            </p>
          </div>
          <div className="relative  md:justify-center">
            <p
              className="cursor-pointer md:text-center hover:text-gray-200 transition-all text-sm text-gray-300 font-light"
              onMouseEnter={() => setShowPopup(true)}
              onMouseLeave={() => setShowPopup(false)}
            >
              Copyright &copy; 2025 exedu. All rights reserved.
            </p>
            <p className="text-sm md:text-center font-light text-gray-300">
              powered by{" "}
              <a href="https://extechnology.in" target="_blank" rel="noreferrer noopener">
                <span className="font-bold pl-1">extechnology</span>
              </a>
            </p>

            <AnimatePresence>
              {showPopup && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-[90vw] max-w-lg p-4 bg-white/90 backdrop-blur-lg shadow-lg rounded-lg border border-gray-300 text-gray-800 text-sm z-50"
                >
                  <p>
                    Our content, as found within our website (
                    <a
                      href="https://www.exedu.in"
                      className="text-blue-500 underline"
                    >
                      www.exedu.in
                    </a>
                    ), is owned by or licensed to us. This includes, but is not
                    limited to, the design, layout, images, and graphics,
                    protected under The Copyright Act 1957. Copying,
                    redistribution, or reproduction is strictly prohibited. Your
                    use of our website does not grant ownership rights to our
                    content.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex md:justify-end text-sm font-light gap-1 text-gray-300">
            <div>
              <Link to={"/privacy"}>Privacy Policy |</Link>
            </div>
            <div>
              <Link to={"/terms"}>Terms & Conditions </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
