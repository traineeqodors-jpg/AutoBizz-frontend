import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/signupPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import OtpVerification from "./pages/OtpVerification";
import EditOrgDetails from "./pages/EditOrgDetails";
import MyDocument from "./pages/MyDocument";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import "./App.css";
import CallLog from "./pages/CallLog";
import AboutUs from "./pages/AboutUs";
import SopVideosPage from "./pages/SopVideosPage";
import AuthGuard from "./components/AuthGuard";
import LeadManagement from "./pages/LeadManagement"
import LeadCalendar from "./pages/LeadCalender";

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
      { path: "/callLogs", element: <CallLog /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/sop", element: <SopVideosPage /> },
      { path: "/leads", element: <LeadManagement /> },
      {path : "/calendar" , element : <LeadCalendar />}
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