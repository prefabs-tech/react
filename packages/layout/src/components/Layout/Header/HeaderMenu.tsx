import type { UserMenuModeType } from "@prefabs.tech/react-ui";

import { LocaleSwitcher } from "@prefabs.tech/react-i18n";

import useConfig from "@/hooks/useConfig";
import { UserMenuType } from "@/types";

import { UserMenu } from "../common/UserMenu";

interface HeaderProperties {
  children?: React.ReactNode;
  menu?: UserMenuType;
  noLocaleSwitcher?: boolean;
  userMenuMode?: UserMenuModeType;
}

export const HeaderMenu = ({
  children,
  menu,
  noLocaleSwitcher,
  userMenuMode,
}: HeaderProperties) => {
  const renderContent = () => {
    const { layout: layoutConfig } = useConfig();

    return (
      <>
        {menu && <UserMenu menu={menu} userMenuMode={userMenuMode} />}
        {!noLocaleSwitcher && (
          <LocaleSwitcher showBadge={layoutConfig?.localeSwitcher?.showBadge} />
        )}
      </>
    );
  };

  return <div className="dz-header-menu">{children || renderContent()}</div>;
};
