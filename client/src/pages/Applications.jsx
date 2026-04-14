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
    <div className="min-h-screen bg-dark-900">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <ApplicationsHeader count={applications.length} />

        {applications.length === 0 ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-dark-500 text-lg">No applications yet.</p>
          </div>
        ) : (
          <ApplicationsTable applications={applications} />
        )}
      </div>
    </div>
  );
};

export default Applications;
