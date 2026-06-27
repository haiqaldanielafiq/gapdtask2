"use client";

import { motion } from "framer-motion";
import Button from "./Button";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

interface QuizModalProps {
  question: Question;
  onAnswer: (index: number) => void;
}

export default function QuizModal({ question, onAnswer }: QuizModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/95 flex items-center justify-center z-[100] p-4"
    >
      <div className="bg-gray-900 border-4 border-neon-blue p-6 md:p-8 rounded-xl max-w-lg w-full">
        <h3 className="text-neon-pink text-xs mb-4 text-center tracking-widest uppercase">Math Quiz</h3>
        <p className="text-lg md:text-xl text-white text-center mb-8 font-bold leading-relaxed">
          {question.text}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="secondary"
              onClick={() => onAnswer(index)}
              className="text-left py-4 px-6"
            >
              <span className="text-neon-blue mr-3">{String.fromCharCode(65 + index)}.</span>
              {option}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
