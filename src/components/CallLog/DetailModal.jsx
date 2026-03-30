import React from 'react'
import { IoClose } from 'react-icons/io5';

const DetailModal = ({setSelectedLog , selectedLog}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop:bg-black/40 dark:backdrop:bg-gray-700/40 transition-all"
      onClick={() => setSelectedLog(null)}
    >
      <div
        className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800">
          <h2 className="text-xl font-bold text-text dark:text-white tracking-tight">
            Call Transcript
          </h2>
          <button
            onClick={() => setSelectedLog(null)}
            className="p-2 text-gray-400 hover:bg-white rounded-full transition-all"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* CONVERSATION CONTAINER: Fixed height and Scrollable */}
          <div className="max-h-100 hideScrollBar overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
            {selectedLog.transcript ? (
              selectedLog.transcript.split("\n").map((line, index) => {
                const isUser = line.startsWith("User:");
                const isAI = line.startsWith("AI:");
                const message = line.replace(/^(User:|AI:)\s*/, "");

                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <span className="text-[10px] uppercase font-bold text-gray-400 mb-1 px-2">
                      {isUser ? "You" : "AI Assistant"}
                    </span>
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                        isUser
                          ? "bg-btn-100 dark:bg-btn-300 text-white rounded-tr-none"
                          : "bg-gray-100 dark:bg-gray-200 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      {message}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 text-gray-400 italic">
                No transcript available.
              </div>
            )}
          </div>

          <button
            onClick={() => setSelectedLog(null)}
            className="w-full bg-btn-100 dark:bg-btn-200 dark:hover:bg-btn-300  hover:bg-btn-200 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-95"
          >
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailModal