import { Link } from "react-router";
import { IoMdAdd } from "react-icons/io";

const ApplicationsHeader = ({ count = 0 }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {/* LEFT */}
      <div>
        <h1 className="text-white text-2xl font-semibold tracking-tight">
          Applications
        </h1>

        <p className="text-dark-500 text-sm mt-1 font-medium">
          {count} {count === 1 ? "application" : "applications"} tracked
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* COUNT CARD */}
        <div className="flex items-center gap-2 bg-dark-800/70 border border-white/10 rounded-lg px-4 py-2">
          <p className="text-accent font-semibold leading-none">
            {count}
          </p>
          <p className="text-dark-500 text-sm font-medium">Total</p>
        </div>

        {/* ADD BUTTON */}
        <Link
        title="Add New Application"
          to="/application/add"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-medium hover:bg-accent/20 transition"
        >
          <IoMdAdd size={16} />
          Add New
        </Link>
      </div>
    </div>
  );
};

export default ApplicationsHeader;
