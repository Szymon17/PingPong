type Coordinates = {
  x: number;
  y: number;
};

type paddlesInformations = {
  paddleWidth: number;
  paddleHeight: number;
  playerPaddlePossition: Coordinates;
  aiPaddlePossition: Coordinates;
};

export { paddlesInformations, Coordinates };
