import { paddlesInformations, settings } from "./types";
import UserPaddle from "./tools/UserPaddle";
import AiPaddle from "./tools/AiPaddle";
import Ball from "./tools/Ball";
import ScoreCounter from "./tools/ScoreCounter";

export default class Game {
  shouldAnimate: boolean;
  paddleWidth: number;
  paddleHeight: number;
  ballSize: number;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cursorY: number;

  PlayerPaddle: UserPaddle;
  BotPaddle: AiPaddle;
  GameBall: Ball;
  PlayerScoreCounter: ScoreCounter;
  AiScoreCounter: ScoreCounter;

  constructor(settings: settings) {
    this.shouldAnimate = false;
    this.paddleWidth = 10;
    this.paddleHeight = window.innerHeight / 10;
    this.ballSize = 10;

    this.canvas = null;
    this.ctx = null;
    this.cursorY = null;

    this.initCanvas(window.innerWidth, window.innerHeight);

    this.PlayerPaddle = new UserPaddle(this.canvas, this.paddleWidth, this.paddleHeight);
    this.BotPaddle = new AiPaddle(this.canvas, this.paddleWidth, this.paddleHeight, settings.aiSpeed);
    this.GameBall = new Ball(this.canvas, this.ballSize, settings.ballSpeed);
    this.PlayerScoreCounter = new ScoreCounter(this.canvas.width / 2 - 70);
    this.AiScoreCounter = new ScoreCounter(this.canvas.width / 2 + 70);
  }

  startGame() {
    this.shouldAnimate = true;
    this.generateFrame();
  }

  resetGame() {
    this.PlayerPaddle.reset();
    this.BotPaddle.reset();
    this.GameBall.reset();
  }

  stopGame() {
    this.shouldAnimate = false;
    this.AiScoreCounter.reset();
    this.PlayerScoreCounter.reset();
    this.resetGame();
  }

  private generateFrame() {
    this.renderGame();

    const score = this.GameBall.checkScore();

    if (score) {
      score === "player" ? this.PlayerScoreCounter.addPoint() : this.AiScoreCounter.addPoint();
      this.resetGame();
    }

    if (this.shouldAnimate) requestAnimationFrame(this.generateFrame.bind(this));
  }

  private getPaddleInformations(): paddlesInformations {
    return {
      paddleWidth: this.paddleWidth,
      paddleHeight: this.paddleHeight,
      playerPaddlePossition: { x: 30, y: this.PlayerPaddle.paddleY },
      aiPaddlePossition: { x: this.canvas.width - 30, y: this.BotPaddle.paddleY },
    };
  }

  private renderGame() {
    this.renderBoard();
    this.PlayerPaddle.draw(this.ctx, this.cursorY);
    this.BotPaddle.draw(this.ctx, this.GameBall.ballPostinion.y, this.GameBall.ballDirection);
    this.GameBall.draw(this.ctx, this.getPaddleInformations());
    this.PlayerScoreCounter.draw(this.ctx);
    this.AiScoreCounter.draw(this.ctx);
  }

  private renderBoard() {
    this.ctx.fillStyle = "black";

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.strokeStyle = "white";

    this.ctx.beginPath();
    this.ctx.setLineDash([10]);
    this.ctx.moveTo(this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
    this.ctx.stroke();
  }

  private initCanvas(width: number, height: number) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    this.ctx = ctx;
    this.canvas = canvas;

    canvas.width = width;
    canvas.height = height;

    canvas.addEventListener("mousemove", e => {
      this.cursorY = e.clientY;
    });

    document.body.innerHTML = "";
    document.body.appendChild(this.canvas);

    this.renderBoard();
  }
}
