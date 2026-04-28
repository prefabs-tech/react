import { fireEvent, render, screen } from "@testing-library/react";
import React, { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CheckboxInput } from "../index";

describe("CheckboxInput", () => {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];

  const onChangeMock = vi.fn();

  const renderCheckboxInput = (properties = {}) => {
    return render(
      <CheckboxInput
        name="test-checkbox"
        onChange={onChangeMock}
        options={options}
        {...properties}
      />,
    );
  };

  afterEach(() => {
    onChangeMock.mockClear();
  });

  it("renders a single checkbox when no options are provided", () => {
    renderCheckboxInput({ options: [] });

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
  });

  it("renders multiple checkboxes when options are provided", () => {
    renderCheckboxInput();

    const checkboxes = screen.getAllByRole("checkbox");

    expect(checkboxes).toHaveLength(options.length);
  });

  it("toggles the single checkbox and calls onChange with the correct value", () => {
    renderCheckboxInput({ options: [] });

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  it("toggles multiple checkboxes and calls onChange with the selected values", () => {
    const Wrapper = () => {
      const [selectedValues, setSelectedValues] = useState<string[]>([]);

      return (
        <CheckboxInput
          name="test-checkbox"
          onChange={(newValue) => {
            setSelectedValues(newValue as string[]);
            onChangeMock(newValue);
          }}
          options={options}
          value={selectedValues}
        />
      );
    };

    render(<Wrapper />);

    const [checkbox1, checkbox2] = screen.getAllByRole("checkbox");

    // Select the first option
    fireEvent.click(checkbox1);
    expect(onChangeMock).toHaveBeenCalledWith(["option1"]);

    // Select the second option
    fireEvent.click(checkbox2);
    expect(onChangeMock).toHaveBeenCalledWith(["option1", "option2"]);

    // Deselect the first option
    fireEvent.click(checkbox1);
    expect(onChangeMock).toHaveBeenCalledWith(["option2"]);
  });

  it("disables checkboxes when the disabled prop is true", () => {
    renderCheckboxInput({ disabled: true });

    const checkboxes = screen.getAllByRole("checkbox");

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeDisabled();
    });
  });

  it("renders helper text and error message when provided", () => {
    renderCheckboxInput({
      errorMessage: "Error message",
      helperText: "Helper text",
    });

    expect(screen.getByText("Helper text")).toBeInTheDocument();
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("renders custom labels for options when renderOptionsLabel is provided", () => {
    const renderOptionsLabel = (option: { label: string; value: string }) => (
      <span>Custom {option.label}</span>
    );

    renderCheckboxInput({ renderOptionsLabel });

    expect(screen.getByText("Custom Option 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Option 2")).toBeInTheDocument();
  });

  it("initializes with default selected values", () => {
    renderCheckboxInput({ value: ["option1"] });

    const [checkbox1, checkbox2] = screen.getAllByRole("checkbox");
    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();
  });

  it("initializes with default checked state for single checkbox", () => {
    renderCheckboxInput({ checked: true, options: [] });

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });
});
