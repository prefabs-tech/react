import React, { useCallback, useMemo } from "react";

import { getFallbackTranslation } from "../../utils/CountryPicker";
import { Select, ISelectProperties } from "../Select";
import defaultGroups from "./groups.json";

import type { Option, GroupedOption } from "../Select";

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
      label: getLabel(code, locale, locales, fallbackData[code]),
    });
  });

  return baseOptions;
};

const getFavoriteOptions = <T,>(
  baseOptions: Option<T>[],
  favorites: string[],
) => {
  return favorites
    .map((code) => baseOptions.find((option) => String(option.value) === code))
    .filter(Boolean) as Option<T>[];
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
): GroupedOption<T>[] => {
  const optionMap = new Map(
    list.map((option) => [String(option.value), option]),
  );

  return Object.entries(groups).reduce<GroupedOption<T>[]>(
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

const getLabel = (
  code: string,
  locale: string,
  locales: Locales | undefined,
  fallbackLabel?: string,
) => {
  return locales?.[locale]?.[code] || fallbackLabel || code;
};

const getOptions = <T,>({
  baseOptions,
  favorites,
  groups,
  includeFavorites = true,
  labels,
}: Pick<
  CountryPickerProperties<T>,
  "favorites" | "groups" | "includeFavorites" | "labels"
> & { baseOptions: Option<T>[] }) => {
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
  const favoriteOptions = getFavoriteOptions(baseOptions, favorites);

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
  isOptionsGrouped: boolean,
  hasFavoriteOptions: boolean,
  options: Option<T>[] | GroupedOption<T>[],
) => {
  if (!isOptionsGrouped) {
    return [...(options as Option<T>[])].sort(sortByLabel);
  }

  const sortedOptionsGroup = (options as GroupedOption<T>[]).map((group) => {
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
  optionA: Option<T> | GroupedOption<T>,
  optionB: Option<T> | GroupedOption<T>,
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
  const baseOptions = useMemo(() => {
    return getBaseOptions<T>(
      exclude,
      fallbackLocale,
      include,
      locale,
      locales,
    ) as Option<T>[];
  }, [exclude, fallbackLocale, include, locale, locales]);

  const options = useMemo(() => {
    return getOptions<T>({
      baseOptions,
      favorites,
      groups,
      includeFavorites,
      labels,
    });
  }, [baseOptions, favorites, groups, includeFavorites, labels]);

  const favoriteOptions = useMemo(() => {
    return favorites?.length ? getFavoriteOptions(baseOptions, favorites) : [];
  }, [baseOptions, favorites]);

  const isOptionsGrouped = useMemo(() => {
    return (
      Array.isArray(options) && options.length > 0 && "options" in options[0]
    );
  }, [options]);

  const sortedOptions = useMemo<Option<T>[] | GroupedOption<T>[]>(() => {
    if (!autoSortOptions) {
      return options as Option<T>[] | GroupedOption<T>[];
    }

    return getSortedOptions(
      isOptionsGrouped,
      !!favoriteOptions.length,
      options,
    );
  }, [autoSortOptions, favoriteOptions, isOptionsGrouped, options]);

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
      options={sortedOptions}
      renderOption={properties.renderOption ?? handleRenderOption}
      onChange={handleOnChange}
    />
  );
};
