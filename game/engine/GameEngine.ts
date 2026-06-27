import { Player } from "../entities/Player";
import { Ghost } from "../entities/Ghost";
import { Coin } from "../entities/Coin";
import { PowerUp } from "../entities/PowerUp";
import { Renderer } from "./Renderer";
import { InputManager } from "./InputManager";
import { getMaze } from "./MazeGenerator";
import { AudioManager } from "./AudioManager";
import { CollisionManager } from "./CollisionManager";

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private renderer: Renderer;
  private input: InputManager;
  private player: Player;
  private ghosts: Ghost[] = [];
  private coins: Coin[] = [];
  private powerUps: PowerUp[] = [];
  private maze: number[][];
  private tileSize: number = 30;
  private isRunning: boolean = false;
  private lastTime: number = 0;

  public onGameOver?: (score: number) => void;
  public onVictory?: (score: number) => void;
  public onQuizTriggered?: () => void;
  public onScoreUpdate?: (score: number) => void;
  public onLivesUpdate?: (lives: number) => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.maze = getMaze();
    this.tileSize = Math.floor(canvas.width / this.maze[0].length);

    this.renderer = new Renderer(this.ctx, this.tileSize);
    this.input = new InputManager();

    this.player = new Player(9, 14);
    this.initEntities();
  }

  private initEntities() {
    this.ghosts = [
      new Ghost(9, 9, "#ff0000", "chase"),
      new Ghost(8, 9, "#00ffff", "random"),
      new Ghost(10, 9, "#ffb8ff", "predict"),
      new Ghost(9, 8, "#ffb8de", "ambush"),
    ];

    this.coins = [];
    this.powerUps = [];
    for (let y = 0; y < this.maze.length; y++) {
      for (let x = 0; x < this.maze[y].length; x++) {
        if (this.maze[y][x] === 2) this.coins.push(new Coin(x, y));
        if (this.maze[y][x] === 3) this.powerUps.push(new PowerUp(x, y));
      }
    }
  }

  start() {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop();
  }

  pause() {
    this.isRunning = false;
  }

  resume() {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop();
  }

  private loop = () => {
    if (!this.isRunning) return;

    const now = performance.now();
    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;

    this.update(dt);
    this.render();

    requestAnimationFrame(this.loop);
  };

  private update(dt: number) {
    const dir = this.input.getDirection();
    if (dir) {
      const nextX = this.player.x + dir.x * this.player.speed * dt;
      const nextY = this.player.y + dir.y * this.player.speed * dt;

      if (!CollisionManager.checkWall(nextX + (dir.x * 0.4), nextY + (dir.y * 0.4), this.maze)) {
        this.player.x = nextX;
        this.player.y = nextY;
      }
    }

    // Wrap around
    if (this.player.x < 0) this.player.x = this.maze[0].length - 1;
    if (this.player.x > this.maze[0].length - 1) this.player.x = 0;

    // Check coin collection
    this.coins.forEach(coin => {
      if (!coin.collected && CollisionManager.checkEntityCollision(
        { x: this.player.x, y: this.player.y, radius: 0.4 },
        { x: coin.x, y: coin.y, radius: 0.1 }
      )) {
        coin.collected = true;
        this.player.score += 10;
        AudioManager.play("coin");
        this.onScoreUpdate?.(this.player.score);

        if (this.coins.every(c => c.collected)) {
          this.onVictory?.(this.player.score);
          this.isRunning = false;
        }
      }
    });

    // Check PowerUp collection
    this.powerUps.forEach(pu => {
      if (!pu.collected && CollisionManager.checkEntityCollision(
        { x: this.player.x, y: this.player.y, radius: 0.4 },
        { x: pu.x, y: pu.y, radius: 0.3 }
      )) {
        pu.collected = true;
        AudioManager.play("powerup");
        this.onQuizTriggered?.();
        this.isRunning = false;
      }
    });

    // Update ghosts
    this.ghosts.forEach(ghost => {
      ghost.update(dt, this.player, this.maze);

      // Collision with ghost
      if (CollisionManager.checkEntityCollision(
        { x: this.player.x, y: this.player.y, radius: 0.4 },
        { x: ghost.x, y: ghost.y, radius: 0.4 }
      )) {
        if (ghost.isScared) {
          ghost.reset();
          this.player.score += 200;
          this.onScoreUpdate?.(this.player.score);
          AudioManager.play("ghost");
        } else {
          this.handlePlayerDeath();
        }
      }
    });
  }

  private handlePlayerDeath() {
    this.player.lives--;
    this.onLivesUpdate?.(this.player.lives);
    AudioManager.play("wrong");

    if (this.player.lives <= 0) {
      this.onGameOver?.(this.player.score);
      this.isRunning = false;
    } else {
      this.player.x = 9;
      this.player.y = 14;
      this.ghosts.forEach(g => g.reset());
    }
  }

  boostGhosts(duration: number) {
    this.ghosts.forEach(g => {
      g.isScared = true;
      setTimeout(() => g.isScared = false, duration);
    });
  }

  private render() {
    this.renderer.clear();
    this.renderer.drawMaze(this.maze);
    this.coins.forEach(c => this.renderer.drawCoin(c));
    this.powerUps.forEach(p => this.renderer.drawPowerUp(p));
    this.renderer.drawPlayer(this.player);
    this.ghosts.forEach(g => this.renderer.drawGhost(g));
  }

  destroy() {
    this.isRunning = false;
  }
}
