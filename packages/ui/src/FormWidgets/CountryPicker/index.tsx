import React, { useCallback, useMemo } from "react";

import { getFallbackTranslation } from "../../utils/CountryPicker";
import { Select, ISelectProperties } from "../Select";
import defaultGroups from "./groups.json";

import type { Option, GroupedOption as OptionGroup } from "../Select";

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
  autoSortOptions?: boolean;
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

  if (include?.length) {
    include.forEach((code) => {
      if (exclude?.includes(code)) {
        return;
      }

      if (!fallbackData[code]) {
        return;
      }

      baseOptions.push({
        value: code as unknown as T,
        label: getLabel(code, locale, locales, fallbackData[code]),
      });
    });

    return baseOptions;
  }

  Object.entries(fallbackData).forEach(([code, fallbackLabel]) => {
    if (exclude?.includes(code)) {
      return;
    }

    baseOptions.push({
      value: code as unknown as T,
      label: getLabel(code, locale, locales, fallbackLabel),
    });
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

const getLabel = (
  code: string,
  locale: string,
  locales: Locales | undefined,
  fallbackLabel?: string,
) => {
  return locales?.[locale]?.[code] || fallbackLabel || code;
};

const getGroups = <T,>(groups: Groups, list: Option<T>[]): OptionGroup<T>[] => {
  const optionMap = new Map(
    list.map((option) => [String(option.value), option]),
  );

  return Object.entries(groups).reduce<OptionGroup<T>[]>(
    (groupedOptions, [groupLabel, groupCodes]) => {
      const options = groupCodes
        .map((code) => optionMap.get(code))
        .filter(Boolean) as Option<T>[];

      if (options.length) {
        groupedOptions.push({ label: groupLabel, options });
      }

      return groupedOptions;
    },
    [],
  );
};

const getOptions = <T,>({
  autoSortOptions = true,
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
  const baseOptions = getBaseOptions<T>(
    exclude,
    fallbackLocale,
    include,
    locale,
    locales,
  );

  if (favorites && favorites.length > 0) {
    const optionsWithFavorites = getOptionsWithFavorites(
      baseOptions,
      favorites,
      includeFavorites,
      groups,
      labels,
    );

    const hasFavoriteOptions = optionsWithFavorites[0].options.length > 0;

    return getSortedOptions(
      autoSortOptions,
      optionsWithFavorites,
      hasFavoriteOptions,
    );
  }

  if (groups && Object.keys(groups).length > 0) {
    const optionGroups = getGroups(groups, baseOptions);

    return getSortedOptions(autoSortOptions, optionGroups);
  }

  return getSortedOptions(autoSortOptions, baseOptions);
};

const getOptionsWithFavorites = <T,>(
  baseOptions: Option<T>[],
  favorites: string[],
  includeFavorites: boolean,
  groups?: Groups,
  labels?: CountryPickerLabels,
) => {
  const favoriteOptions = favorites
    .map((code) => baseOptions.find((option) => String(option.value) === code))
    .filter(Boolean) as Option<T>[];

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

const getSortedOptions = <T,>(
  autoSortOptions: boolean,
  options: Option<T>[] | OptionGroup<T>[],
  hasFavoriteOptions?: boolean,
) => {
  if (!autoSortOptions) {
    return options as Option<T>[] | OptionGroup<T>[];
  }

  if (!hasOptionGroup(options)) {
    return [...(options as Option<T>[])].sort(sortByLabel);
  }

  const sortedOptionsGroup = (options as OptionGroup<T>[]).map((group) => {
    return {
      ...group,
      options: [...(group.options as Option<T>[])].sort(sortByLabel),
    };
  });

  if (hasFavoriteOptions) {
    return [
      sortedOptionsGroup[0],
      ...sortedOptionsGroup.slice(1).sort(sortByLabel),
    ];
  }

  return sortedOptionsGroup.sort(sortByLabel);
};

const hasOptionGroup = <T,>(
  options: Option<T>[] | OptionGroup<T>[],
): options is OptionGroup<T>[] => {
  return (
    Array.isArray(options) && options.length > 0 && "options" in options[0]
  );
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
      autoSortOptions={false}
      options={options}
      renderOption={properties.renderOption ?? handleRenderOption}
      onChange={handleOnChange}
    />
  );
};
