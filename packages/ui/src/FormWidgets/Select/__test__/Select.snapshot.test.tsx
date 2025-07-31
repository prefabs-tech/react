import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Select } from "..";

const options = [
  { value: "np", label: "Nepali" },
  { value: "en", label: "English" },
];

describe("Select Component", () => {
  test("should render correctly with single selection", () => {
    const { container } = render(
      <Select
        name="single-select"
        options={options}
        value="en"
        onChange={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly with multiple selection", () => {
    const { container } = render(
      <Select
        name="multi-select"
        options={options}
        value={["np", "en"]}
        multiple
        onChange={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly with a placeholder", () => {
    const { container } = render(
      <Select
        name="placeholder-select"
        options={options}
        value=""
        placeholder="Select a language"
        onChange={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly with an error message", () => {
    const { container } = render(
      <Select
        name="error-select"
        options={options}
        value="en"
        hasError
        errorMessage="This field is required"
        onChange={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly with helper text", () => {
    const { container } = render(
      <Select
        name="helper-text-select"
        options={options}
        value="np"
        helperText="Please select an option"
        onChange={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly when disabled", () => {
    const { container } = render(
      <Select
        name="disabled-select"
        options={options}
        value="en"
        disabled
        onChange={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly when auto-select single option is enabled", () => {
    const { container } = render(
      <Select
        name="auto-select-single"
        options={options}
        value="np"
        autoSelectSingleOption
        onChange={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly when hide if single option is enabled", () => {
    const { container } = render(
      <Select
        name="hide-if-single"
        options={options}
        value="np"
        hideIfSingleOption
        onChange={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
