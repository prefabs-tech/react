import { InputHTMLAttributes } from "react";

export interface ISwitchInputProperties extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  helperText?: string;
  label?: React.ReactNode | string;
  name?: string;
}

export const SwitchInput: React.FC<ISwitchInputProperties> = ({
  className = "",
  disabled,
  errorMessage,
  hasError,
  helperText,
  label = "",
  name,
  ...others
}) => {
  return (
    <div className={`field switch-toggle ${className}`.trim()}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        aria-invalid={hasError}
        disabled={disabled}
        id={name}
        type="checkbox"
        {...others}
      ></input>
      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};
