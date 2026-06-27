"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl md:text-6xl text-center neon-text-pink mb-12 leading-relaxed"
        >
          MATH MAN
        </motion.h1>

        <div className="flex flex-col gap-6 w-full max-w-xs">
          <MenuButton href="/play" color="pink">PLAY</MenuButton>
          <MenuButton href="/leaderboard" color="blue">LEADERBOARD</MenuButton>
          <MenuButton href="/achievements" color="green">ACHIEVEMENTS</MenuButton>
          <MenuButton href="/settings" color="yellow">SETTINGS</MenuButton>
          <MenuButton href="/about" color="orange">ABOUT</MenuButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function MenuButton({ href, color, children }: { href: string, color: string, children: React.ReactNode }) {
  const colorClasses: Record<string, string> = {
    pink: "border-neon-pink text-neon-pink hover:bg-neon-pink/20",
    blue: "border-neon-blue text-neon-blue hover:bg-neon-blue/20",
    green: "border-neon-green text-neon-green hover:bg-neon-green/20",
    yellow: "border-neon-yellow text-neon-yellow hover:bg-neon-yellow/20",
    orange: "border-neon-orange text-neon-orange hover:bg-neon-orange/20",
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className={`block w-full text-center py-4 border-4 rounded-lg text-sm md:text-base font-bold transition-colors ${colorClasses[color]}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
