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
        <div className="flex items-center justify-center min-h-[calc(100vh-168px)]">
          <p className="text-dark-500 text-lg">No applications yet.</p>
          
        </div>
      ) : (
        <ApplicationsTable applications={applications} />
      )}
    </div>
  );
};

export default Applications;
