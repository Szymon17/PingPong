import "./styles.css";
import { io } from "socket.io-client";
import Game from "./Game";
import { minMaxSpeed, settings } from "./types";

const socket = io("http://localhost:8000");

const ballSpeed: minMaxSpeed = { min: 5, max: 10 };

const PingPong = new Game(ballSpeed);

PingPong.startGame();
PingPong.pauseGame();
