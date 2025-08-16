import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";

describe("<Button />", () => {
  test("renders and click button", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: "Click Me" });

    expect(button).toBeTruthy();

    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
