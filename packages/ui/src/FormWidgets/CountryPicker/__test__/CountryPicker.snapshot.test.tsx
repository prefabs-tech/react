import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { CountryPicker } from "../../CountryPicker";

describe("CountryPicker Component", () => {
  test("should render correctly with a limited list of countries", () => {
    const { container } = render(
      <CountryPicker
        name="simple-country-picker"
        include={["NP", "US", "GB"]}
        value="NP"
        onChange={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly with favorites and localization", () => {
    const { container } = render(
      <CountryPicker
        name="favorites-picker"
        locale="fr"
        include={["NP", "US", "FR", "DE"]}
        favorites={["FR", "DE"]}
        labels={{ favorites: "Principaux", allCountries: "Autres" }}
        value={["FR"]}
        multiple
        onChange={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
