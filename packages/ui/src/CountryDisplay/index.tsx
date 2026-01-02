import React, { useMemo } from "react";

import englishData from "../FormWidgets/CountryPicker/en.json";

type I18nData = Record<string, Record<string, string>>;

export interface CountryDisplayProperties {
  className?: string;
  code: string;
  fallbackLocale?: string;
  i18n?: I18nData;
  locale?: string;
}

function getCountryLabel(
  rawCode: string,
  locale: string,
  fallbackLocale: string,
  i18n: I18nData,
): string {
  const code = rawCode?.trim().toUpperCase();

  if (!code) {
    return "-";
  }

  const countriesList = englishData as Record<string, string>;

  return (
    i18n?.[locale]?.[code] ||
    i18n?.[fallbackLocale]?.[code] ||
    countriesList[code] ||
    "-"
  );
}

export const Country: React.FC<CountryDisplayProperties> = ({
  className = "",
  code,
  fallbackLocale = "en",
  i18n = {},
  locale = "en",
}) => {
  const countryLabel = useMemo(() => {
    return getCountryLabel(code, locale, fallbackLocale, i18n);
  }, [code, locale, fallbackLocale, i18n]);

  const normalizedCode = code?.trim().toUpperCase() || "";

  return (
    <span
      className={`country ${className}`.trim()}
      data-country-code={normalizedCode}
    >
      {countryLabel}
    </span>
  );
};

export default Country;
