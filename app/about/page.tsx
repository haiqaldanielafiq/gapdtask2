"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 max-w-2xl mx-auto w-full leading-relaxed">
        <h2 className="text-2xl text-neon-orange mb-8 text-center">ABOUT MATH MAN</h2>

        <div className="space-y-6 text-sm text-gray-300">
          <p>
            <span className="text-neon-pink">MATH MAN</span> is an educational arcade game designed to make learning mathematics fun and engaging for Malaysian primary school students.
          </p>
          <p>
            Inspired by classic maze games, players must navigate through levels, collect coins, and avoid ghosts. Collecting special coins triggers <span className="text-neon-blue">Mathematics Quizzes</span> based on the KSSR curriculum.
          </p>
          <p>
            Correct answers provide power-ups and extra points, while wrong answers make the ghosts faster!
          </p>
          <div className="pt-8 border-t border-gray-800">
            <h3 className="text-neon-green mb-4 text-base">HOW TO PLAY</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Use <span className="text-neon-yellow">ARROW KEYS</span> to move.</li>
              <li>Collect all <span className="text-neon-yellow">COINS</span> to win.</li>
              <li>Avoid <span className="text-neon-pink">GHOSTS</span>.</li>
              <li>Answer <span className="text-neon-blue">QUIZZES</span> to power up.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
