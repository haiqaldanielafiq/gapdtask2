"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LivesDisplay({ lives }: { lives: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] text-gray-500 mb-1 uppercase tracking-tighter">Lives</span>
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              scale: i < lives ? 1 : 0.8,
              opacity: i < lives ? 1 : 0.2
            }}
          >
            <Heart
              size={20}
              className={i < lives ? "fill-neon-pink text-neon-pink" : "text-gray-600"}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
