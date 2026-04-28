import React from "react";

interface IProperties {
  orientation?: "horizontal" | "vertical";
}

const Divider: React.FC<IProperties> = ({ orientation = "horizontal" }) => {
  return (
    <div
      className="divider"
      data-aria-orientation={orientation}
      role="separator"
    />
  );
};

export default Divider;
