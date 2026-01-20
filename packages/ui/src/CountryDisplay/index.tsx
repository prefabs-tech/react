import React, { useMemo } from "react";

import { getFallbackTranslation, getFlagClass } from "../utils/country-picker";

import type { Locales } from "../types";

import "../assets/css/country-display.css";

interface CountryDisplayProperties {
  className?: string;
  code: string;
  fallbackLocale?: string;
  flagsPath?: (code: string) => string;
  flagsPosition?: "left" | "right" | "right-edge";
  flagsStyle?: "circle" | "rectangular" | "square";
  locale?: string;
  locales?: Locales;
  showFlag?: boolean;
  renderOption?: (code: string, label: string) => React.ReactNode;
}

export const Country: React.FC<CountryDisplayProperties> = ({
  className = "",
  code,
  fallbackLocale = "en",
  flagsPath,
  flagsPosition = "left",
  flagsStyle = "rectangular",
  locale = "en",
  locales = {},
  showFlag = true,
  renderOption,
}) => {
  const countryCode = code?.trim();

  const countryLabel = useMemo(() => {
    if (!countryCode) {
      return;
    }

    const fallbackTranslation = getFallbackTranslation(fallbackLocale, locales);

    return (
      locales?.[locale]?.[countryCode] ||
      fallbackTranslation?.[countryCode] ||
      countryCode
    );
  }, [countryCode, locale, fallbackLocale, locales]);

  const flagClass = useMemo(() => {
    return getFlagClass(countryCode, flagsPosition, flagsStyle);
  }, [countryCode, flagsPosition, flagsStyle]);

  const renderFlag = () => {
    if (!showFlag || !countryCode || countryLabel === countryCode) {
      return null;
    }

    if (flagsPath) {
      return (
        <img
          alt={countryLabel}
          className={flagClass}
          src={flagsPath(countryCode)}
          title={countryLabel}
        />
      );
    }

    return <span className={flagClass} title={countryLabel} />;
  };

  return (
    <div
      className={`country-display ${className}`.trim()}
      data-country-code={countryCode}
    >
      {renderOption && countryCode && countryLabel ? (
        renderOption(countryCode, countryLabel)
      ) : (
        <div className="country-content">
          {renderFlag()}
          <span className="country-label">{countryLabel ?? "-"}</span>
        </div>
      )}
    </div>
  );
};

export default Country;
