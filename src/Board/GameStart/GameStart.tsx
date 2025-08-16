import { Button } from "../../components/Button";
import { useGameState, GAME_STATUSES } from "../../store";
import classes from "./GameStart.module.css";

export const GameStart = () => {
  const resetGame = useGameState((state) => state.resetGame);
  const setGameStatus = useGameState((state) => state.setStatus);

  const handleStartGame = () => {
    resetGame();
    setGameStatus(GAME_STATUSES.Playing);
  };

  return (
    <div className={classes.gameStart}>
      <h2>Welcome to Snake</h2>
      <p>Use arrow keys to move the snake.</p>
      <p>Try to eat the food without hitting the walls or yourself!</p>

      <Button onClick={handleStartGame}>Start Game</Button>
    </div>
  );
};
