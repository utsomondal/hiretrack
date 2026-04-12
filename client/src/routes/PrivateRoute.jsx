import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
