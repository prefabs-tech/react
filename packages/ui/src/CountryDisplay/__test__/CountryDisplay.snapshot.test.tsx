import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Country } from "../../CountryDisplay";

describe("Country Component Snapshots", () => {
  test("renders basic country with default flag", () => {
    const { container } = render(<Country code="NP" locale="en" />);

    expect(container).toMatchSnapshot();
  });

  test("renders with different flag styles and positions", () => {
    const { container } = render(
      <Country code="US" flagsStyle="circle" flagsPosition="right-edge" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("renders without flag when showFlag is false", () => {
    const { container } = render(<Country code="GB" showFlag={false} />);

    expect(container).toMatchSnapshot();
  });

  test("renders with custom flagsPath image source", () => {
    const { container } = render(
      <Country
        code="FR"
        flagsPath={(code) => `https://static.example.com/flags/${code}.svg`}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("renders with localized labels", () => {
    const mockLocales = {
      fr: {
        DE: "Allemagne",
      },
    };

    const { container } = render(
      <Country code="DE" locale="fr" locales={mockLocales} />,
    );

    expect(container).toMatchSnapshot();
  });

  test("renders using custom renderOption prop", () => {
    const { container } = render(
      <Country
        code="JP"
        renderOption={(code, label) => (
          <div className="custom-render">
            <strong>{code}</strong>: {label}
          </div>
        )}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("renders fallback hyphen when code is missing or empty", () => {
    const { container } = render(<Country code="" />);

    expect(container).toMatchSnapshot();
  });
});
