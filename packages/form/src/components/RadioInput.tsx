import {
  RadioInput as BasicRadioInput,
  IRadioInputProperties,
} from "@prefabs.tech/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IRadioInput extends IRadioInputProperties {
  disabled?: boolean;
  name: string;
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
}

export const RadioInput: React.FC<IRadioInput> = ({
  className,
  disabled,
  label,
  name,
  options,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  ...others
}) => {
  const { control, getFieldState } = useFormContext();

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) {
      return true;
    }

    if (showValidState && !invalid) {
      return false;
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <BasicRadioInput
          disabled={disabled}
          errorMessage={error?.message}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          label={label}
          name={field.name}
          onChange={field.onChange}
          options={options}
          value={field.value}
          {...others}
        />
      )}
    />
  );
};
