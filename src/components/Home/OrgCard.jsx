import { IoBusiness } from "react-icons/io5";

function OrgCard({ user }) {
  return (
    <div className="h-45 w-full shadow-sm dark:shadow-gray-700/30 rounded-2xl p-5 bg-white dark:bg-gray-900 space-y-3 flex items-center gap-4">
      <button className="bg-btn-50/50 p-2 rounded-xl border-2 border-btn-100/60">
        <IoBusiness className="size-8 dark:text-gray-300" />
      </button>
      <div className="space-y-2 w-full">
        <h2 className="text-text dark:text-white text-lg font-bold">
          Organization Details
        </h2>
        <ul className="text-text/60 dark:text-gray-400 text-sm leading-relaxed">
          <li>Business Name : {user?.businessName}</li>
          <li>Business Size : {user?.businessSize}</li>
          <li>Location : {user?.country}</li>
        </ul>
      </div>
    </div>
  );
}

export default OrgCard;
