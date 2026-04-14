// app/(LoggedIn)/layout.js
import SideBar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoggedInLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <div className="flex-1 overflow-y-auto scroll-smooth flex flex-col">
          <div className="max-w-[95%] mx-auto w-full grow">{children}</div>

          <Footer />
        </div>
      </main>
    </div>
  );
}
