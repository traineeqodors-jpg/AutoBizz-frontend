import {
  IoShieldCheckmarkOutline,
  IoHeadsetOutline,
  IoStar,
  IoGlobeOutline,
  IoDocumentAttachOutline,
} from "react-icons/io5";
import ContactUs from "../components/AboutUs/ContactUs";
import { motion } from "framer-motion";
import LandingNavbar from "../layouts/LandingNavbar";
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { RiRobot3Line } from "react-icons/ri";
import Footer from "../layouts/Footer";
import ProductCard from "../components/LandingPage/ProductCard";

const LandingPage = () => {
  const PRODUCTS = [
    {
      img: "/AIReceptionist.jpg",
      title: "Deploy your AI receptionist",
      desc: "Rapidly set up 24/7 voice agents that answer calls instantly using document knowledge base.",
      features: [
        {
          label: "Rapid Deployment",
          text: "Activate a dedicated AI phone number in minutes.",
        },
        {
          label: "Knowledge-Based Responses",
          text: "Your AI agent learns directly from your uploaded documents.",
        },
        {
          label: "Human-Like Interaction",
          text: "Uses advanced speech-to-text and lifelike voice synthesis.",
        },
      ],
    },
    {
      img: "/AIInteraction.jpg",
      title: "Automate Customer interactions",
      desc: "Use AI automation to triage inquiries, answer FAQs, and route conversations without human intervention.",
      features: [
        {
          label: "Automated Triage",
          text: "AI categorizes inquiries and handles FAQs without any human intervention.",
        },
        {
          label: "Multilingual Capabilities",
          text: "Support your global customer base by communicating in multiple languages.",
        },
      ],
    },
    {
      img: "/SOPVideo.png",
      title: "Generate AI Training Videos",
      desc: "Transform your documents into structured step-by-step procedures and polished video tutorials.",
      features: [
        {
          label: "Document to Video",
          text: "Transform your text-based manuals and business documents into structured, step-by-step training videos.",
        },
        {
          label: "Easy Employee Onboarding",
          text: "Generate polished tutorials using AI video avatars to ensure your team learns processes with ease.",
        },
      ],
    },
    {
      img: "/LeadToMeeting.png",
      title: "Convert Leads to Meetings",
      desc: "Connect with high-potential leads by letting AI qualify them and schedule meetings directly.",
      features: [
        {
          label: "Smart Lead Qualification",
          text: "Let AI vet incoming leads and identify 'high-confidence' buyers based on their interactions. ",
        },
        {
          label: "Hands-Free Booking",
          text: "High-potential leads are automatically scheduled directly onto your Google Calendar. ",
        },
      ],
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen dark:bg-gray-800 bg-back w-full flex flex-col items-center gap-5 "
      >
        <LandingNavbar />
        <div className="w-full">
          <div className="mx-auto space-y-20">
            {/* 1. HERO SECTION */}
            <div className="max-w-6xl mx-auto p-4 sm:p-8 text-center space-y-4 flex items-center gap-5">
              {/* Text Content */}
              <div className="text-center md:text-left flex-[1.5] space-y-6">
                <span className="inline-block bg-btn-100/10 text-btn-100 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-btn-100/20">
                  The Future of Support
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-text dark:text-white leading-[1.1] tracking-tight">
                  Powerful <span className="text-btn-100">AI Solutions</span>{" "}
                  <br />
                  for Business Automation
                </h1>
                <p className="text-text/60 dark:text-gray-400 max-w-xl text-lg md:text-xl leading-relaxed">
                  Deploy AI customer support and AI-based SOP training videos
                  created on your business data in minutes.
                </p>

                {/* Added a CTA button to balance the text side */}
                <div className="pt-4">
                  <button className="bg-btn-100 mx-auto md:mx-0 flex items-center-safe gap-3 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-btn-100/30 transition-all cursor-pointer">
                    Get Started
                    <FaArrowRight />
                  </button>
                </div>
              </div>
              {/* Image Content */}
              <div className="hidden md:block flex-1  w-full relative">
                {/* Decorative background glow behind image */}
                <div className="absolute -inset-4 bg-btn-100/20 blur-3xl rounded-full opacity-30 animate-pulse"></div>

                <div className="relative overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl border-4 border-white dark:border-gray-700 shadow-2xl">
                  <img
                    src="/head.webp"
                    className="w-full h-100 lg:h-125 object-cover "
                    alt="AI Solutions Visualization"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Process Banner */}
            <div className="w-full bg-btn-100 dark:bg-btn-200 overflow-hidden">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between py-10 sm:py-18 px-4 gap-6">
                <ProcessCard
                  title="Register Your Account"
                  desc="Registering your account gives you access to AutoBizz Portal."
                  logo={<FaRegUser className="size-6 sm:size-8" />}
                  navigation="/register"
                />
                <ProcessCard
                  title="Upload Your Document"
                  desc="make your document knowledge engine for website."
                  logo={
                    <IoDocumentAttachOutline className="size-6 sm:size-8" />
                  }
                  navigation="/login"
                />
                <ProcessCard
                  title="Automate Your Business"
                  desc="Automate your business processes with the power of AI"
                  logo={<RiRobot3Line className="size-6 sm:size-8" />}
                  navigation="/login"
                />
              </div>
            </div>

            {/* 2. PRODUCT SHOWCASE */}
            <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-10">
              <div className="flex items-end justify-between border-b border-gray-400 pb-4">
                <h2 className="text-xl font-bold text-text dark:text-white">
                  Our Solutions
                </h2>
              </div>

              {/* Changed grid to 3 columns on larger screens for smaller cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRODUCTS.map((product, index) => (
                  <ProductCard
                    key={index}
                    img={product.img}
                    title={product.title}
                    desc={product.desc}
                    // Pass the features array to the ProductCard,
                    // which will then pass it to the InfoDialog
                    features={product.features}
                  />
                ))}
              </div>
            </div>

            {/* 3. CUSTOMER SUPPORT HIGHLIGHT (New Section) */}
            <div className="p-4 sm:p-8">
              <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-16 shadow-xl shadow-text/5 border border-white dark:border-gray-400 flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                  <div className="p-3 bg-btn-100/10 text-btn-100 rounded-2xl w-fit">
                    <IoHeadsetOutline size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-text dark:text-white">
                    24/7 Premium Support
                  </h2>
                  <p className="text-text/60 dark:text-gray-300 leading-relaxed text-lg">
                    We don't just provide software; we provide a partnership.
                    Every plan includes:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Dedicated Account Manager",
                      "Custom AI Prompt Engineering",
                      "99.9% Uptime Guarantee",
                      "Live Technical Integration",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-text/70 dark:text-gray-400 font-medium"
                      >
                        <IoShieldCheckmarkOutline className="text-btn-100" />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="bg-back p-6 rounded-3xl text-center space-y-2">
                    <p className="text-3xl font-bold text-text">15m</p>
                    <p className="text-[10px] uppercase font-bold text-text/40 tracking-widest">
                      Avg. Setup Time
                    </p>
                  </div>
                  <div className="bg-btn-100 p-6 rounded-3xl text-center space-y-2 text-white">
                    <p className="text-3xl font-bold">2M+</p>
                    <p className="text-[10px] uppercase font-bold opacity-70 tracking-widest">
                      Calls Processed
                    </p>
                  </div>
                  <div className="col-span-2 bg-slate-900 p-6 rounded-3xl flex items-center justify-between text-white">
                    <div>
                      <p className="font-bold">Global Presence</p>
                      <p className="text-xs opacity-50">
                        Serving 40+ countries
                      </p>
                    </div>
                    <IoGlobeOutline size={30} className="opacity-20" />
                  </div>
                </div>
              </div>
            </div>

            {/* 4. CLIENT REVIEWS (Testimonials) */}
            <div className="max-w-6xl p-4 sm:p-8 mx-auto space-y-10">
              <h2 className="text-2xl font-bold text-center text-text dark:text-white tracking-tight">
                Trusted by Industry Leaders
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ReviewCard
                  name="David Chen"
                  role="CEO, TechFlow"
                  text="The voice latency is unbelievable. It sounds more human than our previous outsourced support."
                />
                <ReviewCard
                  name="Sarah Jenkins"
                  role="Ops Manager, RetailGo"
                  text="Integrating our SOPs took minutes. Our customer satisfaction score jumped by 40% in one month."
                />
                <ReviewCard
                  name="Mike Ross"
                  role="Director, FinSecure"
                  text="Finally, an AI solution that actually understands context and doesn't hallucinate. Absolute game changer."
                />
              </div>
            </div>
          </div>
        </div>
        <ContactUs />
        <Footer />
      </motion.div>
    </>
  );
};

