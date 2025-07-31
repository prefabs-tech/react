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
  if (!register || !getFieldState) return null;

  const { error, invalid } = getFieldState(name);
  const [showPassword, setShowPassword] = useState(false);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;

    if (showValidState && !invalid) return false;
  };

  return (
    <div className={`field ${className}`.trimEnd()}>
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className="input-field-password"
        aria-invalid={submitCount > 0 ? checkInvalidState() : undefined}
      >
        <input
          {...others}
          {...register(name)}
          name={name}
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          aria-invalid={submitCount > 0 ? checkInvalidState() : undefined}
          autoComplete={autoComplete}
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
