import { InputHTMLAttributes } from "react";

export interface IRadioInputProperties extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  helperText?: string;
  label?: React.ReactNode | string;
  name?: string;
  options: IOption[];
}

interface IOption {
  label: number | string;
  value: number | string;
}

export const RadioInput: React.FC<IRadioInputProperties> = ({
  className = "",
  disabled,
  errorMessage,
  hasError,
  helperText,
  label = "",
  name,
  onChange,
  options,
  type,
  value,
  ...others
}) => {
  return (
    <fieldset className={`field ${className}`.trim()}>
      <legend>{label}</legend>
      {options?.map(({ label: optionLabel, value: optionValue }) => (
        <div className="radio-button-wrapper" key={optionValue}>
          <input
            aria-invalid={hasError}
            checked={optionValue === value}
            disabled={disabled}
            id={`choice-${optionValue}`}
            name={name}
            onChange={onChange}
            type="radio"
            value={optionValue}
            {...others}
          ></input>
          {optionLabel && (
            <label htmlFor={`choice-${optionValue}`}>{optionLabel}</label>
          )}
        </div>
      ))}
      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </fieldset>
  );
};
