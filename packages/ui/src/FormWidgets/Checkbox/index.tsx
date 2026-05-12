import { InputHTMLAttributes } from "react";

interface IProperties extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  helperText?: string;
  label?: React.ReactNode | string;
}

export const Checkbox: React.FC<IProperties> = ({
  checked,
  disabled,
  errorMessage,
  helperText,
  label,
  name,
  onChange,
  value,
  ...others
}) => {
  return (
    <div className="checkbox-wrapper">
      <input
        checked={checked}
        disabled={disabled}
        id={name}
        name={name}
        onChange={onChange}
        type="checkbox"
        value={value}
        {...others}
      />
      {label && <label htmlFor={name}>{label}</label>}
      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};
