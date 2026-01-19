import React, { useCallback, useMemo } from "react";

import {
  getFallbackTranslation,
  getFlagClass,
} from "../../utils/country-picker";
import { Select, ISelectProperties } from "../Select";

import type {
  CountryPickerProperties,
  Groups,
  Locales,
  Translation,
} from "../../types/country-picker";
import type { GroupedOption as OptionGroup, Option } from "../Select";

const getLabel = (
  code: string,
  locale: string,
  locales: Locales | undefined,
  fallbackTranslation: Translation,
) => {
  return locales?.[locale]?.[code] || fallbackTranslation[code] || code;
};

const sortByLabel = <T,>(
  optionA: Option<T> | OptionGroup<T>,
  optionB: Option<T> | OptionGroup<T>,
) => {
  if (!optionA.label) {
    return 1;
  }

  if (!optionB.label) {
    return -1;
  }

  return optionA.label.localeCompare(optionB.label);
};

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
  if (groups && Object.keys(groups).length > 0) {
    const groupList = Object.entries(groups).map(([groupKey, groupCodes]) => {
      const groupOptions = groupCodes.map((code) => {
        return {
          value: code as unknown as T,
          label: getLabel(code, locale, locales, fallbackTranslation),
        };
      });

      if (autoSortOptions) {
        groupOptions.sort(sortByLabel);
      }

      return {
        label: getLabel(groupKey, locale, locales, fallbackTranslation),
        options: groupOptions,
      };
    });

    if (autoSortOptions) {
      groupList.sort(sortByLabel);
    }

    return groupList;
  }

  const codes = include || Object.keys(fallbackTranslation);

  const options = codes
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
        label: labels?.allCountries || "All Countries",
        options: options,
      },
    ];
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
  const fallbackTranslation =
    getFallbackTranslation(fallbackLocale, locales) || {};

  const favoriteOptions = getFavoriteOptions<T>(
    favorites,
    locale,
    locales,
    fallbackTranslation,
    autoSortOptions,
  );

  const mainList = getFullList<T>(
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

  const finalOptions: (Option<T> | OptionGroup<T>)[] = [];

  if (favoriteOptions.length > 0) {
    finalOptions.push({
      label: labels?.favorites || "Favorites",
      options: favoriteOptions,
    });
  }

  finalOptions.push(...(mainList as (Option<T> | OptionGroup<T>)[]));

  return finalOptions;
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
