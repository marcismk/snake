import { Board } from "./Board";
import { Stats } from "./Stats";

function Game() {
  return (
    <div className="flex gap-2 align-center justify-center h-full">
      <Board />
      <Stats />
    </div>
  );
}

export default Game;
