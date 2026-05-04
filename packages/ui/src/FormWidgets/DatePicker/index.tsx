import { Calendar, CalendarProps } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { classNames } from "primereact/utils";
import { FC } from "react";

export interface DatePickerProperties extends Omit<
  CalendarProps,
  "onChange" | "value"
> {
  className?: string;
  error?: string;
  label?: string;
  name: string;
  onChange: (value: Nullable<Date | Date[] | string>) => void;
  value: Date | Date[] | null;
}

export const DatePicker: FC<DatePickerProperties> = ({
  className = "",
  dateFormat = "dd/mm/yy",
  error,
  label,
  name,
  onChange,
  value,
  ...others
}) => {
  return (
    <div className={`field ${className}`.trimEnd()}>
      {label && <label htmlFor={`input-field-${name}`}>{label}</label>}

      <Calendar
        className={classNames({ "p-invalid": error })}
        dateFormat={dateFormat}
        id={name}
        onChange={(event) => onChange(event.value)}
        value={value}
        {...others}
      />

      {error && <span className="error-message">{error}</span>}
    </div>
  );
};
