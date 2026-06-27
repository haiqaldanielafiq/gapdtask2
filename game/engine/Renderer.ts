import { Player } from "../entities/Player";
import { Ghost } from "../entities/Ghost";
import { Coin } from "../entities/Coin";
import { PowerUp } from "../entities/PowerUp";

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private tileSize: number;

  constructor(ctx: CanvasRenderingContext2D, tileSize: number) {
    this.ctx = ctx;
    this.tileSize = tileSize;
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawMaze(maze: number[][]) {
    this.ctx.shadowBlur = 0;
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        if (maze[y][x] === 1) {
          this.ctx.fillStyle = "#1a1a2e";
          this.ctx.strokeStyle = "#00ffff";
          this.ctx.lineWidth = 2;
          this.ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
          this.ctx.fillRect(x * this.tileSize + 4, y * this.tileSize + 4, this.tileSize - 8, this.tileSize - 8);
        }
      }
    }
  }

  drawPlayer(player: Player) {
    const x = player.x * this.tileSize + this.tileSize / 2;
    const y = player.y * this.tileSize + this.tileSize / 2;
    const radius = (this.tileSize / 2) * 0.8;

    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = "#ff00ff";
    this.ctx.fillStyle = "#ff00ff";
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Eyes
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(x - 4, y - 4, 3, 0, Math.PI * 2);
    this.ctx.arc(x + 4, y - 4, 3, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawGhost(ghost: Ghost) {
    const x = ghost.x * this.tileSize + this.tileSize / 2;
    const y = ghost.y * this.tileSize + this.tileSize / 2;
    const size = this.tileSize * 0.8;

    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = ghost.isScared ? "#ffffff" : ghost.color;
    this.ctx.fillStyle = ghost.isScared ? "#0000ff" : ghost.color;

    this.ctx.beginPath();
    this.ctx.moveTo(x, y - size / 2);
    this.ctx.lineTo(x - size / 2, y + size / 2);
    this.ctx.lineTo(x + size / 2, y + size / 2);
    this.ctx.closePath();
    this.ctx.fill();

    // Scared eyes or regular eyes
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(x - 3, y, 2, 0, Math.PI * 2);
    this.ctx.arc(x + 3, y, 2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawCoin(coin: Coin) {
    if (coin.collected) return;
    const x = coin.x * this.tileSize + this.tileSize / 2;
    const y = coin.y * this.tileSize + this.tileSize / 2;

    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = "#ffff00";
    this.ctx.fillStyle = "#ffff00";
    this.ctx.beginPath();
    this.ctx.arc(x, y, 3, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawPowerUp(pu: PowerUp) {
    if (pu.collected) return;
    const x = pu.x * this.tileSize + this.tileSize / 2;
    const y = pu.y * this.tileSize + this.tileSize / 2;
    const size = 10;

    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = "#00ff00";
    this.ctx.fillStyle = "#00ff00";
    this.ctx.fillRect(x - size / 2, y - size / 2, size, size);
  }
}
