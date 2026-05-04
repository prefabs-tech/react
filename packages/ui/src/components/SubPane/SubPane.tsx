import React, { ReactNode } from "react";

type Properties = {
  children: ReactNode;
  icon?: ReactNode | string;
  title: string;
};

const SubPane: React.FC<Properties> = ({ children }) => {
  return <div className="sub-pane">{children}</div>;
};

export default SubPane;
