import React, { useMemo } from "react";

import { Select, ISelectProperties } from "../Select";
import defaultEnglishCatalogue from "./en.json";
import defaultGroups from "./groups.json";

import type { Option } from "../Select";

export type Translation = Record<string, string>;
export type LocalesData = Record<string, Translation>;
export type GroupData = Record<string, string[]>;

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
  flags?: boolean;
  flagsPath?: (code: string) => string;
  flagsPosition?: "left" | "right" | "right-edge";
  flagsStyle?: "circle" | "rectangular" | "square";
  groups?: GroupData;
  locales?: LocalesData;
  include?: string[];
  includeFavorites?: boolean;
  labels?: CountryPickerLabels;
  locale?: string;
};

export { defaultGroups };

const getFallbackLocale = (
  locales: LocalesData | undefined,
  fallbackLocale: string,
): Translation | null => {
  if (locales?.[fallbackLocale]) {
    return locales[fallbackLocale];
  }

  if (fallbackLocale === "en") {
    return defaultEnglishCatalogue;
  }

  return null;
};

const generateBaseOptions = <T,>(
  locales: LocalesData | undefined,
  locale: string,
  fallbackLocale: string,
  include: string[] | undefined,
  exclude: string[] | undefined,
): Option<T>[] => {
  const fallbackData = getFallbackLocale(locales, fallbackLocale);

  if (!fallbackData) {
    return [];
  }

  const baseOptions: Option<T>[] = [];

  Object.entries(fallbackData).forEach(([code, fallbackLabel]) => {
    if (exclude && exclude.includes(code)) {
      return;
    }

    if (include && !include.includes(code)) {
      return;
    }

    const label = locales?.[locale]?.[code] || fallbackLabel || code;
    baseOptions.push({ value: code as unknown as T, label });
  });

  return baseOptions;
};

const splitFavoritesAndMain = <T,>(
  baseOptions: Option<T>[],
  favorites: string[],
  includeFavorites: boolean,
) => {
  const favoriteOptions: Option<T>[] = [];
  const mainOptions: Option<T>[] = [];

  baseOptions.forEach((option) => {
    if (favorites.includes(String(option.value))) {
      favoriteOptions.push(option);
      if (includeFavorites) {
        mainOptions.push(option);
      }
    } else {
      mainOptions.push(option);
    }
  });

  return { favoriteOptions, mainOptions };
};

const divideListInGroups = <T,>(
  list: Option<T>[],
  groups: GroupData,
): { label: string; options: Option<T>[] }[] => {
  const groupedResult: { label: string; options: Option<T>[] }[] = [];

  Object.entries(groups).forEach(([groupLabel, groupCodes]) => {
    const groupOptions = list.filter((option) =>
      groupCodes.includes(String(option.value)),
    );

    if (groupOptions.length > 0) {
      groupedResult.push({
        label: groupLabel,
        options: groupOptions,
      });
    }
  });

  return groupedResult;
};

type CountryOptions = {
  locales?: LocalesData;
  locale: string;
  fallbackLocale: string;
  include?: string[];
  exclude?: string[];
  groups?: GroupData;
  favorites?: string[];
  labels?: CountryPickerLabels;
  includeFavorites?: boolean;
};

export const getCountryOptions = <T,>({
  locales,
  locale,
  fallbackLocale,
  include,
  exclude,
  groups,
  favorites,
  labels,
  includeFavorites = true,
}: CountryOptions) => {
  const baseOptions = generateBaseOptions<T>(
    locales,
    locale,
    fallbackLocale,
    include,
    exclude,
  );

  const hasGroups = groups && Object.keys(groups).length > 0;
  const hasFavorites = favorites && favorites.length > 0;

  if (!hasFavorites) {
    if (hasGroups) {
      return divideListInGroups(baseOptions, groups!);
    }

    return baseOptions;
  }

  const { favoriteOptions, mainOptions } = splitFavoritesAndMain(
    baseOptions,
    favorites,
    includeFavorites,
  );

  const favoriteGroup = {
    label: labels?.favorites || "Favorites",
    options: favoriteOptions,
  };

  if (hasGroups) {
    const groupedMain = divideListInGroups(mainOptions, groups!);
    return [favoriteGroup, ...groupedMain];
  }

  return [
    favoriteGroup,
    {
      label: labels?.allCountries || "All countries",
      options: mainOptions,
    },
  ];
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
  locales,
  include,
  includeFavorites = true,
  labels,
  locale = "en",
  ...properties
}: CountryPickerProperties<T>) => {
  const options = useMemo(() => {
    return getCountryOptions<T>({
      locales,
      locale,
      fallbackLocale,
      include,
      exclude,
      groups,
      favorites,
      labels,
      includeFavorites,
    });
  }, [
    locales,
    locale,
    fallbackLocale,
    include,
    exclude,
    groups,
    favorites,
    labels,
    includeFavorites,
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
