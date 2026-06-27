"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useGameStore } from "@/lib/store";

export default function LeaderboardPage() {
  const highScores = useGameStore((state) => state.highScores);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl text-neon-yellow mb-8 text-center">LEADERBOARD</h2>

        <div className="bg-gray-900 border-2 border-neon-yellow p-6 rounded-lg">
          {highScores.length === 0 ? (
            <p className="text-center text-gray-500">NO SCORES YET</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-neon-blue border-b border-gray-700">
                  <th className="pb-4">TOPIC</th>
                  <th className="pb-4">YEAR</th>
                  <th className="pb-4 text-right">SCORE</th>
                </tr>
              </thead>
              <tbody>
                {highScores.map((score, i) => (
                  <tr key={i} className="border-b border-gray-800 last:border-0">
                    <td className="py-4 text-xs">{score.topic}</td>
                    <td className="py-4">{score.year}</td>
                    <td className="py-4 text-right text-neon-green">{score.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
