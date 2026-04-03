import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import "./App.css";
import AuthGuard from "./components/AuthGuard";

import { useSelector } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import LoadingElement from "./components/ui/LoadingElement";
import LandingPage from "./pages/LandingPage";

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
      { path: "/calendar", element: <LeadCalendar /> },
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
    path: "/home",
    element: (
      <AuthGuard requireAuth={false}>
        <LandingPage />
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
