import Header from "../components/Dashboard/Header";
import DashboardCardHolder from "../components/Dashboard/DashboardCardHolder";
import RecentApplications from "../components/Dashboard/RecentApplications";
import { Link } from "react-router";
import JobType from "../components/Dashboard/JobType";
import ApplicationTimeline from "../components/Dashboard/ApplicationTimeline";

const Dashboard = () => {
  return (
    <div className="text-white p-3 md:p-6 lg:p-8 space-y-6">
      <Header />
      <DashboardCardHolder />

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* LEFT - TABLE */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="font-medium text-sm text-white">
              Recent Applications
            </p>
            <Link
              className="text-accent text-sm hover:underline"
              to={"/applications"}
            >
              View All
            </Link>
          </div>

          <RecentApplications />
        </div>

        {/* RIGHT - PIE CHART */}
        <div className="lg:col-span-1">
          <p className="text-sm font-medium mb-4">Job Type</p>
          <div className="bg-dark-700/80 border border-white/10 rounded-2xl flex flex-col backdrop-blur-xl shadow-sm">
            <div className="flex-1 flex items-center justify-center">
              <JobType />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-4">Applications Over Time</p>
        <div className="bg-dark-700/80 border border-white/10 rounded-2xl flex flex-col backdrop-blur-xl shadow-sm">
          <ApplicationTimeline />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
