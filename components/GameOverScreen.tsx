"use client";

import { motion } from "framer-motion";
import Button from "./Button";

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  onHome: () => void;
}

export default function GameOverScreen({ score, onRestart, onHome }: GameOverScreenProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="absolute inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-gray-900 border-4 border-red-600 p-8 rounded-xl max-w-sm w-full text-center">
        <h2 className="text-3xl text-red-600 mb-2">GAME OVER</h2>
        <div className="mb-8">
          <p className="text-gray-500 text-xs mb-2">FINAL SCORE</p>
          <p className="text-4xl text-neon-yellow">{score}</p>
        </div>
        <div className="flex flex-col gap-4">
          <Button variant="primary" onClick={onRestart}>PLAY AGAIN</Button>
          <Button variant="secondary" onClick={onHome}>MAIN MENU</Button>
        </div>
      </div>
    </motion.div>
  );
}
