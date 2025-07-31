import React from "react";

import FacebookIcon from "../../assets/images/facebook-icon.svg";
import BaseButton, { BaseButtonProperties } from "../BaseButton";

type IProperties = Omit<BaseButtonProperties, "imageSource" | "className">;

const FacebookButton: React.FC<IProperties> = (properties) => {
  return (
    <BaseButton
      className="facebook"
      imageSource={FacebookIcon}
      {...properties}
    />
  );
};

export default FacebookButton;
