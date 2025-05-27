"use client";

import * as motion from "motion/react-client";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-base-100 z-30">
      <motion.div
        className="w-16 h-16 rounded-full bg-primary"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.p
        className="mt-4 text-lg text-primary"
        animate={{
          opacity: [1, 0.6, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
