import { Coordinates, paddlesInformations } from "../types";

type score = false | "player" | "ai";

export default class Ball {
  canvas: HTMLCanvasElement;
  ballSize: number;
  ballSpeed: Coordinates;
  ballMaxSpeed: number;
  ballDirection: -1 | 1;
  ballPostinion: Coordinates;
  score: score;

  constructor(canvas: HTMLCanvasElement, ballSize: number) {
    this.canvas = canvas;
    this.ballSize = ballSize;
    this.ballMaxSpeed = 12;
    this.ballDirection = -1;
    this.ballPostinion = { x: canvas.width / 2, y: canvas.height / 2 };
    this.ballSpeed = { x: 7, y: 0 };
    this.score = false;
  }

  draw(ctx: CanvasRenderingContext2D, paddlesInformations: paddlesInformations) {
    this.changeBallPosition(paddlesInformations);

    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(this.ballPostinion.x, this.ballPostinion.y, 10, Math.PI * 2, 0);
    ctx.fill();
  }

  private changeBallPosition(paddlesInformations: paddlesInformations) {
    this.checkBallBounce(paddlesInformations);

    switch (this.ballDirection) {
      case -1:
        this.ballPostinion.x = this.ballPostinion.x -= this.ballSpeed.x;
        this.ballPostinion.y = this.ballPostinion.y -= this.ballSpeed.y;
        break;

      case 1:
        this.ballPostinion.x = this.ballPostinion.x += this.ballSpeed.x;
        this.ballPostinion.y = this.ballPostinion.y += this.ballSpeed.y;
        break;
    }
  }

  private checkBallBounce(paddlesInformations: paddlesInformations) {
    const { playerPaddlePossition, aiPaddlePossition, paddleHeight, paddleWidth } = paddlesInformations;

    if (this.ballPostinion.x <= playerPaddlePossition.x + paddleWidth + this.ballSize && this.ballPostinion.x > 0) {
      if (this.ballPostinion.y >= playerPaddlePossition.y && this.ballPostinion.y <= playerPaddlePossition.y + paddleHeight) {
        const hitPlace = this.ballPostinion.y - playerPaddlePossition.y;
        this.addBallSpeed(paddleHeight, hitPlace);
        this.ballDirection = 1;
      }
    } else if (this.ballPostinion.x >= aiPaddlePossition.x - paddleWidth && this.ballPostinion.x < this.canvas.width) {
      if (this.ballPostinion.y >= aiPaddlePossition.y && this.ballPostinion.y <= aiPaddlePossition.y + paddleHeight) {
        const hitPlace = this.ballPostinion.y - playerPaddlePossition.y;
        this.addBallSpeed(paddleHeight, hitPlace * -1);
        this.ballDirection = -1;
      }
    }

    if (this.ballPostinion.y >= this.canvas.height || this.ballPostinion.y <= 0) this.ballSpeed.y *= -1;
  }

  private addBallSpeed(paddleHeight: number, hitPlace: number) {
    const xSpeed = (paddleHeight / 2 - hitPlace) / 3;
    const ySpeed = ((paddleHeight / 2 - hitPlace) / 5) * -1;

    if (xSpeed > 5 && xSpeed < this.ballMaxSpeed) this.ballSpeed.x = xSpeed;
    else if (xSpeed < -5 && xSpeed > -this.ballMaxSpeed) this.ballSpeed.x = xSpeed * -1;
    else if (xSpeed > this.ballMaxSpeed || xSpeed < -this.ballMaxSpeed) this.ballSpeed.x = this.ballMaxSpeed;
    else this.ballSpeed.x = 7;

    if (ySpeed >= this.ballMaxSpeed / 1.5) this.ballSpeed.y = this.ballMaxSpeed / 1.5;
    else if (ySpeed < -this.ballMaxSpeed / 1.5) this.ballSpeed.y = (this.ballMaxSpeed / 1.5) * -1;
    else this.ballSpeed.y = ySpeed;
  }

  checkScore(): score {
    if (this.ballPostinion.x + this.ballSize < 0) return "ai";
    else if (this.ballPostinion.x + this.ballSize > this.canvas.width) return "player";
    else return false;
  }

  reset() {
    this.ballPostinion = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    this.ballSpeed = { x: 7, y: 0 };
    this.score = false;
  }
}
