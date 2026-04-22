import Image from "next/image";
import Link from "next/link";

import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const linkStyles =
    "text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm font-light mb-1";

  return (
    <footer className="w-full bg-footer text-white pt-12 pb-6 px-4 sm:px-8 border-t border-white/10 mt-auto">
      {/* Content Container */}
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-10 justify-between items-center xl:items-start tracking-wide">
        {/* Logo Section */}
        <div className="flex flex-col items-center xl:items-start space-y-3 shrink-0">
          <div className="group bg-white size-24 rounded-2xl shadow-2xl overflow-hidden transition-transform hover:scale-105">
            <Image
              src="/logo.png"
              width={200}
              height={200}
              alt="Logo"
              className="w-full object-cover"
            />
          </div>

          {/* Heading and Slogan */}
          <div className="text-center xl:text-left">
            <h1 className="font-bold text-2xl tracking-tighter bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              AutoBizz
            </h1>
            <p className="text-xs text-blue-200/60 max-w-70 mt-1 italic">
              Automating your business effortlessly.
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 w-full xl:w-auto">
          {/* Column 1 */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-bold text-sm uppercase tracking-widest mb-4 text-btn-40">
              About Us
            </h2>
            <Link href="/story" className={linkStyles}>
              Our Story
            </Link>
            <Link href="/team" className={linkStyles}>
              The Team
            </Link>
            <Link href="/careers" className={linkStyles}>
              Careers
            </Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-bold text-sm uppercase tracking-widest mb-4 text-btn-40">
              Quick Links
            </h2>
            <Link href="/services" className={linkStyles}>
              Services
            </Link>
            <Link href="/inventory" className={linkStyles}>
              Inventory
            </Link>
            <Link href="/support" className={linkStyles}>
              Support
            </Link>
          </div>

          {/* Column 3 */}
          <div className="col-span-2 sm:col-span-1 flex flex-col items-center md:items-start">
            <h2 className="font-bold text-sm uppercase tracking-widest mb-4 text-btn-40">
              Connect
            </h2>
            <address className="not-italic text-gray-300 text-sm text-center md:text-left whitespace-nowrap">
              123 Auto Drive, NY
              <br />
              <span className="text-blue-200">contact@autobizz.com</span>
            </address>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="max-w-7xl mx-auto my-10 border-white/10" />

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Social Icons with Glass Effect */}
        <div className="flex gap-4">
          {[
            { Icon: FaGoogle, color: "hover:bg-red-500" },
            { Icon: FaFacebookF, color: "hover:bg-blue-600" },
            { Icon: BsTwitterX, color: "hover:bg-black" },
            { Icon: FaInstagram, color: "hover:bg-pink-600" },
          ].map(({ Icon, color }, idx) => (
            <button
              key={idx}
              className={`p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] ${color} cursor-pointer group`}
            >
              <Icon className="size-5 text-white group-hover:scale-110 transition-transform" />
            </button>
          ))}
        </div>

        <p className="text-gray-400 text-xs font-light tracking-widest">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">AUTOBIZZ</span>. ALL RIGHTS
          RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
