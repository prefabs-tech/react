import React, { useMemo } from "react";

import { Locales } from "../FormWidgets/CountryPicker";
import { getFallbackTranslation } from "../utils/CountryPicker";

export interface CountryDisplayProperties {
  className?: string;
  code: string;
  fallbackLocale?: string;
  locales?: Locales;
  locale?: string;
  showFlag?: boolean;
  renderOption?: (code: string, label: string) => React.ReactNode;
}

export const Country: React.FC<CountryDisplayProperties> = ({
  className = "",
  code,
  fallbackLocale = "en",
  locales = {},
  locale = "en",
  showFlag = true,
  renderOption,
}) => {
  const countryCode = code?.trim();

  const countryLabel = useMemo(() => {
    if (!countryCode) {
      return undefined;
    }

    const fallbackData = getFallbackTranslation(fallbackLocale, locales);

    return (
      locales?.[locale]?.[countryCode] ||
      fallbackData?.[countryCode] ||
      countryCode
    );
  }, [countryCode, locale, fallbackLocale, locales]);

  if (renderOption && countryCode && countryLabel) {
    return <>{renderOption(countryCode, countryLabel)}</>;
  }

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
