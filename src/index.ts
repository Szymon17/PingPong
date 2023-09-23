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
const BotPaddle = new AiPaddle(Board.canvas, paddleWidth, paddleHeight);
const GameBall = new Ball(Board.canvas, ballSize);

const animate = () => {
  Board.renderCanvas();
  playerPaddle.drawPaddle(Board.ctx, Board.cursorY);
  BotPaddle.drawPaddle(Board.ctx);

  const paddlesInformations: paddlesInformations = {
    paddleWidth,
    paddleHeight,
    playerPaddlePossition: [30, playerPaddle.paddleY],
    aiPaddlePossition: [Board.canvas.width - 30, BotPaddle.paddleY],
  };

  GameBall.drawBall(Board.ctx, paddlesInformations);

  requestAnimationFrame(animate);
};

const startGame = () => {
  Board.initCanvas();

  animate();
};

startGame();
