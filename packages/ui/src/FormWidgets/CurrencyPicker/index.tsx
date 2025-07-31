import React from "react";

import { Select, ISelectProperties, Option } from "../Select";

export type CurrencyOption<T> = Option<T> & {
  code?: string;
  symbol?: string;
};

export type CurrencyPickerProperties<T> = Omit<
  ISelectProperties<T>,
  "options" | "renderOption" | "multiple" | "value" | "onChange"
> & {
  options: CurrencyOption<T>[];
  renderOption?: (option: CurrencyOption<T>) => React.ReactNode;
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

export const CurrencyPicker = <T extends string | number>({
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

    return selectOptions.filter(({ label, code, symbol }) => {
      return [label, code, symbol].some((field) =>
        field?.toLowerCase().includes(searchInput),
      );
    });
  };

  return (
    <Select
      className="currency-picker"
      menuOptions={{
        className: "currency-picker-menu",
      }}
      customSearchFn={_customSearch}
      options={selectOptions}
      renderOption={_renderOption}
      {...properties}
    />
  );
};
