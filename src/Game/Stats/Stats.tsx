import { Stat } from "@/components/Stat";
import { GAME_CONFIG } from "@/config";
import { useGameState } from "@/store";

export const Stats = () => {
  const score = useGameState((state) => state.score);
  const tail = useGameState((state) => state.snakeTail);

  return (
    <div className="relative border-4 border-neutral-400 px-4 py-6 min-w-[250px]">
      <h1 className="absolute top-[-25px] text-[24px] font-[700] uppercase text-yellow-500 text-shadow-[8px_8px_5px_black] bg-[#242424] p-1">
        SNAKE
      </h1>
      <Stat label="Score:" value={`${score}/${GAME_CONFIG.maxScrore}`} />
      <Stat label="Tail segments:" value={tail.length} />
    </div>
  );
};
