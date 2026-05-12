import { TextareaHTMLAttributes } from "react";

export interface ITextareaProperties extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
  hasError?: boolean;
  helperText?: string;
  label?: React.ReactNode | string;
}

export const Textarea = ({
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
  ...others
}: ITextareaProperties) => {
  return (
    <div className={`field ${className}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        aria-invalid={hasError}
        className={`textarea-field ${name}`.trimEnd()}
        disabled={disabled}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        value={defaultValue}
        {...others}
      />
      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};
