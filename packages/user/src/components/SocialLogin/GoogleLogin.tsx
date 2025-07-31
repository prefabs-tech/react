import { GoogleButton } from "@prefabs.tech/react-ui";
import React from "react";

import { socialLogin } from "@/supertokens";

interface Properties {
  label: string;
  redirectUrl: string;
}

export const GoogleLogin = ({ label, redirectUrl }: Properties) => {
  const onGoogleSignin = async () => {
    await socialLogin("google", redirectUrl);
  };

  return (
    <GoogleButton handleClick={onGoogleSignin} title={label} variant="dark" />
  );
};
