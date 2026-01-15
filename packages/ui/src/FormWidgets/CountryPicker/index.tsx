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
  fallbackLabel?: string,
) => locales?.[locale]?.[code] || fallbackLabel || code;

const sortByLabel = <T,>(
  a: Option<T> | OptionGroup<T>,
  b: Option<T> | OptionGroup<T>,
) => (a.label || "").localeCompare(b.label || "");

const getAuthoritativeList = <T,>(
  fallbackTranslation: Translation,
  locale: string,
  locales: Locales | undefined,
  groups?: Groups,
  include?: string[],
  exclude: string[] = [],
): Option<T>[] => {
  const options: Option<T>[] = [];
  const processedCodes = new Set<string>();

  if (groups && Object.keys(groups).length > 0) {
    Object.values(groups)
      .flat()
      .forEach((code) => {
        if (!processedCodes.has(code) && fallbackTranslation[code]) {
          processedCodes.add(code);
          options.push({
            value: code as unknown as T,
            label: getLabel(code, locale, locales, fallbackTranslation[code]),
          });
        }
      });
  } else {
    const sourceCodes = include || Object.keys(fallbackTranslation);
    sourceCodes.forEach((code) => {
      if (
        !exclude.includes(code) &&
        !processedCodes.has(code) &&
        fallbackTranslation[code]
      ) {
        processedCodes.add(code);
        options.push({
          value: code as unknown as T,
          label: getLabel(code, locale, locales, fallbackTranslation[code]),
        });
      }
    });
  }

  return options;
};

const getFavoriteOptions = <T,>(
  allOptions: Option<T>[],
  favorites: string[],
  autoSortOptions: boolean,
): Option<T>[] => {
  if (!favorites.length) {
    return [];
  }

  const favoriteOptions: Option<T>[] = [];

  favorites.forEach((favoriteCode) => {
    const found = allOptions.find((opt) => String(opt.value) === favoriteCode);
    if (found) favoriteOptions.push(found);
  });

  if (autoSortOptions) favoriteOptions.sort(sortByLabel);

  return favoriteOptions;
};

const getGroupedOptions = <T,>(
  allOptions: Option<T>[],
  groups: Groups,
  favorites: string[],
  includeFavorites: boolean,
  locale: string,
  locales: Locales | undefined,
  fallbackTranslation: Translation,
  autoSortOptions: boolean,
): OptionGroup<T>[] => {
  return Object.entries(groups).reduce<OptionGroup<T>[]>(
    (groupedOptions, [groupKey, groupCodes]) => {
      let groupOptions = allOptions.filter((option) =>
        groupCodes.includes(String(option.value)),
      );

      if (!includeFavorites && favorites.length > 0) {
        groupOptions = groupOptions.filter(
          (option) => !favorites.includes(String(option.value)),
        );
      }

      if (groupOptions.length > 0) {
        if (autoSortOptions) groupOptions.sort(sortByLabel);
        groupedOptions.push({
          label: getLabel(
            groupKey,
            locale,
            locales,
            fallbackTranslation[groupKey],
          ),
          options: groupOptions,
        });
      }

      return groupedOptions;
    },
    [],
  );
};

const getAllCountries = <T,>(
  allOptions: Option<T>[],
  favorites: string[],
  includeFavorites: boolean,
  labels: CountryPickerProperties<T>["labels"],
  autoSortOptions: boolean,
): Option<T>[] | OptionGroup<T>[] => {
  const allCountries =
    !includeFavorites && favorites.length > 0
      ? allOptions.filter((option) => !favorites.includes(String(option.value)))
      : [...allOptions];

  if (autoSortOptions) allCountries.sort(sortByLabel);

  if (favorites.length > 0) {
    return [
      {
        label: labels?.allCountries || "All Countries",
        options: allCountries,
      },
    ];
  }

  return allCountries;
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

  const allOptions = getAuthoritativeList<T>(
    fallbackTranslation,
    locale,
    locales,
    groups,
    include,
    exclude,
  );

  const favoriteOptions = getFavoriteOptions(
    allOptions,
    favorites,
    autoSortOptions,
  );

  let groupedOptions: Option<T>[] | OptionGroup<T>[] = [];

  if (groups && Object.keys(groups).length > 0) {
    groupedOptions = getGroupedOptions(
      allOptions,
      groups,
      favorites,
      includeFavorites,
      locale,
      locales,
      fallbackTranslation,
      autoSortOptions,
    );
  } else {
    groupedOptions = getAllCountries(
      allOptions,
      favorites,
      includeFavorites,
      labels,
      autoSortOptions,
    );
  }

  const options: (Option<T> | OptionGroup<T>)[] = [];

  if (favoriteOptions.length > 0) {
    options.push({
      label: labels?.favorites || "Favorites",
      options: favoriteOptions,
    });
  }

  options.push(...(groupedOptions as (Option<T> | OptionGroup<T>)[]));

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
