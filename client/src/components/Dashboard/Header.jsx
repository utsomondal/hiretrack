import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import useGreetings from "../../hooks/useGreetings";

const Header = () => {
  const { greeting, subtext, icon: Icon, cta } = useGreetings();
  const { user } = useAuth();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-accent">{Icon && <Icon size={20} />}</div>
        <div>
          <p className="text-xl sm:text-2xl font-semibold text-white leading-tight">
            {greeting}{" "}
            <span className="text-accent">{user?.name || "there"}</span> 👋
          </p>
          <p className="text-sm text-dark-500 mt-1">{subtext}</p>
        </div>
      </div>
      <div className="flex justify-start sm:justify-end">
        <Link
          to="/application/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-black text-sm font-semibold 
          hover:bg-accent/90 transition-all duration-150 
          hover:-translate-y-px"
        >
          <IoMdAdd size={16} />
          {cta}
        </Link>
      </div>
    </div>
  );
};

export default Header;
