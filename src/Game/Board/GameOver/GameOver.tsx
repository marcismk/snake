import { Button } from "@/components/Button";
import { GAME_STATUSES, useGameState } from "@/store";
import classes from "./GameOver.module.css";

export const GameOver = () => {
  const gameStatus = useGameState((state) => state.status);

  const resetGame = useGameState((state) => state.resetGame);

  return (
    <div className={classes.gameOver}>
      <h2>Game Over</h2>
      {gameStatus === GAME_STATUSES.Won && (
        <p className={classes.won}>Congratulations! You won!</p>
      )}
      <Button onClick={resetGame}>Restart game</Button>
    </div>
  );
};
