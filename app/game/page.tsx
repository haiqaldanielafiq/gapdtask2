"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GameCanvas = dynamic(() => import("@/components/GameCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] w-full bg-black border-4 border-neon-pink">
      <div className="text-neon-pink animate-pulse">LOADING GAME...</div>
    </div>
  ),
});

export default function GamePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <Suspense fallback={<div>Loading Search Params...</div>}>
          <GameContainer />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function GameContainer() {
  return (
    <div className="relative w-full max-w-[800px] aspect-[4/3] bg-black border-4 border-neon-blue shadow-neon-blue">
      <GameCanvas />
    </div>
  );
}
