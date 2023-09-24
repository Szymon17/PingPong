import { paddlesInformations } from "./types";
import GameBoard from "./GameBoard";
import UserPaddle from "./tools/UserPaddle";
import AiPaddle from "./tools/AiPaddle";
import Ball from "./tools/Ball";

const clientWidth = window.innerWidth;
const clientHeight = window.innerHeight;

const paddleWidth = 10;
const paddleHeight = clientHeight / 10;

const ballSize = 10;

const Board = new GameBoard(clientWidth, clientHeight);
const playerPaddle = new UserPaddle(Board.canvas, paddleWidth, paddleHeight);
const BotPaddle = new AiPaddle(Board.canvas, paddleWidth, paddleHeight, 10);
const GameBall = new Ball(Board.canvas, ballSize);

const getPaddleInformations = (): paddlesInformations => {
  return {
    paddleWidth,
    paddleHeight,
    playerPaddlePossition: { x: 30, y: playerPaddle.paddleY },
    aiPaddlePossition: { x: Board.canvas.width - 30, y: BotPaddle.paddleY },
  };
};

const animate = () => {
  Board.renderCanvas();
  playerPaddle.drawPaddle(Board.ctx, Board.cursorY);
  BotPaddle.drawPaddle(Board.ctx, GameBall.ballPostinion.y);
  GameBall.drawBall(Board.ctx, getPaddleInformations());

  const score = GameBall.checkScore();
  if (score) console.log(score);

  requestAnimationFrame(animate);
};

const startGame = () => {
  Board.initCanvas();

  animate();
};

startGame();
