export class CollisionManager {
  static checkWall(x: number, y: number, maze: number[][]): boolean {
    const gridX = Math.floor(x);
    const gridY = Math.floor(y);

    if (gridY < 0 || gridY >= maze.length || gridX < 0 || gridX >= maze[0].length) {
      return true;
    }

    return maze[gridY][gridX] === 1;
  }

  static checkEntityCollision(e1: { x: number, y: number, radius: number }, e2: { x: number, y: number, radius: number }): boolean {
    const dx = e1.x - e2.x;
    const dy = e1.y - e2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < e1.radius + e2.radius;
  }
}
