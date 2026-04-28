import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { CountryPicker } from "../../CountryPicker";

describe("CountryPicker Component", () => {
  test("should render correctly with a limited list of countries", () => {
    const { container } = render(
      <CountryPicker
        include={["NP", "US", "GB"]}
        name="simple-country-picker"
        onChange={() => {}}
        value="NP"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render correctly with favorites and localization", () => {
    const { container } = render(
      <CountryPicker
        favorites={["FR", "DE"]}
        include={["NP", "US", "FR", "DE"]}
        labels={{ allCountries: "Autres", favorites: "Principaux" }}
        locale="fr"
        multiple
        name="favorites-picker"
        onChange={() => {}}
        value={["FR"]}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