// Process Card Component
const ProcessCard = ({ logo, title, desc, navigation }) => (
  <NavLink
    to={navigation}
    className="group flex sm:flex-col lg:flex-row items-center gap-4 py-4 px-2 text-white w-full md:w-1/3"
  >
    <div
      className="flex items-center justify-center border border-dashed rounded-full p-4 sm:p-5 flex-none aspect-square text-white
                    transition-all duration-500 ease-in-out group-hover:rotate-360 group-hover:bg-white group-hover:text-btn-200"
    >
      {logo}
    </div>

    <div className="flex flex-col sm:items-center-safe lg:items-start gap-4">
      <h2 className="text-base sm:text-lg font-bold leading-tight">
        {title || "Register Your Account"}
      </h2>
      <p className="text-xs lg:text-left md:text-center sm:text-sm text-white/70 line-clamp-3">
        {desc ||
          "Registering your account gives you access to AutoBizz Portal."}
      </p>
    </div>
  </NavLink>
);

/* REVIEW CARD COMPONENT */
const ReviewCard = ({ name, role, text }) => (
  <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
    <div className="flex gap-1 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <IoStar key={i} />
      ))}
    </div>
    <p className="text-text/70 dark:text-gray-300 italic text-sm leading-relaxed">
      "{text}"
    </p>
    <div>
      <p className="font-bold text-text dark:text-gray-300 text-sm">{name}</p>
      <p className="text-text/40 dark:text-gray-400 text-[10px] uppercase font-bold tracking-widest">
        {role}
      </p>
    </div>
  </div>
);

/* TEAM AVATAR COMPONENT */
const TeamAvatar = ({ name, role }) => (
  <div className="group relative">
    <div className="size-16 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center shadow-sm group-hover:border-btn-100 transition-colors overflow-hidden">
      <div className="size-full bg-slate-50 flex items-center justify-center font-bold text-text/20 text-xl">
        {name[0]}
      </div>
    </div>
    <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-center w-max">
      <p className="font-bold text-text text-xs">{name}</p>
      <p className="text-btn-100 text-[9px] font-bold uppercase tracking-widest">
        {role}
      </p>
    </div>
  </div>
);

export default LandingPage;
