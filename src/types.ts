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

type minMaxSpeed = {
  min: number;
  max: number;
};

type settings = {
  aiSpeed: number;
  ballSpeed: minMaxSpeed;
};

type ballDirection = 1 | -1;

export { paddlesInformations, Coordinates, settings, minMaxSpeed, ballDirection };
