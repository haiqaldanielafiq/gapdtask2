"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "danger" | "success" | "warning";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "border-neon-pink text-neon-pink hover:bg-neon-pink/20",
    secondary: "border-neon-blue text-neon-blue hover:bg-neon-blue/20",
    danger: "border-red-500 text-red-500 hover:bg-red-500/20",
    success: "border-neon-green text-neon-green hover:bg-neon-green/20",
    warning: "border-neon-yellow text-neon-yellow hover:bg-neon-yellow/20",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "px-6 py-3 border-4 rounded-lg font-bold text-xs md:text-sm transition-colors bg-transparent",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
