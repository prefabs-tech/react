import {
  CheckboxInput as BasicCheckboxInput,
  ICheckboxInputProperties,
} from "@prefabs.tech/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const CheckboxInput = <T extends string | number>({
  className,
  direction,
  disabled,
  label,
  name,
  options,
  helperText,
  inputLabel,
  ...others
}: ICheckboxInputProperties<T>) => {
  const { control, getFieldState } = useFormContext();

  const { error } = getFieldState(name);

  const isMultiCheckbox = Array.isArray(options) && options.length > 0;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={isMultiCheckbox ? [] : false}
      render={({ field }) => (
        <BasicCheckboxInput
          checked={!isMultiCheckbox ? field.value : undefined}
          className={className}
          direction={direction}
          disabled={disabled}
          errorMessage={error?.message}
          helperText={helperText}
          inputLabel={inputLabel}
          label={label}
          name={field.name}
          onChange={field.onChange}
          options={options}
          value={isMultiCheckbox ? field.value : undefined}
          {...others}
        />
      )}
    />
  );
};
