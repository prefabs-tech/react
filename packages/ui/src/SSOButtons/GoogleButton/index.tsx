import React from "react";

import GoogleIcon from "../../assets/images/google-icon.svg";
import BaseButton, { BaseButtonProperties } from "../BaseButton";

type IProperties = Omit<BaseButtonProperties, "className" | "imageSource">;

const GoogleButton: React.FC<IProperties> = (properties) => {
  return (
    <BaseButton className="google" imageSource={GoogleIcon} {...properties} />
  );
};

export default GoogleButton;
