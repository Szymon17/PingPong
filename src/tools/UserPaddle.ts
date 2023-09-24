export default class UserPaddle {
  paddleWidth: number;
  paddleHeight: number;
  canvas: HTMLCanvasElement;
  paddleY: number;

  constructor(canvas: HTMLCanvasElement, paddleWidth: number, paddleHeight: number) {
    this.canvas = canvas;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.paddleY = null;
  }

  draw(ctx: CanvasRenderingContext2D, y: number) {
    ctx.fillStyle = "white";

    if (y > this.canvas.height - this.paddleHeight) y = this.canvas.height - this.paddleHeight;
    this.paddleY = y;

    ctx.fillRect(0 + 30, y, this.paddleWidth, this.paddleHeight);
  }

  reset() {
    this.paddleY = this.canvas.height / 2 - this.paddleHeight / 2;
  }
}
