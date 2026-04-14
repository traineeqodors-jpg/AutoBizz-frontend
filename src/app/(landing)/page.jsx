import HeroSection from "./components/HeroSection";
import ProcessSection from "./components/ProcessSection";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import ProductShowCase from "./components/ProductShowCase";
import CustomerSupport from "./components/CustomerSupport";
import ClientReviews from "./components/ClientReviews";
import ContactUs from "./components/ContactUs";

export default function LandingPage() {
  return (
    <>
      <AnimatedWrapper>
        <div className="w-full flex flex-col items-center gap-5">
          <div className="w-full scroll-smooth">
            <div className="mx-auto space-y-10">
              {/* 1. HERO SECTION */}
              <HeroSection />

              {/* 2. Processes Banner Section */}
              <ProcessSection />

              {/* 3. PRODUCT SHOWCASE */}
              <ProductShowCase />

              {/* 4. CUSTOMER SUPPORT HIGHLIGHT */}
              <CustomerSupport />

              {/* 5. CLIENT REVIEWS (Testimonials) */}
              <ClientReviews />

              <ContactUs />
            </div>
          </div>
        </div>
      </AnimatedWrapper>
    </>
  );
}
