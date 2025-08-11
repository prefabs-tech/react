import { LocaleSwitcher } from "@prefabs.tech/react-i18n";

import useConfig from "@/hooks/useConfig";

import { Copyright, Version } from "../common";

type SidebarFooterProperties = {
  children?: React.ReactNode;
  noLocaleSwitcher?: boolean;
};

export const SidebarFooter = ({
  children,
  noLocaleSwitcher,
}: SidebarFooterProperties) => {
  const renderContent = () => {
    const { layout: layoutConfig } = useConfig();

    return (
      <>
        {!noLocaleSwitcher && (
          <LocaleSwitcher showBadge={layoutConfig?.localeSwitcher?.showBadge} />
        )}
        <Copyright />
        <Version />
      </>
    );
  };

  return <div className="dz-sidebar-footer">{children || renderContent()}</div>;
};
