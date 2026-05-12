import {
  Select as BasicSelect,
  ISelectProperties,
  Option,
} from "@prefabs.tech/react-ui";
import React, { useEffect, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ISelect<T extends number | string> extends Omit<
  ISelectProperties<T>,
  "errorMessage" | "hasError" | "onChange" | "value"
> {
  maxSelection?: number;
  minSelection?: number;
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
  validationMessages?: ValidationMessages;
}

interface ValidationMessages {
  maxSelection?: string;
  minSelection?: string;
}

export const Select = <T extends number | string>({
  autoSelectSingleOption = false,
  maxSelection,
  minSelection,
  multiple = false,
  name,
  options,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  validationMessages,
  ...others
}: ISelect<T>) => {
  const { control, getFieldState, setValue } = useFormContext();

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) {
      return true;
    }

    if (showValidState && !invalid) {
      return false;
    }
  };

  const flatOptions = useMemo(() => {
    return options.flatMap((opt) =>
      "options" in opt ? opt.options : [opt],
    ) as Option<T>[];
  }, [options]);

  //TODO [MA 2024-05-31]: remove this redundant useEffect for auto selecting single option
  useEffect(() => {
    if (
      autoSelectSingleOption &&
      !multiple &&
      flatOptions.length === 1 &&
      !flatOptions[0].disabled
    ) {
      setValue(name, flatOptions[0].value);
    }
  }, [flatOptions]);

  return (
    <Controller
      control={control}
      defaultValue={multiple ? [] : undefined}
      name={name}
      render={({ field }) => (
        <BasicSelect
          autoSelectSingleOption={autoSelectSingleOption}
          errorMessage={error?.message}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          multiple={multiple}
          name={name}
          onChange={field.onChange}
          options={options}
          value={field.value}
          {...others}
        />
      )}
      rules={{
        validate: (value: T | T[]) => {
          if (!multiple || !Array.isArray(value)) {
            return;
          }

          const count = value.length;

          if (minSelection && count < minSelection) {
            return (
              validationMessages?.minSelection ||
              `Please select at least ${minSelection} option(s).`
            );
          }

          if (maxSelection && count > maxSelection) {
            return (
              validationMessages?.maxSelection ||
              `You can select up to ${maxSelection} option(s) only.`
            );
          }

          return true;
        },
      }}
    />
  );
};
