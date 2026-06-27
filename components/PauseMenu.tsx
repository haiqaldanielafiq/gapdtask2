"use client";

import { motion } from "framer-motion";
import Button from "./Button";

interface PauseMenuProps {
  onResume: () => void;
  onQuit: () => void;
}

export default function PauseMenu({ onResume, onQuit }: PauseMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-gray-900 border-4 border-neon-blue p-8 rounded-xl max-w-xs w-full flex flex-col gap-6">
        <h2 className="text-2xl text-neon-blue text-center mb-4">PAUSED</h2>
        <Button variant="secondary" onClick={onResume}>RESUME</Button>
        <Button variant="danger" onClick={onQuit}>QUIT</Button>
      </div>
    </motion.div>
  );
}
