import { vi } from "vitest";

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
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
}));
