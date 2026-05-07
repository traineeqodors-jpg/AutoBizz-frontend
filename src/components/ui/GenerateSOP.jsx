"use client";

import { useEffect, useRef, useState } from "react";
import { GrMagic } from "react-icons/gr";
import videoAvatar from "@/Json data/simliAvatars.json";
import { toast } from "react-hot-toast";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CustomToast from "./CustomToast";
import GenerateScript from "./GenerateScript";
import { useGenerateScriptMutation } from "@/features/slices/scriptGenerationSlice";
import { useGetMyDocumentsQuery } from "@/features/slices/documentSlice";
import { useGenerateVideoMutation } from "@/features/slices/videoGenerationSlice";
import GenerateVideo from "./GenerateVideo";

function GenerateSOP({ isHome }) {
  const [aiContext, setAiContext] = useState(null);
  const [query, setQuery] = useState("");

  const [script, { isLoading, isFetching }] = useGenerateScriptMutation();

  const [selectedAvatar, setSelectedAvatar] = useState({
    avatar_id: videoAvatar.avatars[0].talking_photo_id,
    voice_id: videoAvatar.avatars[0].voice_id,
  });

  const activeRequestRef = useRef(null);

  const { data } = useGetMyDocumentsQuery();

  const documents = data?.data || [];

  const router = useRouter();

  const [generateVideo, { isLoading: videoLoading }] =
    useGenerateVideoMutation();

  const [videoScript, setVideoScript] = useState("");

  const genVideoRef = useRef(null);

  const genScriptRef = useRef(null);

  useEffect(() => {
    const currentRequest = activeRequestRef.current;

    return () => {
      if (currentRequest) {
        currentRequest.abort();
      }
    };
  }, []);

  async function handleSOPVideoGeneration(e) {
    e.preventDefault();

    if (!videoScript.trim()) {
      return toast.error("No Scirpt Found");
    }
    const requestBody = {
      videoTitle: query || "SOP Training Video",
      script: videoScript,
      avatar_id: selectedAvatar.avatar_id,
      voice_id: selectedAvatar.voice_id,
    };

    try {
      await generateVideo(requestBody).unwrap();
      toast.custom((t) => (
        <CustomToast
          t={t}
          toastTitle={"Generating your SOP Video"}
          toastMessage={"This may take few minutes. Check Status on SOP Page"}
          router={router}
          navLink={"org/sop"}
        />
      ));
      genVideoRef.current?.close();
    } catch (err) {
      console.error("Failed to generate video:", err);
    }
  }

  return (
    <div className="w-full flex rounded-2xl lg:col-span-2 xl:col-span-1">
      {isHome ? (
        <div
          id="generate-sop-card"
          onClick={() => genScriptRef.current?.showModal()}
          className="flex xl:h-45 items-center gap-4 p-4 sm:p-6 bg-surface text-text group w-full rounded-2xl transition cursor-pointer shadow-sm hover:shadow-md border border-slate-100 dark:border-gray-800 hover:border-btn-100/30"
        >
          {/* Icon */}
          <div className="p-4 rounded-full bg-linear-to-r from-blue-300 via-indigo-400 to-indigo-600 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
            <FaPlay className="text-white text-xl sm:text-2xl" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center space-y-1 sm:space-y-2">
            <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold">
              Generate SOP Video <GrMagic />
            </h2>

            <p className="text-xs sm:text-sm text-text/70 max-w-md">
              Turn your uploaded documents into engaging training videos using
              AI avatars.
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => genScriptRef.current?.showModal()}
          className="flex gap-3 cursor-pointer justify-center items-center px-2 py-3 lg:text-lg sm:text-md text-sm hover:inset-shadow-sm/40 bg-linear-to-r from-blue-300 via-indigo-400 to-indigo-600 dark:bg-btn-200 text-white w-full rounded-2xl"
        >
          Generate SOP Video <GrMagic />
        </button>
      )}

      <GenerateScript
        genScriptRef={genScriptRef}
        query={query}
        setQuery={setQuery}
        genVideoRef={genVideoRef}
        script={script}
        documents={documents}
        aiContext={aiContext}
        setAiContext={setAiContext}
        setVideoScript={setVideoScript}
        activeRequestRef={activeRequestRef}
      />

      <GenerateVideo
        genVideoRef={genVideoRef}
        genScriptRef={genScriptRef}
        query={query}
        setQuery={setQuery}
        isLoading={isLoading}
        isFetching={isFetching}
        videoScript={videoScript}
        setVideoScript={setVideoScript}
        videoLoading={videoLoading}
        activeRequestRef={activeRequestRef}
        handleSOPVideoGeneration={handleSOPVideoGeneration}
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
        videoAvatar={videoAvatar}
      />
    </div>
  );
}

export default GenerateSOP;
