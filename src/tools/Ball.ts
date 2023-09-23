import { paddlesInformations } from "../types";

export default class Ball {
  canvas: HTMLCanvasElement;
  ballSize: number;
  ballSpeed: number[];
  ballMaxSpeed: number;
  ballDirection: number;
  ballPostinion: number[];
  score: boolean;

  constructor(canvas: HTMLCanvasElement, ballSize: number) {
    this.canvas = canvas;
    this.ballSize = ballSize;
    this.ballSpeed = [7, 0];
    this.ballMaxSpeed = 12;
    this.ballDirection = -1;
    this.ballPostinion = [canvas.width / 2, canvas.height / 2];
    this.score = false;
  }

  drawBall(ctx: CanvasRenderingContext2D, paddlesInformations: paddlesInformations) {
    ctx.fillStyle = "white";

    this.changeBallPosition(paddlesInformations);

    ctx.beginPath();
    ctx.arc(this.ballPostinion[0], this.ballPostinion[1], 10, Math.PI * 2, 0);
    ctx.fill();
  }

  private changeBallPosition(paddlesInformations: paddlesInformations) {
    this.boundeBall(paddlesInformations);

    switch (this.ballDirection) {
      case -1:
        this.ballPostinion[0] = this.ballPostinion[0] -= this.ballSpeed[0];
        this.ballPostinion[1] = this.ballPostinion[1] -= this.ballSpeed[1];
        break;

      case 1:
        this.ballPostinion[0] = this.ballPostinion[0] += this.ballSpeed[0];
        this.ballPostinion[1] = this.ballPostinion[1] += this.ballSpeed[1];
        break;
    }
  }

  private boundeBall(paddlesInformations: paddlesInformations) {
    const { playerPaddlePossition, aiPaddlePossition, paddleHeight, paddleWidth } = paddlesInformations;

    const hitPlace = this.ballPostinion[1] - playerPaddlePossition[1];

    if (this.ballPostinion[0] <= playerPaddlePossition[0] + paddleWidth && this.ballPostinion[0] > playerPaddlePossition[0]) {
      if (this.ballPostinion[1] >= playerPaddlePossition[1] && this.ballPostinion[1] <= playerPaddlePossition[1] + paddleHeight) {
        this.addBallSpeed(paddleHeight, hitPlace);
        this.ballDirection *= -1;
      }
    } else if (this.ballPostinion[0] >= aiPaddlePossition[0] - paddleWidth && this.ballPostinion[0] < aiPaddlePossition[0] + paddleWidth) {
      if (this.ballPostinion[1] >= aiPaddlePossition[1] && this.ballPostinion[1] <= aiPaddlePossition[1] + paddleHeight) {
        this.addBallSpeed(paddleHeight, hitPlace * -1);
        this.ballDirection *= -1;
      }
    }

    if (this.ballPostinion[1] >= this.canvas.height || this.ballPostinion[1] <= 0) this.ballSpeed[1] *= -1;
  }

  private addBallSpeed(paddleHeight: number, hitPlace: number) {
    const xSpeed = (paddleHeight / 2 - hitPlace) / 3;
    const ySpeed = ((paddleHeight / 2 - hitPlace) / 5) * -1;

    if (xSpeed > 5 && xSpeed < this.ballMaxSpeed) this.ballSpeed[0] = xSpeed;
    else if (xSpeed < -5 && xSpeed > -this.ballMaxSpeed) this.ballSpeed[0] = xSpeed * -1;
    else if (xSpeed > this.ballMaxSpeed || xSpeed < -this.ballMaxSpeed) this.ballSpeed[0] = this.ballMaxSpeed;
    else this.ballSpeed[0] = 7;

    if (ySpeed >= this.ballMaxSpeed / 1.5 || ySpeed < -this.ballMaxSpeed / 1.5) this.ballSpeed[1] = this.ballMaxSpeed / 1.5;
    else this.ballSpeed[1] = ySpeed;
  }
}
