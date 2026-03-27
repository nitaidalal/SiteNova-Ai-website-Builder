import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { toggleTheme } from "../redux/themeSlice";
import { logoutUser } from "../redux/userSlice";
import api from "../lib/api";


const Navbar = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const credits = user?.credits ?? 0;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isCreditsDropdownOpen, setIsCreditsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
        setIsCreditsDropdownOpen(false);
      }
    };
    console.log(user);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
      dispatch(logoutUser());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to logout");
    }
  };


  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-x-0 top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur"
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div
            onClick={() => navigate("/")}
            className="group flex cursor-pointer items-center gap-3"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border bg-bg">
              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-primary">
                SN
              </div>
            </div>

            <div>
              <h1 className="text-lg font-bold text-text-primary">
                SiteNova.ai
              </h1>
              <p className="hidden text-xs text-text-secondary sm:block">
                Your AI Website Builder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3" ref={dropdownRef}>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="cursor-pointer rounded-xl border border-border p-2 transition bg-bg hover:border-primary"
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <FiSun className="h-5 w-5" />
              ) : (
                <FiMoon className="h-5 w-5" />
              )}
            </button>

            {user ? (
              <>
                <div
                  className="relative hidden sm:block"
                  title="Your total credits"
                >
                  <button
                    onClick={() => {
                      setIsCreditsDropdownOpen(!isCreditsDropdownOpen);
                      setIsProfileDropdownOpen(false);
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-border  px-3 py-1.5 text-sm transition bg-bg hover:border-primary"
                  >
                    <span>💎</span>
                    <span className="font-semibold text-text-primary">
                      {credits}
                    </span>
                    <FaPlusCircle className="text-primary" />
                  </button>

                  {isCreditsDropdownOpen && (
                    <div className="absolute right-0 z-50 mt-3 w-56 rounded-2xl border border-border bg-surface p-4 shadow-lg">
                      <p className="text-sm font-semibold text-text-primary">
                        You have <span className="text-primary">{credits}</span>{" "}
                        credits
                      </p>
                      <p className="mt-1 text-xs text-text-secondary">
                        Use credits to generate AI websites faster.
                      </p>
                      <button
                        onClick={() => navigate("/pricing")}
                        className="mt-3 w-full cursor-pointer rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
                      >
                        Buy More Credits
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative" title="Profile">
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(!isProfileDropdownOpen);
                      setIsCreditsDropdownOpen(false);
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-bg px-2 py-1.5 transition hover:border-primary"
                  >
                    <div className="h-8 w-8 overflow-hidden rounded-full border border-border">
                      {user?.avatar ? (
                        <img
                          src={user?.avatar}
                          alt={user?.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary/20 text-sm font-bold text-primary">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      )}
                    </div>
                    <span className="hidden text-sm font-medium text-text-primary sm:block">
                      {user?.name || "User"}
                    </span>
                    <svg
                      className={`h-4 w-4 text-text-secondary transition-transform ${
                        isProfileDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
                      <div className="border-b border-border p-4">
                        <p className="text-sm font-semibold text-text-primary">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>

                      <div className="p-2 ">
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            navigate("/pricing");
                          }}
                          className=" flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-text-primary transition hover:bg-primary/20"
                          title="Buy more credits"
                        >
                          <span>💎</span>
                          Buy Credits
                        </button>
                          <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            navigate("/dashboard");
                          }}
                          className=" flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-text-primary transition hover:bg-primary/20"
                          title="Go to your dashboard"
                        >
                          <span>📊</span>
                          Dashboard
                        </button>
                        <button
                          title="Logout"
                          onClick={handleLogout}
                          className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-red-500 transition hover:bg-red-500/20"
                        >
                          <FiLogOut />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="cursor-pointer rounded-xl border border-border px-3 py-1.5 text-sm font-medium transition hover:bg-bg"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </motion.nav>
      {showLoginModal && (
        <LoginModal
          open={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
