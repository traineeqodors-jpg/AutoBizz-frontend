import React from 'react'
import { motion } from "framer-motion";

function CustomBeacon({ beaconRef, onClick, onMouseEnter, ...rest }) {
  return (
    <div
      ref={beaconRef}
      className="relative flex items-center justify-center w-10 h-10"
    >
      {/* 1. The Glassy Outer Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-500/30 bg-surface backdrop-blur-[2px]"
        initial={{ scale: 1, opacity: 0 }}
        animate={{
          scale: [1, 2.2],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. Soft Secondary Pulse */}
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-surface"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* 3. The Core Dot - Matches your UI Surface */}
      <div className="relative z-10 flex items-center justify-center w-4 h-4 rounded-full bg-surface border-2 border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.4)]">
        {/* Inner solid point */}
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
      </div>

      {/* 4. Subtle Radial Gradient Shadow */}
      <div className="absolute -bottom-2 w-4 h-1 bg-black/10 blur-[2px] rounded-[100%]" />
    </div>
  );
}

export default CustomBeacon