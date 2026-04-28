import React from "react";

import { Checkbox } from "../Checkbox";

export interface ICheckboxInputProperties<T> {
  checked?: boolean;
  className?: string;
  direction?: "horizontal" | "vertical";
  disabled?: boolean;
  errorMessage?: string;
  helperText?: string;
  inputLabel?: React.ReactNode | string;
  label?: React.ReactNode | string;
  name: string;
  onChange?: (newValue: boolean | T[]) => void;
  options?: Option<T>[];
  placeholder?: string;
  renderOptionsLabel?: (option: Option<T>) => React.ReactNode;
  value?: T[];
}

interface Option<T> {
  label: string;
  value: T;
}

export const CheckboxInput = <T extends number | string>({
  checked = false,
  className = "",
  direction = "vertical",
  disabled,
  errorMessage,
  helperText,
  inputLabel,
  label,
  name,
  onChange,
  options = [],
  renderOptionsLabel,
  value = [],
}: ICheckboxInputProperties<T>) => {
  const hasOptions = Array.isArray(options) && options.length > 0;

  const isOptionChecked = (optionValue: T) => value?.includes(optionValue);

  const handleSelectOption = (option: T) => {
    if (!onChange) {
      return;
    }

    const newValue = value?.includes(option)
      ? value.filter((_value) => _value !== option)
      : [...value, option];

    onChange(newValue);
  };

  const handleSingleCheckboxChange = () => {
    if (!onChange) {
      return;
    }

    onChange(!checked);
  };

  return (
    <fieldset className={`field checkbox ${className}`.trim()}>
      {label && <legend>{label}</legend>}

      {hasOptions ? (
        <div className={`checkbox-group direction-${direction}`}>
          {options.map((option, index) => (
            <Checkbox
              checked={isOptionChecked(option.value)}
              disabled={disabled}
              key={option.value}
              label={
                renderOptionsLabel ? renderOptionsLabel(option) : option.label
              }
              name={`${name}-${index}`}
              onChange={() => handleSelectOption(option.value)}
              value={option.value}
            />
          ))}
        </div>
      ) : (
        <Checkbox
          checked={checked}
          disabled={disabled}
          label={inputLabel}
          name={name}
          onChange={handleSingleCheckboxChange}
        />
      )}

      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </fieldset>
  );
};
