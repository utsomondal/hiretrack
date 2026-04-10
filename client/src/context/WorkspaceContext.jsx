import { createContext, useState } from "react";

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
  const [mode, setMode] = useState("real");

  const [demoJobs, setDemoJobs] = useState([]);
  const [realJobs, setRealJobs] = useState([]);

  const jobs = mode === "demo" ? demoJobs : realJobs;

  return (
    <WorkspaceContext.Provider
      value={{
        mode,
        setMode,
        jobs,
        setDemoJobs,
        setRealJobs,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContext;
