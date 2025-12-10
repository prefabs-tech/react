import React from "react";

import countriesList from "./countries.json";
import { Select, ISelectProperties } from "../Select";

export interface Country {
  code: string;
  i18n: {
    en: string;
    fr: string;
    th: string;
  };
}

type CountryInput = {
  code: string;
  i18n: Partial<Country["i18n"]>;
};

export type CountryPickerProperties<T> = Omit<
  ISelectProperties<T>,
  "options"
> & {
  data?: CountryInput[];
  locale?: "en" | "fr" | "th";
};

export const CountryPicker = <T extends string | number>({
  data = [],
  locale = "en",
  ...properties
}: CountryPickerProperties<T>) => {
  let updatedcountriesList = countriesList as Country[];

  if (data && data.length > 0) {
    const countryMap = new Map<string, Country | CountryInput>(
      updatedcountriesList.map((country) => [country.code, country]),
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

    updatedcountriesList = Array.from(countryMap.values()) as Country[];
  }

  const options = updatedcountriesList.map((item) => {
    const label = item.i18n?.[locale] || item.i18n?.en;

    return {
      value: item.code as unknown as T,
      label,
      ...item,
    };
  });

  return <Select {...(properties as ISelectProperties<T>)} options={options} />;
};
