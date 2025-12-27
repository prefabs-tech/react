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
  exclude?: string[];
  fallbackLocale?: string;
  favorites?: string[];
  i18n?: I18nConfig;
  include?: string[];
  includeFavorites?: boolean;
  labels?: CountryPickerLabels;
  locale?: string;
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
    const translationSource: I18nConfig = i18n || { en: defaultEnCatalogue };

    const allCountryCodes = new Set(
      i18n ? [] : Object.keys(defaultEnCatalogue),
    );

    if (translationSource[fallbackLocale]) {
      Object.keys(translationSource[fallbackLocale]).forEach((code) =>
        allCountryCodes.add(code),
      );
    }

    if (translationSource[locale]) {
      Object.keys(translationSource[locale]).forEach((code) =>
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
        translationSource[locale]?.[code] ||
        translationSource[fallbackLocale]?.[code];

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
