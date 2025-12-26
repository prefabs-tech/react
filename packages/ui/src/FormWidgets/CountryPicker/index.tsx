import React, { useMemo } from "react";

import { Select, ISelectProperties } from "../Select";
import defaultEnCatalogue from "./en.json";

export type TranslationCatalogue = Record<string, string>;
export type I18nConfig = Record<string, TranslationCatalogue>;

export type CountryPickerLabels = {
  favorites?: string;
  allCountries?: string;
};

export type CountryPickerProperties<T> = Omit<
  ISelectProperties<T>,
  "options"
> & {
  locale?: string;
  fallbackLocale?: string;
  i18n?: I18nConfig;
  include?: string[];
  exclude?: string[];
  favorites?: string[];
  labels?: CountryPickerLabels;
  includeFavorites?: boolean;
};

export const CountryPicker = <T extends string | number>({
  locale = "en",
  fallbackLocale = "en",
  i18n,
  include,
  exclude,
  favorites,
  labels,
  includeFavorites = true,
  ...properties
}: CountryPickerProperties<T>) => {
  const options = useMemo(() => {
    const effectiveI18n: I18nConfig = i18n || { en: defaultEnCatalogue };

    const allCountryCodes = new Set(Object.keys(defaultEnCatalogue));

    if (effectiveI18n[fallbackLocale]) {
      Object.keys(effectiveI18n[fallbackLocale]).forEach((code) =>
        allCountryCodes.add(code),
      );
    }

    if (effectiveI18n[locale]) {
      Object.keys(effectiveI18n[locale]).forEach((code) =>
        allCountryCodes.add(code),
      );
    }

    let countryCodes = Array.from(allCountryCodes);

    const includeSet = include && include.length > 0 ? new Set(include) : null;
    const excludeSet = exclude && exclude.length > 0 ? new Set(exclude) : null;

    if (includeSet || excludeSet) {
      countryCodes = countryCodes.filter((code) => {
        if (excludeSet && excludeSet.has(code)) return false;
        if (includeSet && !includeSet.has(code)) return false;
        return true;
      });
    }

    const mappedCountriesList = countryCodes.map((code) => {
      const label =
        effectiveI18n[locale]?.[code] ||
        effectiveI18n[fallbackLocale]?.[code] ||
        (defaultEnCatalogue as Record<string, string>)[code];

      return {
        value: code as unknown as T,
        label,
        code,
      };
    });

    if (favorites && favorites.length > 0) {
      const favoriteSet = new Set(favorites);
      const favoriteList = mappedCountriesList.filter((item) =>
        favoriteSet.has(item.code),
      );

      if (favoriteList.length > 0) {
        const favoritesLabel = labels?.favorites || "Favorites";
        const allCountriesLabel = labels?.allCountries || "All countries";

        const allCountriesList = includeFavorites
          ? mappedCountriesList
          : mappedCountriesList.filter((item) => !favoriteSet.has(item.code));

        return [
          { label: favoritesLabel, options: favoriteList },
          { label: allCountriesLabel, options: allCountriesList },
        ];
      }
    }

    return mappedCountriesList;
  }, [
    i18n,
    locale,
    fallbackLocale,
    include,
    exclude,
    favorites,
    includeFavorites,
    labels,
  ]);

  const handleOnChange = (incomingValue: T | T[]) => {
    if (!properties.onChange) return;
    const cleanedValue = Array.isArray(incomingValue)
      ? (Array.from(new Set(incomingValue)) as T[])
      : incomingValue;
    (properties.onChange as (value: T | T[]) => void)(cleanedValue);
  };

  return (
    <Select
      {...(properties as ISelectProperties<T>)}
      options={options}
      onChange={handleOnChange}
    />
  );
};
