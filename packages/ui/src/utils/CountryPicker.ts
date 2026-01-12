import defaultEnglishTranslation from "../FormWidgets/CountryPicker/en.json";

import type { Locales, Translation } from "../types";

export const getFallbackTranslation = (
  fallbackLocale: string,
  locales: Locales | undefined,
): Translation | null => {
  if (locales?.[fallbackLocale]) {
    return locales[fallbackLocale];
  }

  if (fallbackLocale === "en") {
    return defaultEnglishTranslation;
  }

  return null;
};
