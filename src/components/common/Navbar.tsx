import { useState, useEffect } from "react";
// import { FaUserCircle } from "react-icons/fa";
import { User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const close = () => setShowMobileMenu(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Courses", to: "/course" },
    { label: "Admission", to: "/admission" },
  ];

  const dropIn = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
    exit: { opacity: 0, y: -10 },
  };

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to={"/"}>
            <img src="/ex_edu_logo-03.png" alt="" className="h-12" />
          </Link>
        </div>

        {/* Center Nav Links - Desktop */}
        <ul className="hidden md:flex gap-8 text-gray-700 text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className="hover:text-blue-500 transition">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile Section */}
        <div
          className="relative group"
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <Link to={"/no-account"} onDoubleClick={handleDoubleClick}>
            <div className="hidden md:flex items-center text-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full border-2 px-4 py-1 shadow border-gray-300 font-medium text-white cursor-pointer">
              <User className="mr-2 w-5" />
              Profile
            </div>
          </Link>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg py-2 z-50"
              >
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Signup
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-4 text-blue-600 font-semibold text-sm border border-blue-600 px-3 py-1 rounded"
          onClick={() => setShowMobileMenu((prev) => !prev)}
        >
          Menu
        </button>
      </nav>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden flex flex-col gap-4 px-6 py-4 bg-white border-t border-gray-200 shadow-lg"
          >
            {navLinks.map((link, index) => (
              <motion.li
                custom={index}
                variants={dropIn}
                key={link.label}
                className="text-lg font-medium text-gray-700"
              >
                <Link
                  to={link.to}
                  onClick={() => setShowMobileMenu(false)}
                  className="block w-full"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
            <Link to={"/no-account"} onDoubleClick={handleDoubleClick}>
              <div className="flex md:hidden w-50 items-center text-center text-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full border-2 px-4 py-1 shadow border-gray-300 font-medium text-white cursor-pointer">
                <User className="mr-2 w-5" />
                Profile
              </div>
            </Link>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
