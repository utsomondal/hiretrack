import { MdError } from "react-icons/md";

const ErrorDisplay = ({ error }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-dark-900">
      <div className="flex flex-col items-center gap-4 max-w-md text-center px-6">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <MdError className="text-red-500" size={24} />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-white text-xl font-semibold">
            Something went wrong
          </h2>
          <p className="text-dark-500 text-sm">
            We couldn't load. Please try again.
          </p>
        </div>

        <div className="w-full bg-dark-800 border border-red-500/10 rounded-lg px-4 py-3">
          <p className="text-red-400/60 text-xs break-all leading-relaxed tracking-wide">
            {error?.message}
          </p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-5 py-2 rounded-lg border border-accent/30 text-accent text-sm hover:bg-accent/10 transition-colors duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
