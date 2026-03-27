import { useEffect, useRef, useState } from "react";
import { GrMagic } from "react-icons/gr";
import { useGenerateVideoMutation } from "../../../features/slices/videoGenerationSlice";
import { useGetMyDocumentsQuery } from "../../../features/slices/documentSlice";
import { useGenerateScriptMutation } from "../../../features/slices/scriptGenerationSlice";
import GenerateVideo from "./GenerateVideo";
import GenerateScript from "./GenerateScript";
import { toast } from "react-toastify";

function GenerateSOP() {
  const [aiContext, setAiContext] = useState(null);

  const [script, { isLoading, isFetching }] = useGenerateScriptMutation();

  const activeRequestRef = useRef(null);

  const { data, isLoading: docsLoading } = useGetMyDocumentsQuery(undefined, {
    skip: !localStorage.getItem("isLoggedIn"),
  }); //fetch documents

  const documents = data?.data || [];

  const [generateVideo, { isLoading: videoLoading }] =
    useGenerateVideoMutation();

  const [videoScript, setVideoScript] = useState("");

  const genVideoRef = useRef(null);

  const genScriptRef = useRef(null);

  useEffect(() => {
    return () => {
      // If the component unmounts while a script is generating, kill the request
      activeRequestRef.current?.abort();
    };
  }, []);

  async function handleSOPVideoGeneration(e) {
    e.preventDefault();
    try {
      const response = await generateVideo(videoScript).unwrap();
      toast.success("Generating your SOP Video");
      genVideoRef.current?.close();
    } catch (err) {
      console.error("Failed to generate video:", err);
    }
  }

  return (
    <div className="w-full flex rounded-2xl">
      <button
        onClick={() => genScriptRef.current?.showModal()}
        className="  flex gap-3 cursor-pointer justify-center items-center px-2 py-3 lg:text-lg sm:text-md text-sm hover:inset-shadow-sm/40 bg-btn-200 text-white w-full rounded-2xl"
      >
        Generate SOP Video <GrMagic />
      </button>

      <GenerateScript
        genScriptRef={genScriptRef}
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
        isLoading={isLoading}
        isFetching={isFetching}
        videoScript={videoScript}
        setVideoScript={setVideoScript}
        videoLoading={videoLoading}
        activeRequestRef={activeRequestRef}
        handleSOPVideoGeneration={handleSOPVideoGeneration}
      />
    </div>
  );
}

export default GenerateSOP;
