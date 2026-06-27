import { Ghost } from "../entities/Ghost";
import { Player } from "../entities/Player";
import { CollisionManager } from "../engine/CollisionManager";

export function getGhostDirection(ghost: Ghost, player: Player, maze: number[][]): { x: number, y: number } {
  const directions = [
    { x: 0, y: -1 }, // Up
    { x: 0, y: 1 },  // Down
    { x: -1, y: 0 }, // Left
    { x: 1, y: 0 },  // Right
  ];

  // Filter valid moves (not hitting walls)
  const validMoves = directions.filter(d => {
    return !CollisionManager.checkWall(ghost.x + d.x, ghost.y + d.y, maze);
  });

  if (validMoves.length === 0) return { x: 0, y: 0 };

  if (ghost.isScared) {
    // Move away from player
    return validMoves.sort((a, b) => {
      const distA = Math.hypot(ghost.x + a.x - player.x, ghost.y + a.y - player.y);
      const distB = Math.hypot(ghost.x + b.x - player.x, ghost.y + b.y - player.y);
      return distB - distA;
    })[0];
  }

  // Target-based movement depending on personality
  let target = { x: player.x, y: player.y };

  if (ghost.personality === "random") {
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }

  if (ghost.personality === "predict") {
    // Simple prediction: target a bit ahead of player (this is naive without player direction)
    target = { x: player.x, y: player.y };
  }

  // Find move that gets closest to target
  return validMoves.sort((a, b) => {
    const distA = Math.hypot(ghost.x + a.x - target.x, ghost.y + a.y - target.y);
    const distB = Math.hypot(ghost.x + b.x - target.x, ghost.y + b.y - target.y);
    return distA - distB;
  })[0];
}
