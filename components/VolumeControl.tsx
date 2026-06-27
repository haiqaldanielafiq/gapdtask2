"use client";

import { useGameStore } from "@/lib/store";
import { Volume2, VolumeX } from "lucide-react";

export default function VolumeControl() {
  const { volume, muted, setVolume, toggleMute } = useGameStore();

  return (
    <div className="flex items-center gap-6 p-4 bg-gray-900 border-2 border-gray-800 rounded-lg">
      <button
        onClick={toggleMute}
        className="text-neon-blue hover:scale-110 transition-transform"
      >
        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="flex-1 accent-neon-blue h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />

      <span className="text-[10px] text-neon-blue w-8">{Math.round(volume * 100)}%</span>
    </div>
  );
}
