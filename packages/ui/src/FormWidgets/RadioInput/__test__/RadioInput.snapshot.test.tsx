import { render } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { RadioInput } from "..";

const options = [
  { label: "One", value: "1" },
  { label: "Two", value: "2" },
  { label: "Three", value: "3" },
];

describe("RadioInput", () => {
  const onChangeMock = vi.fn();

  const renderRadioInput = (properties = {}) => {
    return render(
      <RadioInput onChange={onChangeMock} options={options} {...properties} />,
    );
  };

  afterEach(() => {
    onChangeMock.mockClear();
  });

  test("should match snapshot with options", () => {
    const { container } = renderRadioInput();

    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with disabled set to true", () => {
    const { container } = renderRadioInput({ disabled: true });

    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with custom className", () => {
    const { container } = renderRadioInput({ className: "custom-class" });

    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with a custom label", () => {
    const { container } = renderRadioInput({ label: "Custom label" });

    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with a custom name", () => {
    const { container } = renderRadioInput({ name: "radioInput" });

    expect(container).toMatchSnapshot();
  });

  test("should match snapshot with all props set", () => {
    const { container } = renderRadioInput({
      className: "radio-input",
      label: "Custom Label",
      name: "radioInput",
    });

    expect(container).toMatchSnapshot();
  });
});
