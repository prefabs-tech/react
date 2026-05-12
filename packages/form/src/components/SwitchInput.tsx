import {
  SwitchInput as BasicSwitchInput,
  ISwitchInputProperties,
} from "@prefabs.tech/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ISwitch extends ISwitchInputProperties {
  disabled?: boolean;
  label?: React.ReactNode | string;
  name: string;
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
}

export const SwitchInput: React.FC<ISwitch> = ({
  className,
  disabled,
  label,
  name,
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
        <BasicSwitchInput
          checked={field.value}
          className={className}
          disabled={disabled}
          errorMessage={error?.message}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          label={label}
          name={field.name}
          onChange={field.onChange}
          {...others}
        />
      )}
    />
  );
};
