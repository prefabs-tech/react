import React from "react";

import countryList from "./Countries.json";
import { Select, ISelectProperties, Option } from "../Select";

export type CountryOption<T> = Option<T> & {
  code: string;
  i18n?: {
    En: string;
    Fr: string;
    Th: string;
  };
};

export interface CountryData {
  code: string;
  i18n: {
    En: string;
    Fr: string;
    Th: string;
  };
}

export type CountryPickerProperties<T> = Omit<
  ISelectProperties<T>,
  "options" | "renderOption" | "multiple" | "value" | "onChange"
> & {
  data?: CountryData[];
  locale?: "En" | "Fr" | "Th";
  renderOption?: (option: CountryOption<T>) => React.ReactNode;
} & (
    | {
        multiple: true;
        value: T[];
        onChange: (newValue: T[]) => void;
      }
    | {
        multiple?: false;
        value: T;
        onChange: (newValue: T) => void;
      }
  );

export const CountryPicker = <T extends string | number>({
  data = countryList as CountryData[],
  locale = "En",
  renderOption,
  ...properties
}: CountryPickerProperties<T>) => {
  const selectOptions = data.map((item) => ({
    value: item.code as unknown as T,
    label: item.i18n[locale] || item.i18n.En,
    code: item.code,
    i18n: item.i18n,
  }));

  const _renderOption = (option: CountryOption<T>) => {
    if (renderOption) {
      return renderOption(option);
    }

    // Default internal renderer
    return (
      <div className="country-picker-option">
        <span>
          {option.label} ({option.code})
        </span>
      </div>
    );
  };

  return (
    <Select
      className="country-picker"
      menuOptions={{ className: "country-picker-menu" }}
      options={selectOptions}
      {...properties}
      renderOption={
        _renderOption as unknown as (option: Option<T>) => React.ReactNode
      }
    />
  );
};
