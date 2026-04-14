import { FaRegUser } from "react-icons/fa";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { RiRobot3Line } from "react-icons/ri";
import ProcessCard from "./ProcessCard";

export default function ProcessSection() {
  return (
    <>
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
            logo={<IoDocumentAttachOutline className="size-6 sm:size-8" />}
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
    </>
  );
}
