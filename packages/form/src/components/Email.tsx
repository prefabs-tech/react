import { IInputProperties, Input } from "@prefabs.tech/react-ui";
import React from "react";
import {
  Controller,
  useFormContext,
  UseFormGetFieldState,
  UseFormRegister,
} from "react-hook-form";

interface IProperties extends IInputProperties {
  defaultValue?: string;
  /** @deprecated */
  getFieldState?: UseFormGetFieldState<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  label?: React.ReactNode | string;
  name: string;
  /** @deprecated */
  register?: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
}

export const Email: React.FC<IProperties> = ({
  autoComplete = "email",
  defaultValue = "",
  disabled = false,
  helperText,
  label = "",
  name,
  placeholder = "",
  readOnly = false,
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
      defaultValue={defaultValue}
      name={name}
      render={({ field }) => (
        <Input
          {...others}
          autoComplete={autoComplete}
          disabled={disabled}
          errorMessage={error?.message}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          helperText={helperText}
          label={label}
          name={field.name}
          onChange={field.onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          type="email"
          value={field.value}
        />
      )}
    />
  );
};
