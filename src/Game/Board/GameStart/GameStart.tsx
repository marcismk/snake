import { Button } from "@/components/Button";
import { GAME_STATUSES, useGameState } from "@/store";
import { Dialog } from "@/components/Dialog";

export const GameStart = () => {
  const status = useGameState((state) => state.status);
  const startGame = useGameState((state) => state.startGame);

  const handleStartGame = () => {
    startGame();
  };

  return (
    <Dialog title="Welcome" open={status === GAME_STATUSES.Paused}>
      <p className="text-white">
        Play classic snake game. Use keyboard arrow keys to turn snake. Avoid
        walls and yourself and collect food to win.
      </p>
      <Button onClick={handleStartGame}>Start Game</Button>
    </Dialog>
  );
};
