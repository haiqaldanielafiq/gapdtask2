"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useGameStore } from "@/lib/store";
import { ACHIEVEMENTS } from "@/lib/achievements";

export default function AchievementsPage() {
  const unlocked = useGameStore((state) => state.achievements);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl text-neon-green mb-8 text-center">ACHIEVEMENTS</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlocked.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-4 border-2 rounded-lg transition-all ${
                  isUnlocked ? "border-neon-green bg-neon-green/10" : "border-gray-800 opacity-50"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`text-sm ${isUnlocked ? "text-neon-green" : "text-gray-500"}`}>
                    {ach.name}
                  </h3>
                  {isUnlocked && <span className="text-xs text-neon-green">UNLOCKED</span>}
                </div>
                <p className="text-[10px] text-gray-400">{ach.description}</p>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
