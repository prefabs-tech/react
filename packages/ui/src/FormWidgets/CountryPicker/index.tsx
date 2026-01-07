import React, { useCallback, useMemo } from "react";

import { getFallbackTranslation } from "../../utils/CountryPicker";
import { Select, ISelectProperties } from "../Select";
import defaultGroups from "./groups.json";

import type { Option } from "../Select";

export type Translation = Record<string, string>;
export type Locales = Record<string, Translation>;
export type Groups = Record<string, string[]>;

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
  groups?: Groups;
  include?: string[];
  includeFavorites?: boolean;
  labels?: CountryPickerLabels;
  locale?: string;
  locales?: Locales;
};

export { defaultGroups };

const getBaseOptions = <T,>(
  exclude: string[] | undefined,
  fallbackLocale: string,
  include: string[] | undefined,
  locale: string,
  locales: Locales | undefined,
): Option<T>[] => {
  const fallbackData = getFallbackTranslation(fallbackLocale, locales);

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

const getGroups = <T,>(
  groups: Groups,
  list: Option<T>[],
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

const getOptions = <T,>({
  exclude,
  fallbackLocale = "en",
  favorites,
  groups,
  include,
  includeFavorites = true,
  labels,
  locale = "en",
  locales,
}: Pick<
  CountryPickerProperties<T>,
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
  const baseOptions = getBaseOptions<T>(
    exclude,
    fallbackLocale,
    include,
    locale,
    locales,
  );

  if (favorites && favorites.length > 0) {
    return getOptionsWithFavorites(
      baseOptions,
      favorites,
      includeFavorites,
      groups,
      labels,
    );
  }

  if (groups && Object.keys(groups).length > 0) {
    return getGroups(groups, baseOptions);
  }

  return baseOptions;
};

const getOptionsWithFavorites = <T,>(
  baseOptions: Option<T>[],
  favorites: string[],
  includeFavorites: boolean,
  groups?: Groups,
  labels?: CountryPickerLabels,
) => {
  const favoriteOptions = baseOptions.filter((option) =>
    favorites.includes(String(option.value)),
  );

  const mainOptions = includeFavorites
    ? baseOptions
    : baseOptions.filter((option) => !favorites.includes(String(option.value)));

  const mainGroups =
    groups && Object.keys(groups).length > 0
      ? getGroups(groups, mainOptions)
      : [
          {
            label: labels?.allCountries || "All countries",
            options: mainOptions,
          },
        ];

  return [
    {
      label: labels?.favorites || "Favorites",
      options: favoriteOptions,
    },
    ...mainGroups,
  ];
};

const renderCountryOption = <T,>(
  option: Option<T>,
  {
    flags,
    flagsPath,
    flagsPosition = "left",
    flagsStyle = "rectangular",
  }: Pick<
    CountryPickerProperties<T>,
    "flags" | "flagsPath" | "flagsPosition" | "flagsStyle"
  >,
) => {
  const code = String(option.value);
  const flagClass = getFlagClass(code, flagsPosition, flagsStyle);

  return (
    <div className="options-wrapper" data-country-code={code}>
      {flags &&
        (flagsPath ? (
          <img alt={option.label} className={flagClass} src={flagsPath(code)} />
        ) : (
          <span className={flagClass} />
        ))}
      <span className="option-label">{option.label}</span>
    </div>
  );
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
    return getOptions<T>({
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
    (option: Option<T>) =>
      renderCountryOption(option, {
        flags,
        flagsPath,
        flagsPosition,
        flagsStyle,
      }),
    [flags, flagsPath, flagsPosition, flagsStyle],
  );

  return (
    <Select
      {...(properties as ISelectProperties<T>)}
      options={options}
      renderOption={properties.renderOption ?? handleRenderOption}
      onChange={handleOnChange}
    />
  );
};
