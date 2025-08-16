import { useMemo } from "react";
import { useGameState } from "@/store";
import classes from "./Cell.module.css";
import headImage from "./assets/head.svg";
import tailImage from "./assets/tail.svg";
import foodImage from "./assets/food.svg";

const headRotationMap = {
  up: 90,
  down: 270,
  left: 0,
  right: 180,
};

interface Props {
  x: number;
  y: number;
}

export const Cell = ({ x, y }: Props) => {
  const direction = useGameState((state) => state.direction);
  const headPosition = useGameState((state) => state.headPosition);
  const foodPosition = useGameState((state) => state.foodPosition);
  const tail = useGameState((state) => state.snakeTail);

  const isHead = useMemo(
    () => headPosition.x === x && headPosition.y === y,
    [headPosition, x, y]
  );
  const isFood = useMemo(
    () => foodPosition.x === x && foodPosition.y === y,
    [foodPosition, x, y]
  );
  const isTail = useMemo(
    () => tail.some((pos) => pos.x === x && pos.y === y),
    [tail, x, y]
  );
  const isLastTailSegment = useMemo(() => {
    return (
      tail.length > 0 &&
      tail[tail.length - 1].x === x &&
      tail[tail.length - 1].y === y
    );
  }, [tail, x, y]);

  const headOverlaps = useMemo(() => isHead && isFood, [isHead, isFood]);

  return (
    <div className={classes.cell} data-testid="cell">
      {isFood && !headOverlaps && (
        <img data-testid="food" src={foodImage} height={25} width={25} />
      )}
      {isHead && (
        <img
          data-testid="head-segment"
          src={headImage}
          height={40}
          width={40}
          style={{ transform: `rotate(${headRotationMap[direction]}deg)` }}
        />
      )}
      {!isLastTailSegment && isTail && (
        <img
          data-testid="tail-segment"
          src={tailImage}
          height={30}
          width={30}
        />
      )}
      {isLastTailSegment && (
        <img
          data-testid="tail-tip-segment"
          src={tailImage}
          height={20}
          width={20}
          style={{ transform: `rotate(${headRotationMap[direction]}deg)` }}
        />
      )}
    </div>
  );
};
