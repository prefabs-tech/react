import {
  DatePicker as DatePickerBasic,
  DatePickerProperties,
} from "@prefabs.tech/react-ui";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface DatePicker extends Omit<
  DatePickerProperties,
  "error" | "inputRef" | "onChange" | "value"
> {
  name: string;
}

export const DatePicker: FC<DatePicker> = ({ name, ...others }) => {
  const { control, getFieldState } = useFormContext();
  const { error } = getFieldState(name);

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePickerBasic
            error={error?.message}
            inputRef={field.ref}
            name={name}
            onChange={field.onChange}
            value={field.value}
            {...others}
          />
        )}
      />
    </>
  );
};
