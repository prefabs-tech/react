import defaultEnglishTranslation from "../FormWidgets/CountryPicker/en.json";

import type {
  GroupedOption as OptionGroup,
  Option,
} from "../FormWidgets/Select";
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

export const getFlagClass = (
  code: string | undefined,
  position: string,
  style: string,
) =>
  [
    "flag-icon",
    code && `flag-icon-${code.trim().toLowerCase()}`,
    position === "right" && "flag-icon-right",
    position === "right-edge" && "flag-icon-right-edge",
    style === "circle" && "flag-icon-rounded",
    style === "square" && "flag-icon-squared",
  ]
    .filter(Boolean)
    .join(" ");

export const getLabel = (
  code: string,
  locale: string,
  locales: Locales | undefined,
  fallbackTranslation: Translation,
) => {
  return locales?.[locale]?.[code] || fallbackTranslation[code] || code;
};

export const sortByLabel = <T>(
  optionA: Option<T> | OptionGroup<T>,
  optionB: Option<T> | OptionGroup<T>,
) => {
  if (!optionA.label) {
    return 1;
  }

  if (!optionB.label) {
    return -1;
  }

  return optionA.label.localeCompare(optionB.label);
};
