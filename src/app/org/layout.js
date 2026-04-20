"use client";

import SideBar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocketProvider from "@/components/SocketProvider";
import { useGetMeQuery } from "@/features/slices/userSlice";
import Loading from "../loading";

export default function LoggedInLayout({ children }) {
  const { data, isLoading } = useGetMeQuery();

  if (isLoading) <Loading />;

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <div className="flex-1 overflow-y-auto scroll-smooth flex flex-col">
          <div className="max-w-[95%] mx-auto w-full grow">
            <SocketProvider user={data?.data}>{children}</SocketProvider>
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}
