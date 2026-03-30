import { useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DocuementUploadDialog from "../DocuementUploadDialog";

const OrgInfo = ({ user }) => {
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  const fullname = user?.firstName
    ? `${user.firstName} ${user.lastName}`
    : null;

  return (
    <div className="w-full shadow-md/10 rounded-2xl bg-white dark:bg-gray-200/10 dark:border-0   flex flex-col gap-2 sm:flex-row justify-between">
      <div className="w-full shadow-md/10 rounded-2xl p-5  dark:border-0 flex sm:flex-row flex-col gap-3 justify-between self-start">
        <h2 className="md:text-2xl lg:text-xl text-lg font-semibold text-text dark:text-white">
          <p className="flex sm:gap-3 gap-1 items-center flex-wrap">
            <span>Welcome {fullname ?? "User"}</span>
            <FaEdit
              className="text-btn-200 hover:scale-105 cursor-pointer"
              onClick={() => navigate("/orgprofile")}
            />
          </p>
          <p className="text-sm font-medium text-gray-400 dark:text-gray-200">
            Organization:
            <span className="uppercase text-slate-500 dark:text-slate-50 pl-1">
              {user?.businessName}
            </span>
          </p>
        </h2>
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="flex flex-wrap md:px-4 cursor-pointer md:py-2 p-3 rounded-2xl md:text-lg sm:text-sm text-xs bg-btn-200 dark:bg-btn-300 text-white gap-1 hover:inset-shadow-sm/40 justify-center items-center"
        >
          Upload Documents <FiPlus />
        </button>
      </div>
      <DocuementUploadDialog dialogRef={dialogRef} />
    </div>
  );
};

export default OrgInfo;