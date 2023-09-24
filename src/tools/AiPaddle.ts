export default class AiPaddle {
  paddleWidth: number;
  paddleHeight: number;
  canvas: HTMLCanvasElement;
  paddleY: number;
  paddleSpeed: number;

  constructor(canvas: HTMLCanvasElement, paddleWidth: number, paddleHeight: number, speed: number) {
    this.canvas = canvas;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.paddleY = canvas.height / 2 - paddleHeight / 2;
    this.paddleSpeed = speed;
  }

  drawPaddle(ctx: CanvasRenderingContext2D, ballY: number) {
    this.trackBall(ballY);

    ctx.fillStyle = "white";

    ctx.fillRect(this.canvas.width - 30, this.paddleY, this.paddleWidth, this.paddleHeight);
  }

  private trackBall(ballY: number) {
    const paddleCenter = this.paddleY + this.paddleHeight / 2;

    if (ballY > paddleCenter) {
      if (ballY - paddleCenter > this.paddleSpeed) this.paddleY += this.paddleSpeed;
      else this.paddleY += ballY - paddleCenter;
    } else if (ballY < paddleCenter) {
      if (ballY - paddleCenter < -this.paddleSpeed) this.paddleY -= this.paddleSpeed;
      else this.paddleY -= (ballY - paddleCenter) * -1;
    }
  }
}
