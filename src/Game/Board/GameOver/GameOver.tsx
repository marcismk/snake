import { Button } from "@/components/Button";
import { GAME_STATUSES, useGameState } from "@/store";
import { Dialog } from "@/components/Dialog";

export const GameOver = () => {
  const gameStatus = useGameState((state) => state.status);
  const startGame = useGameState((state) => state.startGame);

  if (![GAME_STATUSES.Lost, GAME_STATUSES.Won].includes(gameStatus)) return;

  return (
    <Dialog
      title="Game over"
      open={[GAME_STATUSES.Lost, GAME_STATUSES.Won].includes(gameStatus)}
    >
      {gameStatus === GAME_STATUSES.Lost && (
        <p className="text-white">It was a good run</p>
      )}
      {gameStatus === GAME_STATUSES.Won && (
        <p className="text-white">Congratulations! You won!</p>
      )}
      <Button onClick={startGame}>
        {gameStatus === GAME_STATUSES.Won ? "Play again" : "Try again"}
      </Button>
    </Dialog>
  );
};
