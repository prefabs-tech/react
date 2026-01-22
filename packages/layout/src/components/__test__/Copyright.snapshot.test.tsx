import { AppConfig, configContext } from "@prefabs.tech/react-config";
import { default as i18n } from "@prefabs.tech/react-i18n";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import { Copyright } from "../Layout";

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
  i18n(appConfig.i18n);

  const { container } = render(
    <configContext.Provider value={appConfig}>
      <Copyright year={2024} />
    </configContext.Provider>,
  );

  expect(container).toMatchSnapshot();
});
