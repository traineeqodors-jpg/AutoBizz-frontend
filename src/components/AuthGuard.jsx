import { useGetMeQuery } from "../features/slices/orgSlice";
import LoadingElement from "./ui/LoadingElement";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children, requireAuth }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // If there's no isLoggedIn, don't even run the query
  const { data, isLoading } = useGetMeQuery(undefined, {
    skip: !isLoggedIn,
  });

  if (isLoading) return <LoadingElement />;
  const isAuthenticated = !!data;

  if (requireAuth) {
    // If we have no isLoggedIn OR no data, boot to login
    return isLoggedIn && isAuthenticated ? (
      children
    ) : (
      <Navigate to="/home" replace />
    );
  } else {
    // For Login/Register: if we have both, boot to home
    return isLoggedIn && isAuthenticated ? (
      <Navigate to="/" replace />
    ) : (
      children
    );
  }
};

export default AuthGuard;
