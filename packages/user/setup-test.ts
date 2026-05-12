import { vi } from "vitest";

vi.mock("@prefabs.tech/react-i18n", () => ({
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
  useTranslation: () => {
    return {
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
      t: (string_) => string_,
    };
  },
}));
