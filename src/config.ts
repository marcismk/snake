export const GAME_SPEEDS = {
  slow: 750,
  normal: 500,
  fast: 200,
};

export const GAME_CONFIG = {
  boardSize: 20, // Number of cells per row/column
  maxScrore: 30, // Maximum score to reach
  gameSpeed: GAME_SPEEDS.normal, // Speed of the game in milliseconds
  initialSnakeLength: 3, // Initial length of the snake
  initialSnakePosition: { x: 10, y: 10 }, // Starting position of the snake
  foodScore: 3, // Score gained for eating food
};
