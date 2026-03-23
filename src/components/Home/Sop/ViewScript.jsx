import { IoMdArrowRoundBack } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const ViewScript = ({ viewScriptRef, script }) => {
  return (
    <dialog
      ref={viewScriptRef}
      className="w-lg rounded-3xl bg-back m-auto p-5 backdrop:bg-text/40 space-y-5"
    >
      {/* Form  */}
      <form className="w-full space-y-3 p-2">
        {/* Heading Container */}
        <div className="w-full flex flex-row justify-between">
          <button onClick={() => viewScriptRef.current?.close()} type="button">
            <IoCloseSharp className="text-black size-4 cursor-pointer" />
          </button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text tracking-tight">
            SOP Video Script
          </h1>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            rows={13}
            disabled
            className="w-full hideScrollBar py-3 px-4 text-text rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-btn-100 outline-none transition-all pr-12" // Added pr-12 (padding-right) to ensure text doesn't go under the button
            placeholder="Your SOP Script"
            value={script}
            // onChange={(e) => setVideoScript(e.target.value)}
          />
        </div>
      </form>
    </dialog>
  );
};

export default ViewScript;