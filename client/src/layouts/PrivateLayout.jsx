import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { IoIosMenu } from "react-icons/io";
import Sidebar from "../components/Dashboard/Sidebar";

const PrivateLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-dark-900">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Topbar */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-dark-500">
          <button onClick={() => setIsOpen(true)}>
            <IoIosMenu size={24} color="white"/>
          </button>
          <span className="text-white font-semibold capitalize text-sm">
            {location.pathname === "/" ? "Dashboard" : location.pathname.slice(1)}
          </span>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
