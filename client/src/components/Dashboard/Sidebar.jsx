import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { logoutUser } from "../../api/auth";
import { IoIosClose } from "react-icons/io";
import Logo from "../Logo";
import Avatar from "./Avatar";
import Navbar from "./Navbar";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");

    try {
      await logoutUser();
      logout();

      toast.success("Logged out successfully", { id: toastId });

      navigate("/", { replace: true });
    } catch {
      toast.error("Logout failed", { id: toastId });
    }
  };

  useEffect(() => {
    // Close sidebar on route change (mobile)
    setIsOpen(false);
  }, [location, setIsOpen]);

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static z-50 top-0 left-0 h-screen w-64 bg-dark-600 text-white p-4 flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo + Close */}
        <div className="flex items-center justify-between border-b border-dark-500 pb-4">
          <Logo />
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <IoIosClose size={24} color="white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1">
          {/* top */}
          <Navbar />

          {/* bottom */}
          <div title="Profile Section">
            <div className="flex items-center gap-3 mb-4 border-t border-dark-500 pt-4">
              <Avatar name={user?.name || "User"} />

              <div className="flex flex-col">
                <span className="font-medium">{user?.name || "User"}</span>
                <span className="text-[0.8rem] text-white/60">
                  {user?.email || "user@example.com"}
                </span>
              </div>
            </div>

            <button
              title="Logout HireTrack"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 py-2 px-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors duration-150"
            >
              <IoLogOutOutline size={19} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
