import { IInputProperties, Input } from "@prefabs.tech/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Properties extends IInputProperties {
  label: React.ReactNode | string;
  name: string;
  placeholder?: string;
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
}

export const NumberInput = ({
  label,
  name,
  placeholder,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  ...others
}: Properties) => {
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
      render={({ field }) => {
        return (
          <Input
            {...others}
            errorMessage={error?.message}
            hasError={submitCount > 0 ? checkInvalidState() : undefined}
            label={label}
            name={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = event.target.valueAsNumber;
              field.onChange(!isNaN(value) ? value : null);
            }}
            placeholder={placeholder}
            type="number"
            value={typeof field.value !== "number" ? "" : field.value}
          />
        );
      }}
    />
  );
};
