"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VolumeControl from "@/components/VolumeControl";
import { useGameStore } from "@/lib/store";

export default function SettingsPage() {
  const resetProgress = useGameStore((state) => state.resetProgress);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 max-w-xl mx-auto w-full">
        <h2 className="text-2xl text-neon-yellow mb-12 text-center">SETTINGS</h2>

        <div className="space-y-12">
          <section>
            <h3 className="text-lg text-neon-blue mb-6">AUDIO</h3>
            <VolumeControl />
          </section>

          <section>
            <h3 className="text-lg text-neon-pink mb-6">DATA</h3>
            <button
              onClick={() => {
                if (confirm("Reset all progress? High scores and achievements will be lost.")) {
                  resetProgress();
                }
              }}
              className="w-full py-4 border-4 border-red-600 text-red-600 hover:bg-red-600/20 transition-colors text-sm rounded-lg"
            >
              RESET PROGRESS
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
