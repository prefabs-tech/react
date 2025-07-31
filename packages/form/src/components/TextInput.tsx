import { IInputProperties, Input } from "@prefabs.tech/react-ui";
import React from "react";
import {
  UseFormGetFieldState,
  UseFormRegister,
  Controller,
  useFormContext,
} from "react-hook-form";

interface ITextInput extends IInputProperties {
  defaultValue?: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  name: string;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitCount?: number;
  /** @deprecated */
  getFieldState?: UseFormGetFieldState<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /** @deprecated */
  register?: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const TextInput: React.FC<ITextInput> = ({
  defaultValue = "",
  label = "",
  name,
  placeholder = "",
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  ...others
}) => {
  const { control, getFieldState } = useFormContext();

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;
    if (showValidState && !invalid) return false;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Input
          {...others}
          name={field.name}
          label={label}
          placeholder={placeholder}
          value={field.value}
          type="text"
          errorMessage={error?.message}
          onChange={field.onChange}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
        />
      )}
    />
  );
};
