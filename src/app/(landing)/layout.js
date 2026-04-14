import Footer from "@/components/Footer";
import LandingNavbar from "./components/LandingNavbar";

export default function LandingLayout({ children }) {
  return (
    <div className="min-h-screen relative">
      <LandingNavbar />
      {children}
      <Footer />
    </div>
  );
}
