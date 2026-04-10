import { useForm } from "react-hook-form";
import { useWorkspace } from "../hooks/useWorkspace";
import {
  FiBriefcase,
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiLink,
} from "react-icons/fi";
import { useNavigate } from "react-router";

const AddApplication = () => {
  const navigate = useNavigate();
  const { mode, setMode, setRealJobs } = useWorkspace();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "",
    },
  });

  const onSubmit = (data) => {
    const now = new Date().toISOString();

    const newJob = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    if (mode === "demo") {
      setMode("real");
    }

    setRealJobs((prev) => [newJob, ...prev]);

    console.log(newJob);

    reset();
    navigate("/dashboard");
  };

  const labelStyle = "text-xs text-gray-400 ml-1";

  const inputBase =
    "w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition placeholder:text-gray-500";

  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col">
      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-dark-900/80 backdrop-blur border-b border-dark-700 px-6 py-4">
        <h1 className="text-xl font-semibold">Add Job Application</h1>
        <p className="text-xs text-white/50">
          Track and manage your job applications
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company */}
          <div>
            <label className={labelStyle}>Company *</label>
            <div className="relative mt-1">
              <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                {...register("company", { required: "Company is required" })}
                placeholder="Google, Amazon..."
                className={inputBase}
              />
            </div>
            {errors.company && (
              <p className="text-red-400 text-xs mt-1 ml-1">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className={labelStyle}>Role *</label>
            <div className="relative mt-1">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                {...register("role", { required: "Role is required" })}
                placeholder="Frontend Engineer"
                className={inputBase}
              />
            </div>
            {errors.role && (
              <p className="text-red-400 text-xs mt-1 ml-1">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className={labelStyle}>Status *</label>
            <div className="relative mt-1">
              <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

              <select
                {...register("status", { required: "Status is required" })}
                defaultValue=""
                className={`${inputBase} appearance-none pr-10`}
              >
                <option value="" disabled>
                  Choose status
                </option>
                <option value="Applied">Applied</option>
                <option value="Screening">Screening</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>

              {/* custom arrow */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                ▼
              </div>
            </div>
            {errors.status && (
              <p className="text-red-400 text-xs mt-1 ml-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label className={labelStyle}>Salary *</label>
            <div className="relative mt-1">
              <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                {...register("salary", { required: "Salary is required" })}
                placeholder="$120k / 10 LPA"
                className={inputBase}
              />
            </div>
            {errors.salary && (
              <p className="text-red-400 text-xs mt-1 ml-1">
                {errors.salary.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className={labelStyle}>Date Applied *</label>
            <div className="relative mt-1">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="date"
                {...register("dateApplied", {
                  required: "Date is required",
                })}
                onClick={(e) => e.target.showPicker?.()}
                className={`${inputBase} cursor-pointer`}
              />
            </div>
            {errors.dateApplied && (
              <p className="text-red-400 text-xs mt-1 ml-1">
                {errors.dateApplied.message}
              </p>
            )}
          </div>

          {/* Job URL */}
          <div>
            <label className={labelStyle}>Job URL *</label>
            <div className="relative mt-1">
              <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="url"
                {...register("jobUrl", {
                  required: "Job URL is required",
                  pattern: {
                    value: /^https?:\/\/.+$/,
                    message: "Enter a valid URL",
                  },
                })}
                placeholder="https://company.com/job"
                className={inputBase}
              />
            </div>
            {errors.jobUrl && (
              <p className="text-red-400 text-xs mt-1 ml-1">
                {errors.jobUrl.message}
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className={labelStyle}>Notes *</label>
            <div className="relative mt-1">
              <FiFileText className="absolute left-3 top-3 text-gray-500" />
              <textarea
                rows={5}
                {...register("notes", {
                  required: "Notes are required",
                })}
                placeholder="Interview feedback..."
                className={inputBase + " pt-3 pl-10 resize-none"}
              />
            </div>
            {errors.notes && (
              <p className="text-red-400 text-xs mt-1 ml-1">
                {errors.notes.message}
              </p>
            )}
          </div>
        </div>

        {/* Remote */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            className="accent-blue-500 w-4 h-4"
            {...register("isRemote")}
          />
          <span className="text-sm text-white/70">
            Remote position (optional)
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={() => {
              reset();
              navigate("/dashboard");
            }}
            className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-[#2B7FFF] hover:bg-[#2563eb] transition duration-300 font-medium shadow-md"
          >
            Save Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddApplication;
