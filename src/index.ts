import "./styles.css";
import { settings } from "./types";
import Game from "./Game";

let PingPong: Game | null = null;

const normalBallSpeed = window.innerWidth / 300 + 5;

const createButton = (name: string, settings: settings): HTMLButtonElement => {
  const button = document.createElement("button");

  button.className = `mode__button ${name.toLowerCase()}`;
  button.innerText = name;

  button.addEventListener("click", () => {
    PingPong = new Game(settings);
    PingPong.startGame();
    menu.style.display = "none";
  });

  return button;
};

const modes = [
  createButton("Easy", { ballSpeed: { min: normalBallSpeed * 0.6, max: normalBallSpeed * 0.8 }, aiSpeed: normalBallSpeed * 0.45 }),
  createButton("Medium", { ballSpeed: { min: normalBallSpeed * 1.2, max: normalBallSpeed * 1.5 }, aiSpeed: normalBallSpeed * 0.7 }),
  createButton("Hard", { ballSpeed: { min: normalBallSpeed * 1.4, max: normalBallSpeed * 1.7 }, aiSpeed: normalBallSpeed * 0.8 }),
];

const menu = document.createElement("div");
menu.classList.add("menu");

const buttonsContainer = document.createElement("div");
buttonsContainer.classList.add("buttons__container");

modes.forEach(mode => buttonsContainer.appendChild(mode));
menu.appendChild(buttonsContainer);

document.body.appendChild(menu);
