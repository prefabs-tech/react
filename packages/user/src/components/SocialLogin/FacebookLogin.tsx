import { FacebookButton } from "@prefabs.tech/react-ui";
import React from "react";

import { socialLogin } from "@/supertokens";

interface Properties {
  label: string;
  redirectUrl: string;
}

export const FacebookLogin = ({ label, redirectUrl }: Properties) => {
  const onFacebookSignin = async () => {
    await socialLogin("facebook", redirectUrl);
  };

  return (
    <FacebookButton
      handleClick={onFacebookSignin}
      title={label}
      variant="dark"
    />
  );
};
