import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Cell } from "../Cell";
import { useGameState } from "@/store";

describe("<Cell />", () => {
  test("render empty cell", () => {
    const container = render(<Cell x={1} y={1} />);

    expect(container).toMatchSnapshot();
  });

  test("render cell with head", () => {
    useGameState.getState().updateHeadPosition(1, 1);

    render(<Cell x={11} y={11} />);

    expect(screen.getByTestId("head-segment")).toBeTruthy();
  });

  test("render cell with food", () => {
    const foodPosition = useGameState.getState().foodPosition;

    render(<Cell x={foodPosition.x} y={foodPosition.y} />);

    expect(screen.getByTestId("food")).toBeTruthy();
  });

  test("render cell with tail", () => {
    useGameState.getState().updateHeadPosition(1, 1);

    render(<Cell x={10} y={10} />);

    expect(screen.getByTestId("tail-segment")).toBeTruthy();
  });
});
