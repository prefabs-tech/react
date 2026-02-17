import React, { useCallback, useMemo } from "react";

import {
  getFallbackTranslation,
  getFlagClass,
  getLabel,
  sortByLabel,
} from "../../utils/country-picker";
import { Select, ISelectProperties } from "../Select";

import type {
  CountryPickerProperties,
  Groups,
  Locales,
  Translation,
} from "../../types/country-picker";
import type { GroupedOption as OptionGroup, Option } from "../Select";

import("@dzangolab/flag-icon-css/css/flag-icon.min.css");

const getFavoriteOptions = <T,>(
  favorites: string[],
  locale: string,
  locales: Locales | undefined,
  fallbackTranslation: Translation,
  autoSortOptions: boolean,
): Option<T>[] => {
  if (!favorites.length) {
    return [];
  }

  const options = favorites.map((code) => {
    return {
      value: code as unknown as T,
      label: getLabel(code, locale, locales, fallbackTranslation),
    };
  });

  if (autoSortOptions) {
    options.sort(sortByLabel);
  }

  return options;
};

const getFullList = <T,>(
  groups: Groups | undefined,
  include: string[] | undefined,
  exclude: string[],
  favorites: string[],
  includeFavorites: boolean,
  locale: string,
  locales: Locales | undefined,
  fallbackTranslation: Translation,
  labels: CountryPickerProperties<T>["labels"],
  autoSortOptions: boolean,
): Option<T>[] | OptionGroup<T>[] => {
  let options = [] as unknown as Option<T>[] | OptionGroup<T>[];

  if (!groups || Object.keys(groups).length == 0) {
    const codes = include || Object.keys(fallbackTranslation);
    options = codes
      .filter((code) => {
        if (exclude.includes(code)) {
          return false;
        }

        if (!includeFavorites && favorites.includes(code)) {
          return false;
        }

        return true;
      })
      .map((code) => {
        return {
          value: code as unknown as T,
          label: getLabel(code, locale, locales, fallbackTranslation),
        };
      });

    if (autoSortOptions) {
      options.sort(sortByLabel);
    }

    if (favorites.length > 0) {
      return [
        {
          label: labels?.allCountries || "All countries",
          options: options,
        },
      ];
    }
  } else {
    options = Object.entries(groups).map(([key, codes]) => {
      const countries = codes.map((code) => {
        return {
          value: code as unknown as T,
          label: getLabel(code, locale, locales, fallbackTranslation),
        };
      });

      if (autoSortOptions) {
        countries.sort(sortByLabel);
      }

      return {
        label: getLabel(key, locale, locales, fallbackTranslation),
        options: countries,
      };
    });

    if (autoSortOptions) {
      options.sort(sortByLabel);
    }
  }

  return options;
};

const getOptions = <T,>({
  autoSortOptions = true,
  exclude = [],
  fallbackLocale = "en",
  favorites = [],
  groups,
  include,
  includeFavorites = true,
  labels,
  locale = "en",
  locales,
}: Pick<
  CountryPickerProperties<T>,
  | "autoSortOptions"
  | "exclude"
  | "fallbackLocale"
  | "favorites"
  | "groups"
  | "include"
  | "includeFavorites"
  | "labels"
  | "locale"
  | "locales"
>) => {
  const options: (Option<T> | OptionGroup<T>)[] = [];

  const fallbackTranslation =
    getFallbackTranslation(fallbackLocale, locales) || {};

  if (favorites.length > 0) {
    const favoriteOptions = getFavoriteOptions<T>(
      favorites,
      locale,
      locales,
      fallbackTranslation,
      autoSortOptions,
    );

    options.push({
      label: labels?.favorites || "Favorites",
      options: favoriteOptions,
    });
  }

  const fullList = getFullList<T>(
    groups,
    include,
    exclude,
    favorites,
    includeFavorites,
    locale,
    locales,
    fallbackTranslation,
    labels,
    autoSortOptions,
  );

  options.push(...fullList);

  return options;
};

export const CountryPicker = <T extends string | number>({
  autoSortOptions = true,
  exclude,
  fallbackLocale = "en",
  favorites,
  flags = true,
  flagsPath,
  flagsPosition = "left",
  flagsStyle = "rectangular",
  groups,
  locales,
  include,
  includeFavorites = true,
  labels,
  locale = "en",
  ...properties
}: CountryPickerProperties<T>) => {
  const options = useMemo(() => {
    return getOptions<T>({
      autoSortOptions,
      exclude,
      fallbackLocale,
      favorites,
      groups,
      include,
      includeFavorites,
      labels,
      locale,
      locales,
    });
  }, [
    autoSortOptions,
    exclude,
    fallbackLocale,
    favorites,
    groups,
    include,
    includeFavorites,
    labels,
    locale,
    locales,
  ]);

  const handleOnChange = useCallback(
    (value: T | T[]) => {
      if (!properties.onChange) {
        return;
      }

      const result = Array.isArray(value)
        ? (Array.from(new Set(value)) as T[])
        : value;
      (properties.onChange as (value: T | T[]) => void)(result);
    },
    [properties.onChange],
  );

  const handleRenderOption = useCallback(
    (option: Option<T>) => {
      const code = String(option.value);
      const flagClass = getFlagClass(code, flagsPosition, flagsStyle);

      return (
        <div className="options-wrapper" data-country-code={code}>
          {flags &&
            (flagsPath ? (
              <img
                alt={option.label}
                className={flagClass}
                src={flagsPath(code)}
              />
            ) : (
              <span className={flagClass} />
            ))}
          <span className="option-label">{option.label}</span>
        </div>
      );
    },
    [flags, flagsPath, flagsPosition, flagsStyle],
  );

  return (
    <Select
      {...(properties as ISelectProperties<T>)}
      autoSortOptions={false}
      options={options}
      renderOption={properties.renderOption ?? handleRenderOption}
      onChange={handleOnChange}
    />
  );
};
