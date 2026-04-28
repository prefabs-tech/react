import React, { useRef } from "react";
import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

interface IDateInput {
  className?: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldState?: UseFormGetFieldState<any>;
  helperText?: string;
  label?: React.ReactNode | string;
  max?: Date | number | string;
  min?: Date | number | string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
}

// TODO use Input component from @prefabs.tech/react-ui
export const DateInput: React.FC<IDateInput> = ({
  className = "",
  disabled,
  getFieldState,
  helperText,
  label = "",
  max,
  min,
  name,
  register,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
}) => {
  if (!register || !getFieldState) {
    return null;
  }

  const inputReference = useRef<HTMLInputElement | null>(null);

  const { error, invalid } = getFieldState(name);

  const { ref, ...rest } = register(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) {
      return true;
    }

    if (showValidState && !invalid) {
      return false;
    }
  };

  const handleClick = () => {
    if (inputReference.current) {
      inputReference.current.showPicker();
    }
  };

  const convertToDateString = (value: Date | number | string | undefined) => {
    if (!value) {
      return undefined;
    }

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
        aria-invalid={submitCount > 0 ? checkInvalidState() : undefined}
        disabled={disabled}
        id={name}
        max={convertToDateString(max)}
        min={convertToDateString(min)}
        name={name}
        onClick={handleClick}
        ref={(event) => {
          ref(event);
          inputReference.current = event;
        }}
        type="date"
      />
      {helperText && <span className="helper-text">{helperText}</span>}
      {error?.message && (
        <span className="error-message">{error?.message}</span>
      )}
    </div>
  );
};
