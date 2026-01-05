import React, { useMemo } from "react";

import englishData from "../FormWidgets/CountryPicker/en.json";

type I18nData = Record<string, Record<string, string>>;

export interface CountryDisplayProperties {
  className?: string;
  code: string;
  fallbackLocale?: string;
  i18n?: I18nData;
  locale?: string;
  showFlag?: boolean;
}

export const Country: React.FC<CountryDisplayProperties> = ({
  className = "",
  code,
  fallbackLocale = "en",
  i18n = {},
  locale = "en",
  showFlag = true,
}) => {
  const countryLabel = useMemo(() => {
    const countryCode = code?.trim().toUpperCase();

    if (!countryCode) {
      return;
    }

    return (
      i18n?.[locale]?.[countryCode] ||
      i18n?.[fallbackLocale]?.[countryCode] ||
      (englishData as Record<string, string>)[countryCode]
    );
  }, [code, locale, fallbackLocale, i18n]);

  const countryCode = code.trim();

  return (
    <span
      className={`country ${className}`.trim()}
      data-country-code={countryCode}
    >
      {showFlag && countryLabel && (
        <span
          className={`flag-icon flag-icon-${countryCode.toLowerCase()}`}
          title={countryCode.toUpperCase()}
        />
      )}
      <span className="country-label">{countryLabel ?? "-"}</span>
    </span>
  );
};

export default Country;
