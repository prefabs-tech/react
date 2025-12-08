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

export type CountryPickerProperties<T> = Omit<
  ISelectProperties<T>,
  "options"
> & {
  data?: Country[];
  locale?: "en" | "fr" | "th";
};

export const CountryPicker = <T extends string | number>({
  data = countriesList as Country[],
  locale = "en",
  ...properties
}: CountryPickerProperties<T>) => {
  const countries = data.map((item) => ({
    value: item.code as unknown as T,
    label: `${item.i18n[locale] || item.i18n.en} (${item.code})`,
    ...item,
  }));

  return (
    <Select
      {...(properties as unknown as ISelectProperties<T>)}
      className="country-picker"
      menuOptions={{ className: "country-picker-menu" }}
      options={countries}
    />
  );
};
