import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaPinterest,
  FaLinkedin,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white relative z-[40]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-6">Quick Links</h2>

            <ul className="space-y-3 text-sm text-gray-300">
              <Link to="/">
                <li className="hover:text-white transition">Home</li>
              </Link>
              <Link to="/about">
                <li className="hover:text-white transition">About</li>
              </Link>
              <Link to="/course">
                <li className="hover:text-white transition">Courses</li>
              </Link>
              <Link to="/admission">
                <li className="hover:text-white transition">Admission</li>
              </Link>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-6">Contact</h2>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="border-l border-white/20 pl-4">
                {/* <p className="uppercase text-xs tracking-widest text-white/70 mb-3 font-semibold">
                  Head Office
                </p> */}

                <ul className="space-y-1 text-sm text-gray-300 leading-7">
                  <li>Room No: 20/884,</li>
                  <li>Opposite Bus Stand,</li>
                  <li>Ramanattukara, Kozhikode</li>
                  <li>Kerala : 673633</li>
                </ul>
              </div>

              <div className="border-l border-white/20 pl-4">
                {/* <p className="uppercase text-xs tracking-widest text-white/70 mb-3 font-semibold">
                  Branch Office
                </p> */}

                <ul className="space-y-1 text-sm text-gray-300 leading-7">
                  <li>Unit No: 9, Ground Floor,</li>
                  <li>KINFRA Advanced Technology Park,</li>
                  <li>Ramanattukara, Kozhikode</li>
                  <li>Kerala : 673631</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex gap-5 text-sm">
              <div className="text-gray-300">
                <span className="text-white font-medium">Email:</span>{" "}
                <a
                  href="mailto:exeduone@gmail.com"
                  className="hover:text-white transition"
                >
                  exeduone@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <FaWhatsapp className="text-green-400" />

                <a
                  href="https://wa.me/919072123466"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition"
                >
                  +91 9562123466
                </a>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <FaPhoneAlt className="text-blue-400" />

                <a
                  href="tel:+919652123466"
                  className="hover:text-blue-400 transition"
                >
                  +91 9072123466
                </a>
              </div>
            </div>
          </div>

          {/* Social + Logo */}
          <div className="flex justify-between flex-col lg:items-end gap-8">
            <img
              src="/ex_edu_logo-03.png"
              alt="logo"
              width={180}
              height={180}
              className="object-contain"
            />

            <div className="content-end">
              <h2 className="text-lg font-semibold mb-5">Follow Us</h2>

              <ul className="flex flex-wrap gap-5 text-gray-300">
                <Link
                  target="_blank"
                  to="https://www.instagram.com/exedu.in?igsh=bnFpeDk5b2tucWZq"
                >
                  <FaInstagram className="w-5 h-5 hover:text-pink-400 transition" />
                </Link>

                <Link
                  target="_blank"
                  to="https://www.facebook.com/profile.php?id=61573566939195"
                >
                  <FaFacebook className="w-5 h-5 hover:text-blue-400 transition" />
                </Link>

                <Link target="_blank" to="https://www.youtube.com/@Exeduai">
                  <FaYoutube className="w-5 h-5 hover:text-red-400 transition" />
                </Link>

                <Link target="_blank" to="https://x.com/Exedu_">
                  <FaXTwitter className="w-5 h-5 hover:text-white transition" />
                </Link>

                <Link
                  target="_blank"
                  to="https://www.linkedin.com/company/exedus/"
                >
                  <FaLinkedin className="w-5 h-5 hover:text-blue-500 transition" />
                </Link>

                <Link
                  target="_blank"
                  to="https://in.pinterest.com/exedu_/_profile/"
                >
                  <FaPinterest className="w-5 h-5 hover:text-red-500 transition" />
                </Link>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-10" />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-sm text-gray-300">
          <div>
            Our Parent Company is{" "}
            <a
              href="https://exmedia.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-white transition"
            >
              exmedia
            </a>
          </div>

          <div className="text-center space-y-2">
            <p>Copyright © 2025 exedu. All rights reserved.</p>

            <p>
              powered by{" "}
              <a
                href="https://extechnology.in"
                target="_blank"
                rel="noreferrer"
                className="font-semibold hover:text-white transition"
              >
                extechnology
              </a>
            </p>
          </div>

          <div className="flex gap-2">
            <Link to="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <span>|</span>

            <Link to="/terms" className="hover:text-white transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
