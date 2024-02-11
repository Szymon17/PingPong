export default class ScoreCounter {
  points: number;
  positionX: number;

  constructor(positionX: number) {
    this.points = 0;
    this.positionX = positionX;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = "bold 50px Arial";

    ctx.fillText(this.points.toString(), this.positionX - 25 / 2, 70);
  }

  addPoint() {
    this.points += 1;
  }

  reset() {
    this.points = 0;
  }
}
