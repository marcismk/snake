import { useEffect } from "react";
import { useGameState, type Position } from "../store";

const ARROW_KEYS = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Left: "ArrowLeft",
  Right: "ArrowRight",
};

export const useMovement = () => {
  const gameSpeed = useGameState((state) => state.gameSpeed);

  const handleAutoMovement = () => {
    const gameStatus = useGameState.getState().status;
    if (gameStatus === "playing") {
      const direction = useGameState.getState().direction;

      let newPosition: Position = { x: 0, y: 0 };

      switch (direction) {
        case "up":
          newPosition.x -= 1;
          break;
        case "down":
          newPosition.x += 1;
          break;
        case "left":
          newPosition.y -= 1;
          break;
        case "right":
          newPosition.y += 1;
          break;
      }

      useGameState.getState().setHeadPosition(newPosition.x, newPosition.y);
    }
  };

  const handleMovement = (event: KeyboardEvent) => {
    const { key } = event;
    const isArrowKey = Object.values(ARROW_KEYS).includes(key);
    const gameStatus = useGameState.getState().status;

    if (isArrowKey && gameStatus === "playing") {
      const currentDirection = useGameState.getState().direction;
      let newDirection = currentDirection;

      switch (key) {
        case ARROW_KEYS.Up:
          newDirection = currentDirection !== "down" ? "up" : currentDirection;
          break;
        case ARROW_KEYS.Down:
          newDirection = currentDirection !== "up" ? "down" : currentDirection;
          break;
        case ARROW_KEYS.Left:
          newDirection =
            currentDirection !== "right" ? "left" : currentDirection;
          break;
        case ARROW_KEYS.Right:
          newDirection =
            currentDirection !== "left" ? "right" : currentDirection;
          break;
      }

      useGameState.getState().setDirection(newDirection);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleMovement);

    let movementInterval = setInterval(handleAutoMovement, gameSpeed);

    return () => {
      window.removeEventListener("keydown", handleMovement);
      clearInterval(movementInterval);
    };
  }, [gameSpeed]);
};
