import { forwardRef, InputHTMLAttributes } from "react";

export interface IInputProperties extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  hasError?: boolean;
  helperText?: string;
  label?: React.ReactNode | string;
  type?: "email" | "number" | "text";
}

export const Input = forwardRef<HTMLInputElement, IInputProperties>(
  (
    {
      className = "",
      defaultValue,
      disabled,
      errorMessage,
      hasError,
      helperText,
      label,
      name = "",
      onChange,
      placeholder,
      readOnly,
      type,
      ...others
    },
    reference,
  ) => {
    return (
      <div className={`field ${className}`.trimEnd()}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          {...others}
          aria-invalid={hasError}
          className={`input-field ${name}`}
          defaultValue={defaultValue}
          disabled={disabled}
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={reference}
          type={type}
        />
        {helperText && <span className="helper-text">{helperText}</span>}
        {errorMessage && <span className="error-message">{errorMessage}</span>}
      </div>
    );
  },
);
