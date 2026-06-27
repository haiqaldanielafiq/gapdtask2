import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HighScore {
  topic: string;
  year: number;
  score: number;
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

interface GameState {
  // Game state
  score: number;
  lives: number;
  isPaused: boolean;
  isGameOver: boolean;
  isVictory: boolean;
  quizQuestion: Question | null;

  // Settings
  volume: number;
  muted: boolean;

  // Persistent data
  highScores: HighScore[];
  achievements: string[];

  // Actions
  updateScore: (points: number) => void;
  loseLife: () => void;
  setPaused: (paused: boolean) => void;
  setGameOver: (over: boolean) => void;
  setVictory: (victory: boolean) => void;
  setQuizQuestion: (question: Question | null) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  addHighScore: (score: HighScore) => void;
  unlockAchievement: (id: string) => void;
  resetProgress: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      score: 0,
      lives: 3,
      isPaused: false,
      isGameOver: false,
      isVictory: false,
      quizQuestion: null,
      volume: 0.5,
      muted: false,
      highScores: [],
      achievements: [],

      updateScore: (points) => set((state) => ({ score: state.score + points })),
      loseLife: () => set((state) => ({ lives: Math.max(0, state.lives - 1) })),
      setPaused: (paused) => set({ isPaused: paused }),
      setGameOver: (over) => set({ isGameOver: over }),
      setVictory: (victory) => set({ isVictory: victory }),
      setQuizQuestion: (question) => set({ quizQuestion: question }),
      setVolume: (volume) => set({ volume }),
      toggleMute: () => set((state) => ({ muted: !state.muted })),

      addHighScore: (newScore) => set((state) => {
        const updated = [...state.highScores, newScore]
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
        return { highScores: updated };
      }),

      unlockAchievement: (id) => set((state) => {
        if (state.achievements.includes(id)) return state;
        return { achievements: [...state.achievements, id] };
      }),

      resetProgress: () => set({
        highScores: [],
        achievements: [],
        score: 0,
        lives: 3,
        isGameOver: false,
        isVictory: false,
      }),

      resetGame: () => set({
        score: 0,
        lives: 3,
        isGameOver: false,
        isVictory: false,
        isPaused: false,
        quizQuestion: null,
      }),
    }),
    {
      name: "math-man-storage",
      partialize: (state) => ({
        highScores: state.highScores,
        achievements: state.achievements,
        volume: state.volume,
        muted: state.muted,
      }),
    }
  )
);
