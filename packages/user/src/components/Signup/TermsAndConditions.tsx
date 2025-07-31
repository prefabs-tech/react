import { CheckboxInput } from "@prefabs.tech/react-form";
import React from "react";

interface IProperties {
  hasCheckbox?: boolean;
  label: React.ReactNode;
  name: string;
}

export const TermsAndConditions: React.FC<IProperties> = ({
  hasCheckbox = true,
  label,
  name,
}) => {
  return hasCheckbox ? (
    <CheckboxInput
      name={name}
      inputLabel={label}
      className="terms-and-conditions"
    />
  ) : (
    <p className="terms-and-conditions" aria-label={name}>
      {label}
    </p>
  );
};
