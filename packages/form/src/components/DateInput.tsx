import React, { useRef } from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

interface IDateInput {
  className?: string;
  disabled?: boolean;
  helperText?: string;
  label?: string | React.ReactNode;
  max?: string | number | Date;
  min?: string | number | Date;
  name: string;
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldState?: UseFormGetFieldState<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
}

// TODO use Input component from @prefabs.tech/react-ui
export const DateInput: React.FC<IDateInput> = ({
  className = "",
  disabled,
  helperText,
  label = "",
  max,
  min,
  name,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  register,
  getFieldState,
}) => {
  if (!register || !getFieldState) return null;

  const inputReference = useRef<HTMLInputElement | null>(null);

  const { error, invalid } = getFieldState(name);

  const { ref, ...rest } = register(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;

    if (showValidState && !invalid) return false;
  };

  const handleClick = () => {
    if (inputReference.current) {
      inputReference.current.showPicker();
    }
  };

  const convertToDateString = (value: string | number | Date | undefined) => {
    if (!value) return undefined;

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return undefined;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div className={`field ${className}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...rest}
        name={name}
        id={name}
        aria-invalid={submitCount > 0 ? checkInvalidState() : undefined}
        type="date"
        disabled={disabled}
        onClick={handleClick}
        ref={(event) => {
          ref(event);
          inputReference.current = event;
        }}
        min={convertToDateString(min)}
        max={convertToDateString(max)}
      />
      {helperText && <span className="helper-text">{helperText}</span>}
      {error?.message && (
        <span className="error-message">{error?.message}</span>
      )}
    </div>
  );
};
