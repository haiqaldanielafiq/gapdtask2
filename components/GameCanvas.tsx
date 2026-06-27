"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GameEngine } from "@/game/engine/GameEngine";
import { useGameStore } from "@/lib/store";
import { getQuestions, Question } from "@/lib/questions";
import { AudioManager } from "@/game/engine/AudioManager";

import ScoreDisplay from "./ScoreDisplay";
import LivesDisplay from "./LivesDisplay";
import PauseMenu from "./PauseMenu";
import GameOverScreen from "./GameOverScreen";
import VictoryScreen from "./VictoryScreen";
import QuizModal from "./QuizModal";

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const topic = searchParams.get("topic") || "Addition";
  const year = parseInt(searchParams.get("year") || "1");

  const {
    score, lives, isPaused, isGameOver, isVictory, quizQuestion,
    updateScore, loseLife, setPaused, setGameOver, setVictory, setQuizQuestion,
    addHighScore, unlockAchievement, resetGame
  } = useGameStore();

  useEffect(() => {
    AudioManager.init();
    resetGame();

    if (canvasRef.current) {
      const engine = new GameEngine(canvasRef.current);
      engineRef.current = engine;

      engine.onScoreUpdate = (s) => updateScore(s - useGameStore.getState().score);
      engine.onLivesUpdate = () => loseLife();
      engine.onGameOver = (s) => {
        setGameOver(true);
        addHighScore({ topic, year, score: s });
      };
      engine.onVictory = (s) => {
        setVictory(true);
        addHighScore({ topic, year, score: s });
        unlockAchievement("perfect_run");
        AudioManager.play("victory");
      };
      engine.onQuizTriggered = () => {
        const questions = getQuestions(topic, year);
        const randomQ = questions[Math.floor(Math.random() * questions.length)];
        setQuizQuestion(randomQ);
      };

      engine.start();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const currentlyPaused = useGameStore.getState().isPaused;
        setPaused(!currentlyPaused);
        if (!currentlyPaused) engineRef.current?.pause();
        else engineRef.current?.resume();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      engineRef.current?.destroy();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleAnswer = (index: number) => {
    if (!quizQuestion) return;

    if (index === quizQuestion.correctIndex) {
      updateScore(500);
      engineRef.current?.boostGhosts(5000);
      AudioManager.play("correct");
      unlockAchievement("math_wiz");
    } else {
      AudioManager.play("wrong");
    }

    setQuizQuestion(null);
    engineRef.current?.resume();
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* HUD */}
      <div className="absolute top-[-60px] left-0 right-0 flex justify-between items-end px-4">
        <ScoreDisplay score={score} />
        <LivesDisplay lives={lives} />
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="w-full h-full object-contain"
      />

      {isPaused && (
        <PauseMenu
          onResume={() => { setPaused(false); engineRef.current?.resume(); }}
          onQuit={() => router.push("/")}
        />
      )}

      {isGameOver && (
        <GameOverScreen
          score={score}
          onRestart={() => window.location.reload()}
          onHome={() => router.push("/")}
        />
      )}

      {isVictory && (
        <VictoryScreen
          score={score}
          onNextLevel={() => window.location.reload()}
          onHome={() => router.push("/")}
        />
      )}

      {quizQuestion && (
        <QuizModal
          question={quizQuestion}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
