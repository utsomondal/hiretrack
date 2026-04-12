import { FiTrash2 } from "react-icons/fi";

const DeleteModal = ({ isOpen, onClose, onConfirm, company, role }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-dark-800 border border-white/8 rounded-2xl p-6 w-full max-w-sm mx-4 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-11 h-11 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <FiTrash2 size={18} className="text-red-400" />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-white text-base font-semibold">
            Delete application?
          </h2>
          <p className="text-gray-400 text-sm">
            This will permanently remove{" "}
            <span className="text-white/70">{role}</span> at{" "}
            <span className="text-white/70">{company}</span>. This action cannot
            be undone.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-white/8 text-gray-400 text-sm hover:text-white hover:border-white/20 transition-colors duration-150"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-colors duration-150"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
