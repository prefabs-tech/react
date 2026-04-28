import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Select } from "..";

const options = [
  { label: "Nepali", value: "np" },
  { label: "English", value: "en" },
];

describe("Select Component", () => {
  test("should render correctly with single selection", () => {
    const { container } = render(
      <Select
        name="single-select"
        onChange={() => {}}
        options={options}
        value="en"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly with multiple selection", () => {
    const { container } = render(
      <Select
        multiple
        name="multi-select"
        onChange={() => {}}
        options={options}
        value={["np", "en"]}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly with a placeholder", () => {
    const { container } = render(
      <Select
        name="placeholder-select"
        onChange={() => {}}
        options={options}
        placeholder="Select a language"
        value=""
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly with an error message", () => {
    const { container } = render(
      <Select
        errorMessage="This field is required"
        hasError
        name="error-select"
        onChange={() => {}}
        options={options}
        value="en"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly with helper text", () => {
    const { container } = render(
      <Select
        helperText="Please select an option"
        name="helper-text-select"
        onChange={() => {}}
        options={options}
        value="np"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly when disabled", () => {
    const { container } = render(
      <Select
        disabled
        name="disabled-select"
        onChange={() => {}}
        options={options}
        value="en"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly when auto-select single option is enabled", () => {
    const { container } = render(
      <Select
        autoSelectSingleOption
        name="auto-select-single"
        onChange={() => {}}
        options={options}
        value="np"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly when hide if single option is enabled", () => {
    const { container } = render(
      <Select
        hideIfSingleOption
        name="hide-if-single"
        onChange={() => {}}
        options={options}
        value="np"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
