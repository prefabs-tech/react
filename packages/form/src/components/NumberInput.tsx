import { IInputProperties, Input } from "@prefabs.tech/react-ui";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Properties extends IInputProperties {
  label: string | React.ReactNode;
  name: string;
  placeholder?: string;
  submitCount?: number;
  showValidState?: boolean;
  showInvalidState?: boolean;
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
            label={label}
            name={name}
            placeholder={placeholder}
            type="number"
            value={typeof field.value !== "number" ? "" : field.value}
            errorMessage={error?.message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = event.target.valueAsNumber;
              field.onChange(!isNaN(value) ? value : null);
            }}
            hasError={submitCount > 0 ? checkInvalidState() : undefined}
          />
        );
      }}
    />
  );
};
