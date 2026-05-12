import React from "react";

export interface BaseButtonProperties {
  alignCenter?: boolean;
  alternativeText?: string;
  borderRadiusType?: "pill" | "rectangular";
  className?: string;
  handleClick?: () => void;
  imageSource: string;
  title?: string;
  variant?: "dark" | "light";
}

const BaseButton: React.FC<BaseButtonProperties> = ({
  alignCenter = false,
  alternativeText,
  borderRadiusType = "rectangular",
  className = "",
  handleClick,
  imageSource,
  title,
  variant = "light",
}) => {
  return (
    <button
      className={`sso-button ${className} ${variant} ${borderRadiusType} ${
        alignCenter ? "center" : ""
      }`}
      onClick={handleClick}
    >
      <img
        alt={alternativeText ? alternativeText : `${className} logo`}
        src={imageSource}
      />
      <span>{title}</span>
    </button>
  );
};

export default BaseButton;
