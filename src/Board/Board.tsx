import { useMemo } from "react";
import classes from "./Board.module.css";
import { Cell } from "./Cell";
import { GAME_CONFIG } from "../config";
import { useMovement } from "./useMovement";
import { GAME_STATUSES, useGameState } from "../store";
import { GameOver } from "./GameOver";
import { GameStart } from "./GameStart";

export const Board = () => {
  const gameStatus = useGameState((state) => state.status);
  useMovement();

  const rows = useMemo(() => {
    return Array.from({ length: GAME_CONFIG.boardSize }, (_, i) => i + 1);
  }, []);

  const columns = useMemo(() => {
    return Array.from({ length: GAME_CONFIG.boardSize }, (_, i) => i + 1);
  }, []);

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.board}
        style={{ "--columns": GAME_CONFIG.boardSize } as React.CSSProperties}
      >
        {rows.map((row) =>
          columns.map((col) => <Cell key={`x${row}-y${col}`} x={row} y={col} />)
        )}
      </div>
      {[GAME_STATUSES.Won, GAME_STATUSES.Lost].includes(gameStatus) && (
        <GameOver />
      )}
      {gameStatus === GAME_STATUSES.Paused && <GameStart />}
    </div>
  );
};
