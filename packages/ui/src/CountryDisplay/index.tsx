import React, { useMemo } from "react";

import { getFallbackTranslation } from "../utils/CountryPicker";

import type { Locales } from "../types";

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

const getFlagClass = (
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

  const flagClass = useMemo(
    () => getFlagClass(countryCode, flagsPosition, flagsStyle),
    [countryCode, flagsPosition, flagsStyle],
  );

  const getFlagElement = () => {
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

  return renderOption && countryCode && countryLabel ? (
    <>{renderOption(countryCode, countryLabel)}</>
  ) : (
    <span
      className={`country ${className}`.trim()}
      data-country-code={countryCode}
    >
      {getFlagElement()}
      <span className="country-label">{countryLabel ?? "-"}</span>
    </span>
  );
};

export default Country;
