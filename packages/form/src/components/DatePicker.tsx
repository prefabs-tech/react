import {
  DatePicker as DatePickerBasic,
  DatePickerProperties,
} from "@prefabs.tech/react-ui";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface DatePicker
  extends Omit<
    DatePickerProperties,
    "onChange" | "value" | "error" | "inputRef"
  > {
  name: string;
}

export const DatePicker: FC<DatePicker> = ({ name, ...others }) => {
  const { control, getFieldState } = useFormContext();
  const { error } = getFieldState(name);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePickerBasic
            inputRef={field.ref}
            name={name}
            onChange={field.onChange}
            value={field.value}
            error={error?.message}
            {...others}
          />
        )}
      />
    </>
  );
};
