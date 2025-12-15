import React, { useMemo } from "react";

import countriesList from "./countries.json";
import { Select, ISelectProperties } from "../Select";

export interface Country {
  code: string;
  i18n: {
    en: string;
    fr: string;
    th: string;
    [key: string]: string;
  };
}

export type CountryData = {
  code: string;
  i18n?: Partial<Country["i18n"]>;
};

export type CountryPickerProperties<T> = Omit<
  ISelectProperties<T>,
  "options"
> & {
  data?: CountryData[];
  include?: string[];
  exclude?: string[];
  locale?: string;
};

export const CountryPicker = <T extends string | number>({
  data,
  include,
  exclude,
  locale = "en",
  ...properties
}: CountryPickerProperties<T>) => {
  let updatedCountriesList = countriesList as Country[];

  const options = useMemo(() => {
    if (data && data.length > 0) {
      const countryMap = new Map<string, Country | CountryData>(
        updatedCountriesList.map((country) => [country.code, country]),
      );

      data.forEach((item) => {
        const existing = countryMap.get(item.code) as Country;

        if (existing) {
          countryMap.set(item.code, {
            ...existing,
            ...item,
            i18n: {
              ...existing.i18n,
              ...item.i18n,
            },
          });
        } else {
          countryMap.set(item.code, item);
        }
      });

      updatedCountriesList = Array.from(countryMap.values()) as Country[];
    }

    const includeSet = include && include.length > 0 ? new Set(include) : null;
    const excludeSet = exclude && exclude.length > 0 ? new Set(exclude) : null;

    if (includeSet || excludeSet) {
      updatedCountriesList = updatedCountriesList.filter((country) => {
        if (excludeSet && excludeSet.has(country.code)) {
          return false;
        }

        if (includeSet && !includeSet.has(country.code)) {
          return false;
        }

        return true;
      });
    }

    return updatedCountriesList.map((item) => {
      const label = item.i18n?.[locale] || item.i18n?.en;

      return {
        value: item.code as unknown as T,
        label,
        ...item,
      };
    });
  }, [data, include, locale, exclude]);

  return <Select {...(properties as ISelectProperties<T>)} options={options} />;
};
