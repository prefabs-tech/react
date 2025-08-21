import { Copyright, Version } from "../common";

type SidebarFooterProperties = {
  children?: React.ReactNode;
};

export const SidebarFooter = ({ children }: SidebarFooterProperties) => {
  const renderContent = () => {
    return (
      <>
        <Copyright />
        <Version />
      </>
    );
  };

  return <div className="dz-sidebar-footer">{children || renderContent()}</div>;
};
