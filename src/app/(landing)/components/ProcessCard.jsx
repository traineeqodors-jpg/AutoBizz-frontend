import Link from "next/link";

export default function ProcessCard({ logo, title, desc, navigation }) {
  return (
    <>
      <Link
        href={navigation}
        className="group flex sm:flex-col lg:flex-row items-center gap-4 py-4 px-2 text-white w-full md:w-1/3"
      >
        <div className="flex items-center justify-center border border-dashed border-white rounded-full p-4 sm:p-5 flex-none aspect-square text-white transition-all duration-500 ease-in-out group-hover:rotate-360 group-hover:bg-white group-hover:text-btn-200">
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
      </Link>
    </>
  );
}
