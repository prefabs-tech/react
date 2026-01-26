import {
  SwitchInput as BasicSwitchInput,
  ISwitchInputProperties,
} from "@prefabs.tech/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ISwitch extends ISwitchInputProperties {
  disabled?: boolean;
  label?: string | React.ReactNode;
  name: string;
  showValidState?: boolean;
  showInvalidState?: boolean;
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
      name={name}
      control={control}
      render={({ field }) => (
        <BasicSwitchInput
          label={label}
          name={field.name}
          checked={field.value}
          className={className}
          onChange={field.onChange}
          disabled={disabled}
          errorMessage={error?.message}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          {...others}
        />
      )}
    />
  );
};
