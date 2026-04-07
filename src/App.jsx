import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import "./App.css";
import AuthGuard from "./components/AuthGuard";

import { useSelector } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import LoadingElement from "./components/ui/LoadingElement";
import LandingPage from "./pages/LandingPage";
import ErrorElement from "./components/ui/ErrorElement";

const Home = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/signupPage"));
const LeadManagement = lazy(() => import("./pages/LeadManagement"));
const LeadCalendar = lazy(() => import("./pages/LeadCalender"));
const SopVideosPage = lazy(() => import("./pages/SopVideosPage"));
const MyDocument = lazy(() => import("./pages/MyDocument"));
const EditOrgDetails = lazy(() => import("./pages/EditOrgDetails"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const CallLog = lazy(() => import("./pages/CallLog"));
const ForgetPasswordPage = lazy(() => import("./pages/ForgetPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));

// 2. Define the router ONCE outside the component
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorElement />,
    element: (
      <AuthGuard requireAuth={true}>
        <RootLayout />
      </AuthGuard>
    ),
    children: [
      {
        errorElement: <ErrorElement />,
        children: [
          { index: true, element: <Home /> },
          { path: "/orgprofile", element: <EditOrgDetails /> },
          { path: "/documents", element: <MyDocument /> },
          { path: "/callLogs", element: <CallLog /> },
          { path: "/sop", element: <SopVideosPage /> },
          { path: "/leads", element: <LeadManagement /> },
          { path: "/calendar", element: <LeadCalendar /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    errorElement: <ErrorElement />,
    element: (
      <AuthGuard requireAuth={false}>
        <LoginPage />
      </AuthGuard>
    ),
  },
  {
    path: "/register",
    errorElement: <ErrorElement />,
    element: (
      <AuthGuard requireAuth={false}>
        <SignupPage />
      </AuthGuard>
    ),
  },
  {
    path: "/home",
    errorElement: <ErrorElement />,
    element: (
      <AuthGuard requireAuth={false}>
        <LandingPage />
      </AuthGuard>
    ),
  },
  { path: "/resetpassword", element: <ForgetPasswordPage /> },
  { path: "/resetpassword/:token", element: <ResetPasswordPage /> },
]);

const App = () => {
  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <Suspense fallback={<LoadingElement />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
