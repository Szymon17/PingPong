import { settings } from "./types";
import "./styles.css";
import Game from "./Game";

let PingPong: Game | null = null;

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
  createButton("Easy", { ballSpeed: { min: 7, max: 11 }, aiSpeed: 5.5 }),
  createButton("Medium", { ballSpeed: { min: 12, max: 15 }, aiSpeed: 7 }),
  createButton("Hard", { ballSpeed: { min: 15, max: 20 }, aiSpeed: 8 }),
];

const menu = document.createElement("div");
menu.classList.add("menu");

const buttonsContainer = document.createElement("div");
buttonsContainer.classList.add("buttons__container");

modes.forEach(mode => buttonsContainer.appendChild(mode));
menu.appendChild(buttonsContainer);

document.body.appendChild(menu);
