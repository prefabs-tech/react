import { vi } from "vitest";

// from i18n documentation https://react.i18next.com/misc/testing
vi.mock("@prefabs.tech/react-i18n", () => ({
  useTranslation: () => {
    return {
      t: (string_) => string_,
      i18n: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));
