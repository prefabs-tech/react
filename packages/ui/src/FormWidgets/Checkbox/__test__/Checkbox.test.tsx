import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test, vi } from "vitest";

import { Checkbox } from "..";

describe("Checkbox component", () => {
  test("should render the checkbox input", () => {
    render(<Checkbox />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  test("should render the checkbox with the provided label", () => {
    render(<Checkbox label="I agree to the terms" name="agree" />);

    const checkbox = screen.getByLabelText("I agree to the terms");
    expect(checkbox).toBeInTheDocument();
  });

  test("should set the correct name, id attributes", () => {
    render(<Checkbox label="I agree to the terms" name="agree" />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("name", "agree");
    expect(checkbox).toHaveAttribute("id", "agree");
  });

  test("should trigger the onChange handler when checked", () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("should be disable if disabled is true", () => {
    render(<Checkbox disabled={true} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  test("should render an error message if errorMessage prop is provided", () => {
    render(
      <Checkbox errorMessage="You must agree to the terms" name="agree" />,
    );

    const errorMessage = screen.getByText("You must agree to the terms");
    expect(errorMessage).toBeInTheDocument();
  });
});
