import { statusColors } from "./statusConfig";
import { FiArrowUpRight, FiEdit2, FiTrash2 } from "react-icons/fi";

const ApplicationRow = ({ application, onConfirmDelete }) => {
  const { company, role, salary, status, dateApplied, isRemote, jobUrl } =
    application;

  return (
    <>
      <tr className="border-b border-white/4 hover:bg-dark-800/50 transition-colors duration-150 group">
        <td className="py-4 px-5">
          <span className="text-white/85 text-sm font-medium truncate">
            {company}
          </span>
        </td>

        <td className="py-4 px-5 text-white/60 text-sm">{role}</td>

        <td className="py-4 px-5">
          <span
            className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
              statusColors[status] ?? "bg-white/5 text-white/30 border-white/10"
            }`}
          >
            {status}
          </span>
        </td>

        <td className="py-4 px-5">
          <span className="text-sm text-white/60">
            {new Date(dateApplied).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </td>

        <td className="py-4 px-5">
          <span className="text-sm text-white/60">{salary || "—"}</span>
        </td>

        <td className="py-4 px-5">
          <span
            className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
              isRemote
                ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                : "bg-white/5 text-white/30 border-white/10"
            }`}
          >
            {isRemote ? "Remote" : "On-site"}
          </span>
        </td>

        <td className="py-4 px-5">
          {jobUrl ? (
            <a
              href={jobUrl}
              target="_blank"
              rel="noreferrer"
              title="Open job posting"
              className="inline-flex items-center gap-1 text-[12px] text-white/60 hover:text-accent border border-white/6 hover:border-accent/20 hover:bg-accent/5 px-2.5 py-1 rounded-md transition-colors duration-150"
            >
              <span>View Job</span>
              <FiArrowUpRight size={12} />
            </a>
          ) : (
            <span className="text-xs text-white/20">—</span>
          )}
        </td>
        
        <td className="py-4 px-5">
          <div className="flex items-center gap-2 transition-opacity duration-150">
            <button
              title="Edit application"
              className="p-1.5 rounded-md text-white/60 hover:text-amber-400 hover:bg-amber-400/10 transition-colors duration-150"
            >
              <FiEdit2 size={16} />
            </button>

            <button
              onClick={onConfirmDelete}
              title="Delete application"
              className="p-1.5 rounded-md text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-colors duration-150"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ApplicationRow;
