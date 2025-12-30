import React, { useMemo } from "react";

import { Select, ISelectProperties } from "../Select";
import defaultEnglishCatalogue from "./en.json";

export type TranslationCatalogue = Record<string, string>;
export type I18nConfig = Record<string, TranslationCatalogue>;

export type CountryPickerLabels = {
  favorites?: string;
  allCountries?: string;
};

type CountryOption<T> = {
  value: T;
  label: string;
  code: string;
};

export type CountryPickerProperties<T> = Omit<
  ISelectProperties<T>,
  "options"
> & {
  exclude?: string[];
  fallbackLocale?: string;
  favorites?: string[];
  i18n?: I18nConfig;
  include?: string[];
  includeFavorites?: boolean;
  labels?: CountryPickerLabels;
  locale?: string;
};

const getAllCountryCodes = (
  i18n: I18nConfig | undefined,
  locale: string,
  fallbackLocale: string,
): string[] => {
  const allCountryCodes = new Set(Object.keys(defaultEnglishCatalogue));

  if (i18n) {
    if (locale && i18n[locale]) {
      Object.keys(i18n[locale]).forEach((code) => allCountryCodes.add(code));
    }

    if (fallbackLocale && fallbackLocale !== locale && i18n[fallbackLocale]) {
      Object.keys(i18n[fallbackLocale]).forEach((code) =>
        allCountryCodes.add(code),
      );
    }
  }

  return Array.from(allCountryCodes);
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
  i18n: I18nConfig | undefined,
  locale: string,
  fallbackLocale: string,
): string => {
  return (
    i18n?.[locale]?.[code] ||
    i18n?.[fallbackLocale]?.[code] ||
    defaultEnglishCatalogue[code as keyof typeof defaultEnglishCatalogue]
  );
};

const getOptionsWithFavorites = <T,>(
  options: CountryOption<T>[],
  favorites?: string[],
  labels?: CountryPickerLabels,
  includeFavorites: boolean = true,
) => {
  if (!favorites || favorites.length === 0) return options;

  const favoriteSet = new Set(favorites);
  const favoriteList = options.filter((item) => favoriteSet.has(item.code));

  if (favoriteList.length === 0) return options;

  const favoritesLabel = labels?.favorites || "Favorites";
  const allCountriesLabel = labels?.allCountries || "All countries";

  const allCountriesList = includeFavorites
    ? options
    : options.filter((item) => !favoriteSet.has(item.code));

  return [
    { label: favoritesLabel, options: favoriteList },
    { label: allCountriesLabel, options: allCountriesList },
  ];
};

export const CountryPicker = <T extends string | number>({
  exclude,
  fallbackLocale = "en",
  favorites,
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
    const countryOptions = filteredCountryCodes.map((code) => ({
      value: code as unknown as T,
      label: countryLabel(code, i18n, locale, fallbackLocale),
      code,
    }));

    return getOptionsWithFavorites(
      countryOptions,
      favorites,
      labels,
      includeFavorites,
    );
  }, [
    exclude,
    fallbackLocale,
    favorites,
    i18n,
    include,
    includeFavorites,
    labels,
    locale,
  ]);

  const handleOnChange = (value: T | T[]) => {
    if (!properties.onChange) return;
    const result = Array.isArray(value)
      ? (Array.from(new Set(value)) as T[])
      : value;
    (properties.onChange as (value: T | T[]) => void)(result);
  };

  return (
    <Select
      {...(properties as ISelectProperties<T>)}
      options={options}
      onChange={handleOnChange}
    />
  );
};
