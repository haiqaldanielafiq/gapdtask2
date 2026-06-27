export class InputManager {
  private keys: Record<string, boolean> = {};

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", (e) => {
        this.keys[e.key] = true;
      });
      window.addEventListener("keyup", (e) => {
        this.keys[e.key] = false;
      });
    }
  }

  isDown(key: string): boolean {
    return !!this.keys[key];
  }

  getDirection(): { x: number; y: number } | null {
    if (this.isDown("ArrowUp") || this.isDown("w")) return { x: 0, y: -1 };
    if (this.isDown("ArrowDown") || this.isDown("s")) return { x: 0, y: 1 };
    if (this.isDown("ArrowLeft") || this.isDown("a")) return { x: -1, y: 0 };
    if (this.isDown("ArrowRight") || this.isDown("d")) return { x: 1, y: 0 };
    return null;
  }

  destroy() {
    // Optional: cleanup event listeners if needed
  }
}
