import React from "react";

import { ISelectProperties, Option, Select } from "../Select";

export type CurrencyOption<T> = Option<T> & {
  code?: string;
  symbol?: string;
};

export type CurrencyPickerProperties<T> = Omit<
  ISelectProperties<T>,
  "multiple" | "onChange" | "options" | "renderOption" | "value"
> &
  (
    | {
        multiple: true;
        onChange: (newValue: T[]) => void;
        value: T[];
      }
    | {
        multiple?: false;
        onChange: (newValue: T) => void;
        value: T;
      }
  ) & {
    options: CurrencyOption<T>[];
    renderOption?: (option: CurrencyOption<T>) => React.ReactNode;
  };

export const CurrencyPicker = <T extends number | string>({
  options,
  renderOption,
  ...properties
}: CurrencyPickerProperties<T>) => {
  const selectOptions = options.map((option) => ({
    code: option?.code,
    label: option.label,
    symbol: option?.symbol,
    value: option.value as T,
  }));

  const _renderOption = (option: CurrencyOption<T>) => {
    if (renderOption) {
      return renderOption(option);
    }

    return (
      <div className="currency-picker-option">
        <span className="code">{option?.code}</span>
        <span className="label">{option?.label}</span>
        <span className="symbol">{option?.symbol}</span>
      </div>
    );
  };

  const _customSearch = (searchInput: string) => {
    searchInput = searchInput.toLowerCase();

    return selectOptions.filter(({ code, label, symbol }) => {
      return [label, code, symbol].some((field) =>
        field?.toLowerCase().includes(searchInput),
      );
    });
  };

  return (
    <Select
      className="currency-picker"
      customSearchFn={_customSearch}
      menuOptions={{
        className: "currency-picker-menu",
      }}
      options={selectOptions}
      renderOption={_renderOption}
      {...properties}
    />
  );
};
