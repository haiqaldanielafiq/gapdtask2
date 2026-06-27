"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ScoreDisplay({ score }: { score: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] text-gray-500 mb-1 uppercase tracking-tighter">Score</span>
      <div className="text-xl md:text-2xl text-neon-yellow">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={score}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="inline-block"
          >
            {score.toString().padStart(6, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
