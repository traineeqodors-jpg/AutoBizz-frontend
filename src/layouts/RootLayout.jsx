import { Outlet, useNavigation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LoadingElement from "../components/ui/LoadingElement";

import AIChat from "../components/ui/AIChat";
import { useGetMeQuery } from "../features/slices/orgSlice";
import { useRef, useState } from "react";
import ScrollUp from "../components/ui/ScrollUp";

const RootLayout = () => {
  const { data } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem("isLoggedIn"),
  });
  const navigation = useNavigation();

  const scrollUpRef = useRef(null);
  const [showScroll, setShowScroll] = useState(false);

  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 100) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    setTimeout(() => {
      if (scrollUpRef.current) {
        scrollUpRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  };

  if (navigation.state === "loading") {
    return <LoadingElement />;
  }

  if (!data) return null;

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar scrollToTop={scrollToTop} />
        <main className="flex-1 flex flex-col shrink-0 overflow-y-auto scheme-dark scroll-smooth">
          <div className="flex flex-col h-screen overflow-hidden">
            <Navbar scrollToTop={scrollToTop} />
            <div
              className="grow overflow-auto bg-back dark:bg-gray-800"
              onScroll={handleScroll}
            >
              <div ref={scrollUpRef} />
              <Outlet />

              {showScroll && <ScrollUp scrollToTop={scrollToTop} />}

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
