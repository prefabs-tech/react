import React, { useMemo } from "react";

import englishData from "../FormWidgets/CountryPicker/en.json";

export type Translation = Record<string, string>;
export type LocalesData = Record<string, Translation>;

export interface CountryDisplayProperties {
  className?: string;
  code: string;
  fallbackLocale?: string;
  i18n?: LocalesData;
  locale?: string;
  showFlag?: boolean;
}

const determineFallback = (
  locales: LocalesData | undefined,
  fallbackLocale: string,
): Translation | null => {
  if (locales?.[fallbackLocale]) {
    return locales[fallbackLocale];
  }
  if (fallbackLocale === "en") {
    return englishData as Translation;
  }
  return null;
};

export const Country: React.FC<CountryDisplayProperties> = ({
  className = "",
  code,
  fallbackLocale = "en",
  i18n = {},
  locale = "en",
  showFlag = true,
}) => {
  const countryCode = code?.trim();

  const countryLabel = useMemo(() => {
    if (!countryCode) {
      return undefined;
    }

    const fallbackData = determineFallback(i18n, fallbackLocale);

    return (
      i18n?.[locale]?.[countryCode] ||
      fallbackData?.[countryCode] ||
      countryCode
    );
  }, [countryCode, locale, fallbackLocale, i18n]);

  return (
    <span
      className={`country ${className}`.trim()}
      data-country-code={countryCode}
    >
      {showFlag && countryLabel && (
        <span
          className={`flag-icon flag-icon-${countryCode.toLowerCase()}`}
          title={countryLabel}
        />
      )}
      <span className="country-label">{countryLabel ?? "-"}</span>
    </span>
  );
};

export default Country;
