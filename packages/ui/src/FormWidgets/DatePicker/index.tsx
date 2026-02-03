import { Calendar, CalendarProps } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { classNames } from "primereact/utils";
import { FC } from "react";

export interface DatePickerProperties extends Omit<
  CalendarProps,
  "value" | "onChange"
> {
  className?: string;
  error?: string;
  label?: string;
  name: string;
  onChange: (value: Nullable<string | Date | Date[]>) => void;
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
        id={name}
        value={value}
        onChange={(event) => onChange(event.value)}
        className={classNames({ "p-invalid": error })}
        dateFormat={dateFormat}
        {...others}
      />

      {error && <span className="error-message">{error}</span>}
    </div>
  );
};
