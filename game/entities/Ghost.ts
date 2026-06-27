import { Player } from "./Player";
import { getGhostDirection } from "../ai/ghostAI";
import { CollisionManager } from "../engine/CollisionManager";

export type GhostPersonality = "chase" | "random" | "predict" | "ambush";

export class Ghost {
  public x: number;
  public y: number;
  public startX: number;
  public startY: number;
  public color: string;
  public personality: GhostPersonality;
  public speed: number = 3;
  public isScared: boolean = false;
  private moveBuffer: number = 0;
  private currentDir: { x: number, y: number } = { x: 0, y: 0 };

  constructor(x: number, y: number, color: string, personality: GhostPersonality) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.color = color;
    this.personality = personality;
  }

  update(dt: number, player: Player, maze: number[][]) {
    const actualSpeed = this.isScared ? this.speed * 0.5 : this.speed;

    // Simple grid-based movement
    if (Math.abs(this.x - Math.round(this.x)) < 0.1 && Math.abs(this.y - Math.round(this.y)) < 0.1) {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);

      const dir = getGhostDirection(this, player, maze);
      this.currentDir = dir;
    }

    const nextX = this.x + this.currentDir.x * actualSpeed * dt;
    const nextY = this.y + this.currentDir.y * actualSpeed * dt;

    if (!CollisionManager.checkWall(nextX + this.currentDir.x * 0.4, nextY + this.currentDir.y * 0.4, maze)) {
      this.x = nextX;
      this.y = nextY;
    } else {
      // If hit wall, stop and wait for next grid alignment to pick new dir
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
    }
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
    this.isScared = false;
  }
}
