import "./App.css";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/signupPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import OtpVerification from "./pages/OtpVerification";
import { useGetMeQuery } from "./features/slices/orgSlice";
import LoadingElement from "./components/LoadingElement";
import EditOrgDetails from "./pages/EditOrgDetails";
import MyDocument from "./pages/MyDocument";

const AuthGuard = ({ children, requireAuth }) => {
  const token = localStorage.getItem("token");

  // If there's no token, don't even run the query
  
  const { data, isLoading, isFetching } = useGetMeQuery(undefined, {
    skip: !token,
  });

  if (isLoading || isFetching) return <LoadingElement />;

  const isAuthenticated = !!data;

  if (requireAuth) {
    // If we have no token OR no data, boot to login
    return token && isAuthenticated ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  } else {
    // For Login/Register: if we have both, boot to home
    return token && isAuthenticated ? <Navigate to="/" replace /> : children;
  }
};

// 2. Define the router ONCE outside the component
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard requireAuth={true}>
        <RootLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/orgprofile", element: <EditOrgDetails /> },
      { path: "/documents", element: <MyDocument /> },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthGuard requireAuth={false}>
        <LoginPage />
      </AuthGuard>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthGuard requireAuth={false}>
        <SignupPage />
      </AuthGuard>
    ),
  },
  { path: "/resetpassword", element: <ForgetPasswordPage /> },
  { path: "/resetpassword/:token", element: <ResetPasswordPage /> },
  { path: "/otp", element: <OtpVerification /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
