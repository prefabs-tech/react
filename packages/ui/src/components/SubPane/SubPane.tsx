import React, { ReactNode } from "react";

type Properties = {
  children: ReactNode;
  title: string;
  icon?: string | ReactNode;
};

const SubPane: React.FC<Properties> = ({ children }) => {
  return <div className="sub-pane">{children}</div>;
};

export default SubPane;
