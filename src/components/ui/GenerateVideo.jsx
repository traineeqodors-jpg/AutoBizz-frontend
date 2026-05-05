"use client";
import { GrMagic } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import AvatarSelection from "./AvatarSelection";

function GenerateVideo({
  genVideoRef,
  isLoading,
  isFetching,
  videoScript,
  setVideoScript,
  videoLoading,
  genScriptRef,
  activeRequestRef,
  handleSOPVideoGeneration,
  selectedAvatar,
  setSelectedAvatar,
  videoAvatar,
}) {
  const isDisabled =
    videoLoading || !videoScript?.trim();
  return (
    <dialog
      ref={genVideoRef}
      className="w-lg rounded-3xl bg-back dark:bg-gray-900 hideScrollBar m-auto  p-5 backdrop:bg-text/40 dark:backdrop:bg-gray-700/40 space-y-5"
    >
      {/* Form  */}
      <form
        onSubmit={(e) => handleSOPVideoGeneration(e)}
        className="w-full space-y-6 p-2"
      >
        {/* Heading Container */}

        <div className="w-full flex flex-row justify-between sticky top-3 z-50">
          <button
            onClick={() => {
              genVideoRef.current?.close();
              activeRequestRef.current?.abort();
              genScriptRef.current?.showModal();
            }}
            type="button"
          >
            <IoMdArrowRoundBack className="text-black dark:text-white size-4 cursor-pointer hover:bg-gray-800/80 dark:hover:bg-white dark:hover:text-black hover:text-white rounded-full" />
          </button>
          <button
            onClick={() => {
              activeRequestRef.current?.abort();
              genVideoRef.current?.close();
            }}
            type="button"
          >
            <IoCloseSharp className="text-black dark:text-white size-4 cursor-pointer hover:bg-gray-800/80 dark:hover:bg-white dark:hover:text-black hover:text-white rounded-full" />
          </button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text dark:text-white tracking-tight">
            SOP Video Script
          </h1>
        </div>

        {/* Text Area */}
        <div className="relative">
          {isLoading || isFetching ? (
            <div className="h-[20vh] w-full p-4 flex flex-col gap-4 justify-center items-center ">
              <div className="scriptLoader mx-auto"></div>
              <p className="text-sm uppercase tracking-wider text-slate-500 dark:text-gray-300 typewriter">
                Generating SOP Script
              </p>
            </div>
          ) : (
            <>
              <textarea
                rows={13}
                className="w-full hideScrollBar py-3 px-4 text-text dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-100 outline-none transition-all pr-12"
                placeholder="Your SOP Script"
                value={videoScript}
                onChange={(e) => setVideoScript(e.target.value)}
              />
              <AvatarSelection
                selectedAvatar={selectedAvatar}
                setSelectedAvatar={setSelectedAvatar}
                videoAvatar={videoAvatar}
              />
            </>
          )}
        </div>
        {isLoading || isFetching ? null : (
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full  py-3 bg-btn-100 hover:bg-btn-200 ${isLoading ? `hidden` : null} text-white font-bold flex justify-center items-center gap-2  rounded-xl shadow-lg dark:shadow-sm dark:hover:shadow-md shadow-btn-50/30 hover:shadow-xl hover:shadow-btn-200/40 transform hover:-translate-y-0.5 transition-all  ${isDisabled && "opacity-60 cursor-not-allowed hover:shadow-none hover:transform-none"}`}
          >
            {videoLoading ? `Generating Video` : `Generate Video`} <GrMagic />
          </button>
        )}
      </form>
    </dialog>
  );
}

export default GenerateVideo;
