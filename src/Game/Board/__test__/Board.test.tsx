import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Board } from "../Board";
import { GAME_CONFIG } from "../../config";

describe("<Board />", () => {
  test("render initial board", () => {
    render(<Board />);

    expect(screen).toMatchSnapshot();
  });

  test("render board with correct number of cells", () => {
    render(<Board />);

    const cells = screen.getAllByTestId("cell");
    expect(cells.length).toBe(GAME_CONFIG.boardSize * GAME_CONFIG.boardSize);
  });
});
