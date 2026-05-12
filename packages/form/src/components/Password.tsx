import { IInputProperties } from "@prefabs.tech/react-ui";
import React, { useState } from "react";

import { CustomInputProperties } from "../types";

export const Password: React.FC<CustomInputProperties & IInputProperties> = ({
  autoComplete = "new-password",
  className = "",
  getFieldState,
  helperText,
  label = "",
  name,
  placeholder = "",
  register,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  ...others
}) => {
  if (!register || !getFieldState) {
    return null;
  }

  const { error, invalid } = getFieldState(name);
  const [showPassword, setShowPassword] = useState(false);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) {
      return true;
    }

    if (showValidState && !invalid) {
      return false;
    }
  };

  return (
    <div className={`field ${className}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      <div
        aria-invalid={submitCount > 0 ? checkInvalidState() : undefined}
        className="input-field-password"
      >
        <input
          {...others}
          {...register(name)}
          aria-invalid={submitCount > 0 ? checkInvalidState() : undefined}
          autoComplete={autoComplete}
          id={name}
          name={name}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
        ></input>
        <span
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          <i className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}></i>
        </span>
      </div>
      {helperText && <span className="helper-text">{helperText}</span>}
      {error?.message && (
        <span className="error-message">{error?.message}</span>
      )}
    </div>
  );
};
