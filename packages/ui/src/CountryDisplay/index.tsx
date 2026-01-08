import React, { useMemo } from "react";

import { Locales } from "../FormWidgets/CountryPicker";
import { getFallbackTranslation } from "../utils/CountryPicker";

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
      return undefined;
    }

    const fallbackTranslation = getFallbackTranslation(fallbackLocale, locales);

    return (
      locales?.[locale]?.[countryCode] ||
      fallbackTranslation?.[countryCode] ||
      countryCode
    );
  }, [countryCode, locale, fallbackLocale, locales]);

  if (renderOption && countryCode && countryLabel) {
    return <>{renderOption(countryCode, countryLabel)}</>;
  }

  const flagClass = useMemo(
    () => getFlagClass(countryCode, flagsPosition, flagsStyle),
    [countryCode, flagsPosition, flagsStyle],
  );

  const flagElement = useMemo(() => {
    if (!showFlag || !countryCode) {
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
  }, [showFlag, countryCode, countryLabel, flagClass, flagsPath]);

  return (
    <span
      className={`country ${countryLabel === countryCode ? "is-code-only" : ""} ${className}`.trim()}
      data-country-code={countryCode}
    >
      {flagElement}
      <span className="country-label">{countryLabel ?? "-"}</span>
    </span>
  );
};

export default Country;
