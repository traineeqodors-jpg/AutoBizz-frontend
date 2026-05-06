"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

function AvatarSelection({ selectedAvatar, setSelectedAvatar, videoAvatar }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex-1 bg-surface/60 md:mt-0 mt-4 rounded-xl p-1 flex flex-col gap-2 shadow-sm dark:border dark:border-gray-500">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="font-medium p-2 text-black dark:text-white text-left cursor-pointer flex gap-2 items-center-safe"
      >
        {!isOpen ? <IoMdArrowDropright /> : <IoMdArrowDropdown />}Select Avatar
      </button>

      {/* Animated Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid  sm:grid-cols-2 gap-4 p-4 bg-surface rounded-lg">
              {videoAvatar.avatars.map((avatar) => (
                <div
                  key={avatar.talking_photo_id}
                  onClick={() =>
                    setSelectedAvatar({
                      avatar_id: avatar.talking_photo_id,
                      voice_id: avatar.voice_id,
                    })
                  }
                  className={`cursor-pointer rounded-xl p-1 flex flex-col items-center gap-2 transition-all duration-200 ${
                    avatar.talking_photo_id === selectedAvatar.avatar_id
                      ? "ring-2 ring-btn-100 bg-btn-100/10 scale-[1.02]"
                      : "ring-1 ring-gray-300/40 hover:ring-btn-100/60 hover:scale-[1.02]"
                  }`}
                >
                  <Image
                    src={avatar.preview_image_url}
                    alt={avatar.talking_photo_name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-lg"
                  />

                  <p className="text-xs font-medium text-text dark:text-gray-200">
                    {avatar.talking_photo_name}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AvatarSelection;
