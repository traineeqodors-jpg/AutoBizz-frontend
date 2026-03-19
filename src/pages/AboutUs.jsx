import React from "react";
import { 
  IoRocketOutline, IoShieldCheckmarkOutline, IoChatbubblesOutline, 
  IoHeadsetOutline, IoStar, IoFlashOutline, IoGlobeOutline 
} from "react-icons/io5";
import ContactUs from "../components/AboutUs/ContactUs";

const AboutUs = () => {
  return (
    <>
      <div className="min-h-screen bg-back p-4 sm:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto space-y-20">
          
          {/* 1. HERO SECTION */}
          <div className="text-center space-y-4">
            <span className="bg-btn-100/10 text-btn-100 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              The Future of Support
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-text tracking-tight">
              Powerful <span className="text-btn-100">AI Agents</span> <br /> 
              for Modern Teams
            </h1>
            <p className="text-text/50 max-w-2xl mx-auto text-lg">
              Deploy human-like voice and text agents trained on your business data in minutes. 
            </p>
          </div>

          {/* 2. PRODUCT SHOWCASE (Product List Style) */}
          <div className="space-y-12">
            <div className="flex items-end justify-between border-b border-slate-200 pb-4">
               <h2 className="text-2xl font-bold text-text">Our Solutions</h2>
               <p className="text-btn-100 font-bold text-sm">View all features →</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product 1 */}
              <ProductCard 
                image="images.jpeg"
                title="Voice AI Pro"
                tag="Best Seller"
                desc="Low-latency voice responses with emotional intelligence and multi-language support."
                price="$49/mo"
              />
              {/* Product 2 */}
              <ProductCard 
                image="rag.webp"
                title="RAG Knowledge Base"
                tag="Enterprise"
                desc="Upload your SOPs and PDFs. Our AI syncs with Pinecone to answer anything about your brand."
                price="$99/mo"
              />
            </div>
          </div>

          {/* 3. CUSTOMER SUPPORT HIGHLIGHT (New Section) */}
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl shadow-text/5 border border-white flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="p-3 bg-btn-100/10 text-btn-100 rounded-2xl w-fit">
                <IoHeadsetOutline size={32} />
              </div>
              <h2 className="text-3xl font-bold text-text">24/7 Premium Support</h2>
              <p className="text-text/60 leading-relaxed text-lg">
                We don't just provide software; we provide a partnership. Every plan includes:
              </p>
              <ul className="space-y-3">
                {['Dedicated Account Manager', 'Custom AI Prompt Engineering', '99.9% Uptime Guarantee', 'Live Technical Integration'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-text/70 font-medium">
                    <IoShieldCheckmarkOutline className="text-btn-100" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-back p-6 rounded-3xl text-center space-y-2">
                   <p className="text-3xl font-bold text-text">15m</p>
                   <p className="text-[10px] uppercase font-bold text-text/40 tracking-widest">Avg. Setup Time</p>
                </div>
                <div className="bg-btn-100 p-6 rounded-3xl text-center space-y-2 text-white">
                   <p className="text-3xl font-bold">2M+</p>
                   <p className="text-[10px] uppercase font-bold opacity-70 tracking-widest">Calls Processed</p>
                </div>
                <div className="col-span-2 bg-slate-900 p-6 rounded-3xl flex items-center justify-between text-white">
                    <div>
                        <p className="font-bold">Global Presence</p>
                        <p className="text-xs opacity-50">Serving 40+ countries</p>
                    </div>
                    <IoGlobeOutline size={30} className="opacity-20" />
                </div>
            </div>
          </div>

          {/* 4. CLIENT REVIEWS (Testimonials) */}
          <div className="space-y-10">
            <h2 className="text-2xl font-bold text-center text-text tracking-tight">Trusted by Industry Leaders</h2>
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

          {/* 5. TEAM SECTION */}
          <div className="text-center py-10">
              <h2 className="text-xl font-bold text-text tracking-tight">The Minds Behind the Voice</h2>
              <div className="flex justify-center gap-8 mt-10">
                  <TeamAvatar name="Mohit" role="AI Engineer" />
                  <TeamAvatar name="Uday" role="Backend Lead" />
                  <TeamAvatar name="Rahul" role="Product" />
              </div>
          </div>
        </div>
      </div>

      <ContactUs />
    </>
  );
};

/* PRODUCT CARD COMPONENT */
const ProductCard = ({ image, title, desc, tag, price }) => (
  <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-btn-100/5 transition-all duration-500">
    <div className="h-64 overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-btn-100">
        {tag}
      </div>
      <img src={image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={title} />
    </div>
    <div className="p-8 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-2xl font-bold text-text">{title}</h3>
        <p className="text-btn-100 font-bold">{price}</p>
      </div>
      <p className="text-text/50 text-sm leading-relaxed">{desc}</p>
      <button className="w-full py-3 bg-back group-hover:bg-btn-100 group-hover:text-white text-text font-bold rounded-2xl transition-colors duration-300">
        Learn More
      </button>
    </div>
  </div>
);

/* REVIEW CARD COMPONENT */
const ReviewCard = ({ name, role, text }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
    <div className="flex gap-1 text-yellow-400">
      {[...Array(5)].map((_, i) => <IoStar key={i} />)}
    </div>
    <p className="text-text/70 italic text-sm leading-relaxed">"{text}"</p>
    <div>
      <p className="font-bold text-text text-sm">{name}</p>
      <p className="text-text/40 text-[10px] uppercase font-bold tracking-widest">{role}</p>
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
          <p className="text-btn-100 text-[9px] font-bold uppercase tracking-widest">{role}</p>
      </div>
  </div>
)

export default AboutUs;
