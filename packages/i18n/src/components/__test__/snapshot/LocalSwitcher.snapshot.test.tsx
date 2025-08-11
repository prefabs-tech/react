import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import i18n from "../../../index";
import LocaleSwitcher from "../../LocaleSwitcher";

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
  const { container } = render(<LocaleSwitcher />);
  expect(container).toMatchSnapshot();
});
