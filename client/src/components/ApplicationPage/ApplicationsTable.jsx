import { useState } from "react";
import ApplicationRow from "./ApplicationRow";
import DeleteModal from "./DeleteModal";
import { useQueryClient } from "@tanstack/react-query";
import { deleteApplication } from "../../api/application";
import toast from "react-hot-toast";

const cols = [
  "Company",
  "Role",
  "Status",
  "Date Applied",
  "Salary",
  "Type",
  "Job Link",
  "Actions",
];

const ApplicationsTable = ({ applications }) => {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const queryClient = useQueryClient();

  const handleConfirmDelete = async () => {
    try {
      if (!deleteTarget?._id) return;

      await deleteApplication(deleteTarget._id);
      queryClient.invalidateQueries({ queryKey: ["applications"] });

      setDeleteTarget(null);

      toast.success("Application deleted successfully");
    } catch {
      toast.error("Failed to delete application");
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-white/6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/6">
            {cols.map((col) => (
              <th
                key={col}
                className="py-3 px-5 text-left text-[12px] font-medium text-gray-500 tracking-widest uppercase"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <ApplicationRow
              key={app._id}
              application={app}
              onConfirmDelete={() => setDeleteTarget(app)}
            />
          ))}
        </tbody>
      </table>
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        company={deleteTarget?.company}
        role={deleteTarget?.role}
      />
    </div>
  );
};

export default ApplicationsTable;
