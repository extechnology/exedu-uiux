import { useRef } from "react";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidFoodMenu } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";
import { Bell } from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false); // Controls mobile dropdown
  const [showProfileMenu, setShowProfileMenu] = useState(false); // Controls profile dropdown
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Auth status state
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicPage = location.pathname.startsWith("/profile/public/"); // ✅ Detect if current route is a public profile

  const mobileMenuRef = useRef<HTMLUListElement | null>(null);

  const { notifications } = useNotifications();

  const studentNotifications = notifications.filter(
    (note) => note.type === "SESSION" || note.type === "REQUEST"
  );

  const unreadCount = studentNotifications.filter((n) => !n.is_read).length;

  const id = localStorage.getItem("id");

  useEffect(() => {
    const checkAuth = async () => {
      if (!isPublicPage) {
        const token = localStorage.getItem("accessToken");
        if (token) {
          try {
            await axiosInstance.get("/auth/validate-token/");
            setIsLoggedIn(true);
          } catch {
            // Token is invalid or expired
            localStorage.clear();
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } else {
        // For public page, never consider user as logged in
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [location]);

  // 👆 Handle outside click to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileMenu]);

  // 📱 Close mobile menu on screen resize
  useEffect(() => {
    const close = () => setShowMobileMenu(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  // 🔓 Handle logout: clear all auth data
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    navigate("/login");
  };

  const handleProfileClick = async () => {
    setShowMobileMenu(false);

    if (!isLoggedIn || !id) {
      navigate("/no-account");
      return;
    }

    try {
      const response = await axiosInstance.get(`/profile/user/${id}/`);
      const profile = response.data;

      if (profile.can_access_profile) {
        navigate(`/profile/${id}`);
      } else {
        navigate("/no-account");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error fetching profile.");
      navigate("/not-found");
    }
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Courses", to: "/course" },
    { label: "Admission", to: "/admission" },
  ];

  // 💫 Animation settings
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
        <div className="flex items-center gap-5 content-center">
          <Link to={"/notifications"} className="">
            <button className="relative pt-2">
              <div className="relative ">
                <Bell className="w-5 h-5  text-gray-500 cursor-pointer" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </div>
            </button>
          </Link>
          <div className="h-6 w-px bg-gray-300" />
          <div
            className="relative group"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <div
              onClick={handleProfileClick}
              className="hidden md:flex items-center text-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full border-2 px-4 py-1 shadow border-gray-300 font-medium text-white cursor-pointer"
            >
              <User className="mr-2 w-5" />
              Profile
            </div>

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
                        to="/register"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Signup
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={() => handleLogout()}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          title="Menu"
          className="md:hidden  text-violet-600 font-semibold text-lg  px-3 py-1 "
          onClick={() => setShowMobileMenu((prev) => !prev)}
        >
          <BiSolidFoodMenu className="w-[30px] h-[30px]" />
        </button>
      </nav>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.ul
            ref={mobileMenuRef}
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
            <motion.li
              custom={navLinks.length}
              variants={dropIn}
              className="text-lg font-medium text-gray-700"
            >
              <div
                onClick={handleProfileClick}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full px-4 py-2 cursor-pointer shadow-md"
              >
                <User className="w-5 h-5" />
                Profile
              </div>
            </motion.li>

            {/* Auth Buttons */}
            <motion.li
              custom={navLinks.length + 1}
              variants={dropIn}
              className="text-lg font-medium text-gray-700"
            >
              {!isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setShowMobileMenu(false)}
                    className="block w-full text-center text-blue-600 border border-blue-600 rounded-full px-4 py-2 hover:bg-blue-50 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setShowMobileMenu(false)}
                    className="block w-full text-center text-green-600 border border-green-600 rounded-full px-4 py-2 hover:bg-green-50 transition"
                  >
                    Signup
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    handleLogout();
                  }}
                  className="block w-full text-center text-red-500 border border-red-500 rounded-full px-4 py-2 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              )}
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
