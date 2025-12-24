import React, { useMemo } from "react";

import { Select, ISelectProperties } from "../Select";
import defaultEnglishCatalogue from "./en.json";
import defaultGroups from "./groups.json";

export type TranslationCatalogue = Record<string, string>;
export type I18nConfig = Record<string, TranslationCatalogue>;
export type GroupConfig = Record<string, string[]>;

export type CountryPickerLabels = {
  favorites?: string;
  allCountries?: string;
  others?: string;
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
  groups?: GroupConfig;
  i18n?: I18nConfig;
  include?: string[];
  includeFavorites?: boolean;
  labels?: CountryPickerLabels;
  locale?: string;
};

export { defaultGroups };

const getAllCountryCodes = (
  i18n: I18nConfig | undefined,
  locale: string,
  fallbackLocale: string,
): string[] => {
  const customCodes = new Set<string>();
  let hasCustomConfig = false;

  if (i18n) {
    if (locale && i18n[locale]) {
      Object.keys(i18n[locale]).forEach((code) => customCodes.add(code));
      hasCustomConfig = true;
    }
    if (fallbackLocale && i18n[fallbackLocale]) {
      Object.keys(i18n[fallbackLocale]).forEach((code) =>
        customCodes.add(code),
      );
      hasCustomConfig = true;
    }
  }

  if (hasCustomConfig) return Array.from(customCodes);
  return Object.keys(defaultEnglishCatalogue);
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
  const favoriteList = baseOptions.filter((item) => favoriteSet.has(item.code));

  if (favoriteList.length === 0) return baseOptions;

  const favoritesLabel = labels?.favorites || "Favorites";
  const allCountriesLabel = labels?.allCountries || "All countries";

  const remainingList = includeFavorites
    ? baseOptions
    : baseOptions.filter((item) => !favoriteSet.has(item.code));

  return [
    { label: favoritesLabel, options: favoriteList },
    { label: allCountriesLabel, options: remainingList },
  ];
};

const getOptionsWithGroups = <T,>(
  baseOptions: CountryOption<T>[],
  groups: GroupConfig,
  favorites: string[] | undefined,
  labels: CountryPickerLabels | undefined,
) => {
  const finalGroupedOptions: { label: string; options: CountryOption<T>[] }[] =
    [];
  const optionsMap = new Map(
    baseOptions.map((option) => [option.code, option]),
  );

  const groupedCodes = new Set(Object.values(groups).flat());

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

  const othersOptions = baseOptions.filter(
    (option) => !groupedCodes.has(option.code),
  );

  if (othersOptions.length > 0) {
    finalGroupedOptions.push({
      label: labels?.others || labels?.allCountries || "Others",
      options: othersOptions,
    });
  }

  return finalGroupedOptions;
};

export const CountryPicker = <T extends string | number>({
  exclude,
  fallbackLocale = "en",
  favorites,
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
      code,
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
