import { useGameState } from "../store";
import classes from "./Header.module.css";
import { GAME_CONFIG } from "../config";

export const Header = () => {
  const score = useGameState((state) => state.score);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h1>SNAKE</h1>
      </div>
      <div>
        <span className={classes.score}>{score}</span>
        <span>{`/${GAME_CONFIG.maxScrore}`}</span>
      </div>
    </div>
  );
};
