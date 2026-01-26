import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { default as i18n } from "../../../index";
import LocaleSwitcher from "../../LocaleSwitcher";

test.skip("Local switcher dropdown is displayed and locale is changed", async () => {
  const i18nConfig = {
    appendNamespaceToCIMode: true,
    debug: true,
    defaultNS: "app",
    fallbackLng: "en",
    lng: "en",
    resources: {
      en: {},
      fr: {},
    },
    supportedLngs: ["en", "fr"],
    react: {
      useSuspense: false,
    },
    locales: "en:English,fr:Français",
  };

  i18n(i18nConfig);
  render(<LocaleSwitcher />);

  expect(screen.getAllByText("locales.en")).toBeDefined();

  fireEvent.click(screen.getAllByText("locales.en")[0]);

  const en = screen.getAllByRole("listitem")[0];
  const fr = screen.getAllByRole("listitem")[1];

  expect(en.textContent).toEqual("locales.en");
  expect(fr.textContent).toEqual("locales.fr");

  fireEvent.click(fr);

  expect(screen.getAllByText("locales.fr")).toBeDefined();
});
