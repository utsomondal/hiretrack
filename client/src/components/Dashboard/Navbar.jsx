import { NavLink } from "react-router";
import { RxDashboard } from "react-icons/rx";
import { BsBriefcase } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: RxDashboard },
  { to: "/applications", label: "Applications", icon: BsBriefcase },
  { to: "/application/add", label: "Add New", icon: IoAddOutline },
];

const Navbar = () => {
  return (
    <nav className="flex flex-col gap-1 mt-4">
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          title={label}
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-all duration-200 ${
              isActive
                ? "bg-accent/10 text-accent border-l-2 border-accent pl-2.5"
                : "text-white/40 hover:text-white hover:bg-white/5 border-l-2 border-transparent pl-2.5"
            }`
          }
        >
          {icon && icon({ size: 16 })}
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
