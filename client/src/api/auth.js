import apiFetch from "./apiFetch";

// Register new user
export const registerUser = async (data) => {
  return await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Login existing user
export const loginUser = async (data) => {
  return await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Logout
export const logoutUser = async () => {
  return await apiFetch("/auth/logout", {
    method: "POST",
  });
};
