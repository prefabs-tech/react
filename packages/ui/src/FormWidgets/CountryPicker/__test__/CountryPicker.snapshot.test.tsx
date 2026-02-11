import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { CountryPicker } from "../../CountryPicker";

describe("CountryPicker Component Snapshots", () => {
  test("renders simple list correctly", () => {
    const { container } = render(
      <CountryPicker
        name="simple-picker"
        include={["NP", "US", "GB"]}
        value="NP"
        onChange={vi.fn()}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("renders with favorites and custom labels", () => {
    const { container } = render(
      <CountryPicker
        name="favorites-picker"
        locale="fr"
        include={["NP", "US", "FR", "DE"]}
        favorites={["FR", "DE"]}
        labels={{ favorites: "Favoris", allCountries: "Tous les pays" }}
        value="FR"
        onChange={vi.fn()}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("renders with grouped countries", () => {
    const groups = {
      Europe: ["FR", "DE", "GB"],
      Asia: ["NP", "CN", "JP"],
    };

    const { container } = render(
      <CountryPicker
        name="grouped-picker"
        groups={groups}
        onChange={vi.fn()}
        value=""
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("renders with flag options disabled", () => {
    const { container } = render(
      <CountryPicker
        name="no-flags"
        include={["US", "GB"]}
        flags={false}
        onChange={vi.fn()}
        value=""
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("renders with custom flag path function", () => {
    const { container } = render(
      <CountryPicker
        name="custom-flags"
        include={["US"]}
        flagsPath={(code) => `https://cdn.example.com/flags/${code}.png`}
        onChange={vi.fn()}
        value=""
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
