import { useMemo } from "react";
import { GAME_CONFIG } from "@/config";
import { Cell } from "./Cell";
import { useMovement } from "./useMovement";
import { GameOver } from "./GameOver";
import { GameStart } from "./GameStart";

export const Board = () => {
  useMovement();

  const rows = useMemo(() => {
    return Array.from({ length: GAME_CONFIG.boardSize }, (_, i) => i + 1);
  }, [GAME_CONFIG.boardSize]);

  const columns = useMemo(() => {
    return [...rows];
  }, [rows]);

  return (
    <div className="relative">
      <div
        className="relative grid gap-[1px] bg-neutral-500 aspect-1/1 border-5 border-neutral-400"
        style={{ gridTemplateColumns: `repeat(${GAME_CONFIG.boardSize}, 1fr)` }}
      >
        {rows.map((row) =>
          columns.map((col) => <Cell key={`x${row}-y${col}`} x={row} y={col} />)
        )}
      </div>
      <GameOver />
      <GameStart />
    </div>
  );
};
