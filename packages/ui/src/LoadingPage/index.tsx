import React from "react";

import LoadingIcon from "../LoadingIcon";

export interface LoadingPageProperties extends Pick<
  React.CSSProperties,
  "fontSize" | "color"
> {
  pageType?: "container" | "overlay";
}

const LoadingPage = ({
  color,
  fontSize,
  pageType = "container",
}: LoadingPageProperties) => {
  return (
    <div className={`loading-${pageType}`}>
      <LoadingIcon fontSize={fontSize} color={color} />
    </div>
  );
};

export default LoadingPage;
