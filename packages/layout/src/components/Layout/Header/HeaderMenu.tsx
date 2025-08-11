import { LocaleSwitcher } from "@prefabs.tech/react-i18n";

import { UserMenu } from "../common/UserMenu";

import type { NavMenuItemType, UserMenuModeType } from "@prefabs.tech/react-ui";

interface HeaderProperties {
  children?: React.ReactNode;
  menu?: NavMenuItemType;
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
    return (
      <>
        {menu && <UserMenu menu={menu} userMenuMode={userMenuMode} />}
        {!noLocaleSwitcher && <LocaleSwitcher />}
      </>
    );
  };

  return <div className="dz-header-menu">{children || renderContent()}</div>;
};
