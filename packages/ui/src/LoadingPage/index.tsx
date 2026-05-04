import React from "react";

import LoadingIcon from "../LoadingIcon";

export interface LoadingPageProperties extends Pick<
  React.CSSProperties,
  "color" | "fontSize"
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
      <LoadingIcon color={color} fontSize={fontSize} />
    </div>
  );
};

export default LoadingPage;
