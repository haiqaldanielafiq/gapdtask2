export interface Achievement {
  id: string;
  name: string;
  description: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first_coin", name: "FIRST COIN", description: "Collect your first coin" },
  { id: "math_wiz", name: "MATH WIZ", description: "Answer 5 questions correctly in one game" },
  { id: "survivor", name: "SURVIVOR", description: "Complete a level with only 1 life left" },
  { id: "perfect_run", name: "PERFECT RUN", description: "Complete a level without losing any lives" },
  { id: "high_score_1000", name: "CENTURY", description: "Reach a score of 1000" },
  { id: "ghost_buster", name: "GHOST BUSTER", description: "Collect a power-up and scare the ghosts" },
];
