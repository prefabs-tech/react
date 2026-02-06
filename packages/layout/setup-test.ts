import { vi } from "vitest";

// from i18n documentation https://react.i18next.com/misc/testing
vi.mock("@prefabs.tech/react-i18n", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual: any = await vi.importActual("@prefabs.tech/react-i18n");

  return {
    ...actual,
    useTranslation: () => {
      return {
        t: (string_) => string_,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      };
    },
  };
});
