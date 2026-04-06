import { Outlet, useNavigation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LoadingElement from "../components/ui/LoadingElement";

import AIChat from "../components/ui/AIChat";
import { useGetMeQuery } from "../features/slices/orgSlice";
import { BiAngry } from "react-icons/bi";

const RootLayout = () => {
  // We skip: !token to prevent the 401 error on logout
  const { data } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem("isLoggedIn"),
  });
  const navigation = useNavigation();

  // If React Router is doing a 'loader' transition, show the spinner
  if (navigation.state === "loading") {
    return <LoadingElement />;
  }

  // AuthGuard in App.js ensures 'data' exists before we get here,
  // but we use a fallback just in case of a race condition.
  if (!data) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-linear-to-br from-slate-50 to-blue-200 dark:bg-none dark:bg-gray-800">
        <Navbar />

        <div className="flex-1 overflow-y-auto scheme-dark scroll-smooth">
          <div className="max-w-[95%] mx-auto w-full">
            <Outlet />
          </div>

          <AIChat />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
