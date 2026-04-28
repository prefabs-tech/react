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
      className="terms-and-conditions"
      inputLabel={label}
      name={name}
    />
  ) : (
    <p aria-label={name} className="terms-and-conditions">
      {label}
    </p>
  );
};
