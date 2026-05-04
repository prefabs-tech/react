import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import { default as i18n } from "../../../index";
import LocaleSwitcher from "../../LocaleSwitcher";

test("Component matches snapshot", () => {
  const i18nConfig = {
    appendNamespaceToCIMode: true,
    debug: true,
    defaultNS: "app",
    fallbackLng: "en",
    lng: "en",
    locales: "en:English,fr:Français",
    react: {
      useSuspense: false,
    },
    resources: {
      en: {},
      fr: {},
    },
    supportedLngs: ["en", "fr"],
  };

  i18n(i18nConfig);
  const { container } = render(<LocaleSwitcher />);
  expect(container).toMatchSnapshot();
});
