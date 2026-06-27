export class Player {
  public x: number;
  public y: number;
  public score: number = 0;
  public lives: number = 3;
  public speed: number = 4; // units per second

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
