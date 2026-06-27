"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const topics = ["Addition", "Subtraction", "Multiplication", "Division", "Geometry"];
const years = [1, 2, 3, 4, 5, 6];

export default function PlayPage() {
  const router = useRouter();

  const handleSelect = (topic: string, year: number) => {
    router.push(`/game?topic=${topic}&year=${year}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl text-neon-blue mb-8 text-center">SELECT TOPIC & YEAR</h2>

        <div className="grid gap-8">
          {topics.map((topic) => (
            <div key={topic} className="border-2 border-gray-800 p-4 rounded-xl">
              <h3 className="text-lg text-neon-pink mb-4">{topic}</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleSelect(topic, year)}
                    className="py-3 px-1 border-2 border-neon-blue text-[10px] rounded hover:bg-neon-blue/20 transition-colors"
                  >
                    YEAR {year}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
