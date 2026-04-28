import React from "react";

const LoadingIcon = ({
  color,
  fontSize,
}: Pick<React.CSSProperties, "color" | "fontSize">) => {
  return (
    <div
      className="loading"
      data-testid="loading"
      style={{ color, fontSize }}
    />
  );
};

export default LoadingIcon;
