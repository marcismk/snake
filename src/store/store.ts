import { GAME_CONFIG } from "@/config";
import { create } from "zustand";

/**
 * Generates tail parts and it's positions based on the snake head position.
 * @param pos Position
 * @returns Position[]
 */
const generateTail = (pos: Position): Position[] => {
  return Array.from({ length: GAME_CONFIG.initialSnakeLength }, (_, i) => ({
    x: pos.x,
    y: pos.y + i + 1,
  }));
};

export type Direction = "up" | "down" | "left" | "right";
export type Position = { x: number; y: number };
export const GAME_STATUSES = {
  Playing: "playing",
  Paused: "paused",
  Lost: "lost",
  Won: "won",
};

interface GameState {
  gameSpeed: number;
  direction: Direction;
  status: string;
  score: number;
  headPosition: Position;
  snakeTail: Position[];
  foodPosition: Position;
  updateHeadPosition: (x: number, y: number) => Position;
  increaseScore: (by: number) => void;
  setDirection: (direction: Direction) => void;
  setSpeed: (speed: number) => void;
  setStatus: (status: string) => void;
  startGame: () => void;
  endGame: (status: string) => void;
}

export const useGameState = create<GameState>()((set, get) => ({
  gameSpeed: GAME_CONFIG.gameSpeed,
  direction: "left",
  status: GAME_STATUSES.Paused,
  score: 0,
  headPosition: GAME_CONFIG.initialSnakePosition,
  snakeTail: generateTail(GAME_CONFIG.initialSnakePosition),
  foodPosition: { x: 2, y: 2 },
  updateHeadPosition: (x: number, y: number) => {
    const foodPosition = get().foodPosition;
    const tail = get().snakeTail;
    const head = get().headPosition;

    let newFoodPosition: Position | undefined;
    const newPosition = {
      x: head.x + x,
      y: head.y + y,
    };

    const isOverlapingFood = calculateFoodCollision(newPosition, foodPosition);
    const isOverlapingTail = calculateSelfCollision(newPosition, tail);
    const isOverlapingWall = calculateWallCollision(newPosition);

    if (isOverlapingWall || isOverlapingTail) {
      set(() => ({
        status: GAME_STATUSES.Lost,
      }));
      return head; // Return the old position if game is over
    }

    if (isOverlapingFood) {
      get().increaseScore(GAME_CONFIG.foodScore);
      newFoodPosition = calculateNewFoodPosition(newPosition, tail);
      tail.push({ x: head.x, y: head.y }); // Add new tail segment

      if (get().score >= GAME_CONFIG.maxScrore) {
        set(() => ({
          status: GAME_STATUSES.Won,
        }));
        return newPosition; // Return the new position if game is won
      }
    }

    const newtail = calculateNewTail(tail, head);

    set(() => ({
      headPosition: newPosition,
      snakeTail: newtail,
      foodPosition: newFoodPosition || foodPosition,
    }));

    return newPosition;
  },
  increaseScore: (by) => {
    set((state) => ({
      score: Math.min(state.score + by, GAME_CONFIG.maxScrore),
    }));
  },
  setDirection: (direction: Direction) => {
    set({ direction });
  },
  setSpeed: (speed: number) => {
    set({ gameSpeed: speed });
  },
  setStatus: (status: string) => set({ status: status }),
  startGame: () => {
    set(() => ({
      status: GAME_STATUSES.Playing,
      headPosition: GAME_CONFIG.initialSnakePosition,
      snakeTail: generateTail(GAME_CONFIG.initialSnakePosition),
      foodPosition: calculateNewFoodPosition(
        GAME_CONFIG.initialSnakePosition,
        []
      ),
      score: 0,
      direction: "left",
    }));
  },
  endGame: (status) => {
    set(() => ({
      status,
    }));
  },
}));

/**
 * Calculate the new tail positions based on the old head position.
 * The first segment of the tail will take the old head position,
 * and the rest will follow the previous segments.
 * @param tail Postion[]
 * @param oldHead Position
 * @returns update array of tail positions
 */
const calculateNewTail = (tail: Position[], oldHead: Position): Position[] => {
  return tail.map((_, index) => {
    if (index === 0) {
      return oldHead;
    }

    return tail[index - 1];
  });
};

/**
 * Calculate if the head position overlaps with the food position.
 * @param head Postion
 * @param food Position
 * @returns boolean
 */
const calculateFoodCollision = (head: Position, food: Position): boolean => {
  return head.x === food.x && head.y === food.y;
};

/**
 * Calculate if the head position collides with the walls of the board.
 * The walls are considered to be at the edges of the board.
 * @param head Postion
 * @returns boolean
 */
const calculateWallCollision = (head: Position): boolean => {
  return (
    head.x < 1 ||
    head.x > GAME_CONFIG.boardSize ||
    head.y < 1 ||
    head.y > GAME_CONFIG.boardSize
  );
};

/**
 * Calculate if the head position collides with itself (the snake's tail).
 * This checks if the head position matches any of the tail positions.
 * @param head Position
 * @param tail Position[]
 * @returns boolean
 */
const calculateSelfCollision = (head: Position, tail: Position[]): boolean => {
  return tail.some((pos) => pos.x === head.x && pos.y === head.y);
};

/**
 * Generate a new food position that does not overlap with the snake's head or tail.
 * It randomly generates a position within the board size and checks for collisions.
 * If a collision is detected, it generates a new position until a valid one is found.
 * @param head Postion
 * @param tail Position[]
 * @returns Position
 */
const calculateNewFoodPosition = (
  head: Position,
  tail: Position[]
): Position => {
  let newPosition: Position;

  do {
    newPosition = {
      x: Math.floor(Math.random() * GAME_CONFIG.boardSize) + 1,
      y: Math.floor(Math.random() * GAME_CONFIG.boardSize) + 1,
    };
  } while (
    (newPosition.x === head.x && newPosition.y === head.y) ||
    tail.some((pos) => pos.x === newPosition.x && pos.y === newPosition.y)
  );

  return newPosition;
};
