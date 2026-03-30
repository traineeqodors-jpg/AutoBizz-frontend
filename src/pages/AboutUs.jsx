import  { useState, useEffect } from "react";

import { motion } from "framer-motion";
import ContactUs from "../components/AboutUs/ContactUs";

const AboutUs = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen  w-full flex flex-col items-center gap-5 "
      >
        <div className=" bg-back dark:bg-gray-800 p-4 sm:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto space-y-20">
            {/* 5. TEAM SECTION */}
            <div className="text-center py-10">
              <h2 className="text-xl font-bold text-text dark:text-white tracking-tight">
                The Minds Behind the Voice
              </h2>
              <div className="flex justify-center gap-8 mt-10">
                <TeamAvatar name="Mohit" role="AI Engineer" />
                <TeamAvatar name="Uday" role="Backend Lead" />
                <TeamAvatar name="Rahul" role="Product" />
              </div>
            </div>
          </div>
        </div>

        <ContactUs />
      </motion.div>
    </>
  );
};


/* TEAM AVATAR COMPONENT */
const TeamAvatar = ({ name, role }) => {
  const [show, setShow] = useState(false);

    useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  
  return (
    <div className="group relative cursor-pointer" onClick={() => setShow(!show)}>
      <div className={`size-20 max-sm:size-15  bg-white border-2 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm transition-all overflow-hidden ${show ? "border-btn-100 scale-110" : "border-slate-100 group-hover:border-btn-100"}`}>
        <div className="size-full bg-slate-50 flex items-center justify-center font-black text-text/20 text-2xl uppercase">
          {name[0]}
        </div>
      </div>
      
      <div className={`absolute top-full mt-4 left-1/2 -translate-x-1/2 transition-all duration-300 text-center w-max pointer-events-none
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"}
      `}>
        <p className="font-bold text-text dark:text-white text-sm">{name}</p>
        <p className="text-btn-100 text-[10px] font-bold uppercase tracking-widest">{role}</p>
      </div>
    </div>
  );
}


export default AboutUs;
