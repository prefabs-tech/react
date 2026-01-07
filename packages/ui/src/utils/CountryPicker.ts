import defaultEnglishCatalogue from "../FormWidgets/CountryPicker/en.json";
import { Translation, Locales } from "../FormWidgets/CountryPicker/index";

export const getFallbackTranslation = (
  fallbackLocale: string,
  locales: Locales | undefined,
): Translation | null => {
  if (locales?.[fallbackLocale]) {
    return locales[fallbackLocale];
  }

  if (fallbackLocale === "en") {
    return defaultEnglishCatalogue;
  }

  return null;
};
