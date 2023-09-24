import { paddlesInformations } from "./types";
import GameBoard from "./tools/GameBoard";
import UserPaddle from "./tools/UserPaddle";
import AiPaddle from "./tools/AiPaddle";
import Ball from "./tools/Ball";

export default class Game {
  shouldAnimate: boolean;
  paddleWidth: number;
  paddleHeight: number;
  ballSize: number;

  Board: GameBoard;
  PlayerPaddle: UserPaddle;
  BotPaddle: AiPaddle;
  GameBall: Ball;

  constructor() {
    this.shouldAnimate = false;
    this.paddleWidth = 10;
    this.paddleHeight = window.innerHeight / 10;
    this.ballSize = 10;

    this.Board = new GameBoard(window.innerWidth, window.innerHeight);
    this.PlayerPaddle = new UserPaddle(this.Board.canvas, this.paddleWidth, this.paddleHeight);
    this.BotPaddle = new AiPaddle(this.Board.canvas, this.paddleWidth, this.paddleHeight, 10);
    this.GameBall = new Ball(this.Board.canvas, this.ballSize);

    this.Board.initCanvas();
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

    this.resetGame();
  }

  private generateFrame() {
    this.Board.renderCanvas();
    this.PlayerPaddle.draw(this.Board.ctx, this.Board.cursorY);
    this.BotPaddle.draw(this.Board.ctx, this.GameBall.ballPostinion.y);
    this.GameBall.draw(this.Board.ctx, this.getPaddleInformations());

    const score = this.GameBall.checkScore();
    if (score) this.resetGame();

    if (this.shouldAnimate) requestAnimationFrame(this.generateFrame.bind(this));
  }

  private getPaddleInformations(): paddlesInformations {
    return {
      paddleWidth: this.paddleWidth,
      paddleHeight: this.paddleHeight,
      playerPaddlePossition: { x: 30, y: this.PlayerPaddle.paddleY },
      aiPaddlePossition: { x: this.Board.canvas.width - 30, y: this.BotPaddle.paddleY },
    };
  }
}
