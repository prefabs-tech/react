import { configContext } from "@prefabs.tech/react-config";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import i18n from "../../../index";
import LocaleSwitcher from "../../LocaleSwitcher";

import type { AppConfig } from "@prefabs.tech/react-config";

const appConfig: AppConfig = {
  apiBaseUrl: "/",
  appPort: "20072",
  appTitle: "Prefabs.tech Skeletons",
  appVersion: "0.0.1",
  features: {
    showVersion: true,
  },
  i18n: {
    appendNamespaceToCIMode: true,
    debug: true,
    defaultNS: "app",
    fallbackLng: "en",
    supportedLngs: ["en", "fr"],
    react: {
      useSuspense: false,
    },
    resources: { en: {}, fr: {} },
  },
  websiteDomain: "//",
  copyright: {
    holder: "Prefabs.tech",
    url: "www.prefabs-tech.com",
  },
};

test("Component matches snapshot", () => {
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

  const { container } = render(
    <configContext.Provider value={appConfig}>
      <LocaleSwitcher />
    </configContext.Provider>,
  );

  expect(container).toMatchSnapshot();
});
