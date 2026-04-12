import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../api/application";
import Loading from "../components/Loading";
import ErrorDisplay from "../components/ErrorDisplay";
import ApplicationsHeader from "../components/ApplicationPage/ApplicationsHeader";
import ApplicationsTable from "../components/ApplicationPage/ApplicationsTable";

const Applications = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });
  const applications = data?.data || [];

  if (isLoading) return <Loading />;
  if (isError) return <ErrorDisplay error={error} />;

  return (
    <div className="min-h-screen bg-dark-900 px-6 py-10">
      <ApplicationsHeader count={applications.length} />
      {applications.length === 0 ? (
        <div className="flex items-center justify-center py-24">
          <p className="text-dark-500 text-sm">No applications yet.</p>
          <Link
            to="/application/add"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-medium hover:bg-accent/20 transition"
          >
            <IoMdAdd size={16} />
            Add New Application
          </Link>
        </div>
      ) : (
        <ApplicationsTable applications={applications} />
      )}
    </div>
  );
};

export default Applications;
