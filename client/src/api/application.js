import apiFetch from "./apiFetch";

// CREATE
export const createApplication = (data) => {
  return apiFetch("/applications", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// GET all
export const getApplications = () => {
  return apiFetch("/applications");
};

// GET by ID
export const getApplicationById = (id) => {
  return apiFetch(`/applications/${id}`);
};

// UPDATE
export const updateApplication = (id, data) => {
  return apiFetch(`/applications/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

// DELETE
export const deleteApplication = (id) => {
  return apiFetch(`/applications/${id}`, {
    method: "DELETE",
  });
};

// GET STATS
export const getApplicationStats = async () => {
  return apiFetch("/applications/stats");
};

// GET RECENT APPLICATIONS
export const getRecentApplications = async (limit = 5) => {
  return apiFetch(`/applications/recent?limit=${limit}`);
};

// GET JOB TYPE
export const getJobType = async () => {
  return apiFetch("/applications/type");
};

// GET APPLICATION TIMELINE
export const getApplicationTimeline =async ()=>{
  return apiFetch("/applications/timeline")
}