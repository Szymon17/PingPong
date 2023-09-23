export default class AiPaddle {
  paddleWidth: number;
  paddleHeight: number;
  canvas: HTMLCanvasElement;
  paddleY: number;

  constructor(canvas: HTMLCanvasElement, paddleWidth: number, paddleHeight: number) {
    this.canvas = canvas;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.paddleY = canvas.height / 2 - paddleHeight / 2;
  }

  drawPaddle(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";

    ctx.fillRect(this.canvas.width - 30, this.paddleY, this.paddleWidth, this.paddleHeight);
  }
}
