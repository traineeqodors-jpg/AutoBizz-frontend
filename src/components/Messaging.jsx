import { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { RiRobot3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

function Messaging({ setChatIsOpen, chat, setChat }) {
  const [input, setInput] = useState("");

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat]);

  const handleChat = (e) => {
    e.preventDefault();

    // Validation
    if (!input?.trim()) return;

    const userMessage = { role: "user", text: input };

    setChat([...chat, userMessage]);
    setInput("");

    // Simulate/Fetch AI Response
    setTimeout(() => {
      const aiResponse = {
        role: "ai",
        text: "I found the SOP you were looking for!",
      };
      setChat((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 justify-between items-center">
        <h3 className="font-bold flex gap-2 justify-center items-center">
          <span>Ask AI</span>
          <RiRobot3Fill className="text-btn-100" />
        </h3>
        <RxCross2
          className="hover:scale-105 cursor-pointer"
          onClick={() => setChatIsOpen(false)}
        />
      </div>

      {/* Attach ref and keep normal flex-col */}
      <div
        ref={scrollRef}
        className="h-[50vh] sm:w-md bg-white p-2 sm:p-5 font-medium flex flex-col gap-3 overflow-y-auto"
      >
        {/* Welcome Message */}
        {/* <div className="p-2 bg-sidebar w-fit rounded-lg ring ring-btn-50/30 self-start">
          Hello! How can I help with your SOPs?
        </div> */}

        {/* Messages */}
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`p-2  w-fit rounded-lg ring ring-btn-50/30 ${msg.role === "user" ? "self-end bg-btn-50/20" : "self-start bg-sidebar"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-1 w-full bg-white rounded-2xl p-2 items-center">
        <form
          onSubmit={handleChat}
          className="flex flex-row gap-1 w-full items-center"
        >
          <input
            className="w-full px-2 py-1 sm:py-3 border-0 outline-0"
            placeholder="Type Message..."
            onChange={(e) => setInput(e.target.value)}
            value={input || ""}
          />
          <button type="submit">
            <IoSend className="text-btn-200 size-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messaging;
