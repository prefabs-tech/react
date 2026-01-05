import React, { useMemo } from "react";

import { Select, ISelectProperties } from "../Select";
import defaultEnglishCatalogue from "./en.json";
import defaultGroups from "./groups.json";

import type { Option } from "../Select";

export type TranslationCatalogue = Record<string, string>;
export type I18nData = Record<string, TranslationCatalogue>;
export type GroupData = Record<string, string[]>;

export type CountryPickerLabels = {
  favorites?: string;
  allCountries?: string;
};

type CountryOption<T> = {
  value: T;
  label: string;
};

export type CountryPickerProperties<T> = Omit<
  ISelectProperties<T>,
  "options"
> & {
  exclude?: string[];
  fallbackLocale?: string;
  favorites?: string[];
  flags?: boolean;
  flagsPath?: (code: string) => string;
  flagsPosition?: "left" | "right" | "right-edge";
  flagsStyle?: "circle" | "rectangular" | "square";
  groups?: GroupData;
  i18n?: I18nData;
  include?: string[];
  includeFavorites?: boolean;
  labels?: CountryPickerLabels;
  locale?: string;
};

export { defaultGroups };

const getAllCountryCodes = (
  i18n: I18nData | undefined,
  locale: string,
  fallbackLocale: string,
): string[] => {
  if (!i18n) return Object.keys(defaultEnglishCatalogue);

  const localeData = i18n[locale];
  const fallbackData = i18n[fallbackLocale];

  if (!localeData && !fallbackData) {
    return Object.keys(defaultEnglishCatalogue);
  }

  return Array.from(
    new Set([
      ...(localeData ? Object.keys(localeData) : []),
      ...(fallbackData ? Object.keys(fallbackData) : []),
    ]),
  );
};

const getFilteredCountryCodes = (
  codes: string[],
  include?: string[],
  exclude?: string[],
): string[] => {
  const includeSet = include && include.length > 0 ? new Set(include) : null;
  const excludeSet = exclude && exclude.length > 0 ? new Set(exclude) : null;

  if (!includeSet && !excludeSet) return codes;

  return codes.filter((code) => {
    if (excludeSet && excludeSet.has(code)) return false;
    if (includeSet && !includeSet.has(code)) return false;
    return true;
  });
};

const countryLabel = (
  code: string,
  i18n: I18nData | undefined,
  locale: string,
  fallbackLocale: string,
): string => {
  return (
    i18n?.[locale]?.[code] ||
    i18n?.[fallbackLocale]?.[code] ||
    defaultEnglishCatalogue[code as keyof typeof defaultEnglishCatalogue] ||
    code
  );
};

const getOptionsWithFavorites = <T,>(
  baseOptions: CountryOption<T>[],
  favorites: string[] | undefined,
  labels: CountryPickerLabels | undefined,
  includeFavorites: boolean,
) => {
  if (!favorites || favorites.length === 0) return baseOptions;

  const favoriteSet = new Set(favorites);
  const favoriteList = baseOptions.filter((item) =>
    favoriteSet.has(String(item.value)),
  );

  if (favoriteList.length === 0) return baseOptions;

  const favoritesLabel = labels?.favorites || "Favorites";
  const allCountriesLabel = labels?.allCountries || "All countries";

  const remainingList = includeFavorites
    ? baseOptions
    : baseOptions.filter((item) => !favoriteSet.has(String(item.value)));

  return [
    { label: favoritesLabel, options: favoriteList },
    { label: allCountriesLabel, options: remainingList },
  ];
};

const getOptionsWithGroups = <T,>(
  baseOptions: CountryOption<T>[],
  groups: GroupData,
  favorites: string[] | undefined,
  labels: CountryPickerLabels | undefined,
) => {
  const finalGroupedOptions: { label: string; options: CountryOption<T>[] }[] =
    [];

  const optionsMap = new Map(
    baseOptions.map((option) => [String(option.value), option]),
  );

  if (favorites && favorites.length > 0) {
    const favoriteList = favorites
      .map((code) => optionsMap.get(code))
      .filter((option): option is CountryOption<T> => !!option);

    if (favoriteList.length > 0) {
      finalGroupedOptions.push({
        label: labels?.favorites || "Favorites",
        options: favoriteList,
      });
    }
  }

  Object.entries(groups).forEach(([groupLabel, groupCodes]) => {
    const groupOptions = groupCodes
      .map((code) => optionsMap.get(code))
      .filter((option): option is CountryOption<T> => !!option);

    if (groupOptions.length > 0) {
      finalGroupedOptions.push({
        label: groupLabel,
        options: groupOptions,
      });
    }
  });

  return finalGroupedOptions;
};

export const CountryPicker = <T extends string | number>({
  exclude,
  fallbackLocale = "en",
  favorites,
  flags = true,
  flagsPath,
  flagsPosition = "left",
  flagsStyle = "rectangular",
  groups,
  i18n,
  include,
  includeFavorites = true,
  labels,
  locale = "en",
  ...properties
}: CountryPickerProperties<T>) => {
  const options = useMemo(() => {
    const countryCodes = getAllCountryCodes(i18n, locale, fallbackLocale);

    const filteredCountryCodes = getFilteredCountryCodes(
      countryCodes,
      include,
      exclude,
    );
    const baseOptions = filteredCountryCodes.map((code) => ({
      value: code as unknown as T,
      label: countryLabel(code, i18n, locale, fallbackLocale),
    }));

    if (groups && Object.keys(groups).length > 0) {
      return getOptionsWithGroups(baseOptions, groups, favorites, labels);
    }

    return getOptionsWithFavorites(
      baseOptions,
      favorites,
      labels,
      includeFavorites,
    );
  }, [
    exclude,
    fallbackLocale,
    favorites,
    groups,
    i18n,
    include,
    includeFavorites,
    labels,
    locale,
  ]);

  const getFlagClass = (code?: string) =>
    [
      "flag-icon",
      code && `flag-icon-${code.trim().toLowerCase()}`,
      flagsPosition === "right" && "flag-icon-right",
      flagsPosition === "right-edge" && "flag-icon-right-edge",
      flagsStyle === "circle" && "flag-icon-rounded",
      flagsStyle === "square" && "flag-icon-squared",
    ]
      .filter(Boolean)
      .join(" ");

  const handleOnChange = (value: T | T[]) => {
    if (!properties.onChange) return;
    const result = Array.isArray(value)
      ? (Array.from(new Set(value)) as T[])
      : value;
    (properties.onChange as (value: T | T[]) => void)(result);
  };

  const renderOptionWithFlags = (
    option: Option<T> & {
      groupLabel?: string;
    },
  ) => {
    const code = String(option.value);

    return (
      <div className="options-wrapper" data-country-code={code}>
        {flags &&
          (flagsPath ? (
            <img
              alt={option.label}
              className={getFlagClass()}
              src={flagsPath(code)}
            />
          ) : (
            <span className={getFlagClass(code)} />
          ))}
        <span className="option-label">{option.label}</span>
      </div>
    );
  };

  return (
    <Select
      {...(properties as ISelectProperties<T>)}
      options={options}
      renderOption={properties.renderOption ?? renderOptionWithFlags}
      onChange={handleOnChange}
    />
  );
};
