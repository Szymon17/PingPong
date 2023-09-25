import { ballDirection } from "../types";

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
    this.paddleSpeed = speed;
    this.paddleY = canvas.height / 2 - paddleHeight / 2;
  }

  draw(ctx: CanvasRenderingContext2D, ballY: number, ballDirection: ballDirection) {
    this.trackBall(ballY, ballDirection);

    ctx.fillStyle = "white";

    ctx.fillRect(this.canvas.width - 30, this.paddleY, this.paddleWidth, this.paddleHeight);
  }

  reset() {
    this.paddleY = this.canvas.height / 2 - this.paddleHeight / 2;
  }

  private trackBall(ballY: number, ballDirection: number) {
    const paddleCenter = this.paddleY + this.paddleHeight / 2;

    if (ballDirection === 1) {
      if (ballY > paddleCenter) {
        if (ballY - paddleCenter > this.paddleSpeed) this.paddleY += this.paddleSpeed;
        else this.paddleY += ballY - paddleCenter;
      } else if (ballY < paddleCenter) {
        if (ballY - paddleCenter < -this.paddleSpeed) this.paddleY -= this.paddleSpeed;
        else this.paddleY -= (ballY - paddleCenter) * -1;
      }
    } else if (paddleCenter < this.canvas.height / 2 - this.paddleSpeed || paddleCenter > this.canvas.height / 2 + this.paddleSpeed) {
      if (paddleCenter < this.canvas.height / 2) this.paddleY += this.paddleSpeed;
      else this.paddleY -= this.paddleSpeed;
    }
  }
}
