import React from "react";

import LoadingIcon from "../../LoadingIcon";
import { Button } from "../ButtonBasic";

interface SubmitButtonProperties {
  disabled?: boolean;
  label: string;
  loading?: boolean;
}

export const SubmitButton = ({
  disabled,
  label,
  loading,
}: SubmitButtonProperties) => {
  return (
    <Button
      disabled={disabled || loading}
      iconRight={loading && <LoadingIcon />}
      label={label}
      type="submit"
    />
  );
};
