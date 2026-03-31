import { useGetMeQuery } from '../features/slices/orgSlice';
import LoadingElement from './ui/LoadingElement';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children, requireAuth }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  

  const { data, isLoading } = useGetMeQuery(undefined, {
    skip: !isLoggedIn,
  });

  if (isLoading) return <LoadingElement />;

  const isAuthenticated = !!data;

  if (requireAuth) {
   
    return isLoggedIn && isAuthenticated ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  } else {
   
    return isLoggedIn && isAuthenticated ? (
      <Navigate to="/" replace />
    ) : (
      children
    );
  }
};


export default AuthGuard