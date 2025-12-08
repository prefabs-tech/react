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
<<<<<<< HEAD
    label: `${item.i18n[locale] || item.i18n.en}`,
=======
    label: `${item.i18n[locale] || item.i18n.en} (${item.code})`,
>>>>>>> 64d26dfd (feat(ui/CountryPicker): add new CountryPicker component)
    ...item,
  }));

  return (
<<<<<<< HEAD
    <Select {...(properties as ISelectProperties<T>)} options={countries} />
=======
    <Select
      {...(properties as unknown as ISelectProperties<T>)}
      className="country-picker"
      menuOptions={{ className: "country-picker-menu" }}
      options={countries}
    />
>>>>>>> 64d26dfd (feat(ui/CountryPicker): add new CountryPicker component)
  );
};
