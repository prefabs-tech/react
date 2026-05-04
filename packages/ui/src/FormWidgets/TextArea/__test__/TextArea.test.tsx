import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test, vi } from "vitest";

import { Textarea } from "..";

describe("Textarea", () => {
  test("should render textarea with label", () => {
    render(<Textarea label="Test Label" />);

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
  });

  test("should render textarea with default value", () => {
    render(<Textarea defaultValue="Default text" />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("Default text");
  });

  test("should render textarea with placeholder", () => {
    render(<Textarea placeholder="Enter text here" />);

    const textarea = screen.getByPlaceholderText("Enter text here");
    expect(textarea).toBeInTheDocument();
  });

  test("should render helper text when provided", () => {
    render(<Textarea helperText="Helper text" />);

    const helperText = screen.getByText("Helper text");
    expect(helperText).toBeInTheDocument();
  });

  test("should render error message when provided", () => {
    render(<Textarea errorMessage="Something went wrong" hasError />);

    const errorMessage = screen.getByText("Something went wrong");
    expect(errorMessage).toBeInTheDocument();
  });

  test("should trigger onChange event correctly", () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "New value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("should disable textarea when disabled prop is true", () => {
    render(<Textarea disabled />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });

  test("renders readOnly textarea", () => {
    render(<Textarea readOnly />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("readonly");
  });

  test("should render custom class", () => {
    const { container } = render(<Textarea className="custom-class" />);

    expect(container.querySelector("div")).toHaveClass("custom-class");
  });
});
