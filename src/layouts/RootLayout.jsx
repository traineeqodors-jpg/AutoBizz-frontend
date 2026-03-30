
import {  Outlet, useNavigation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LoadingElement from "../components/LoadingElement";

import AIChat from "../components/AIChat";
import { useGetMeQuery } from "../features/slices/orgSlice";

const RootLayout = () => {
  
  // We skip: !token to prevent the 401 error on logout
  const { data } = useGetMeQuery(undefined, { skip: !localStorage.getItem("isLoggedIn") });
  const navigation = useNavigation();

  // If React Router is doing a 'loader' transition, show the spinner
  if (navigation.state === "loading") {
    return <LoadingElement />;
  }

  // AuthGuard in App.js ensures 'data' exists before we get here,
  // but we use a fallback just in case of a race condition.
  if (!data) return null;

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
 
        <main className="flex-1 flex flex-col shrink-0 overflow-y-auto scheme-dark scroll-smooth">
          <div className="flex flex-col h-screen overflow-hidden">
            <Navbar />
            <div className="grow overflow-auto">
              <Outlet />
 
              <AIChat />
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};


export default RootLayout;
