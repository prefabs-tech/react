import { LocaleSwitcher } from "@prefabs.tech/react-i18n";

import useConfig from "@/hooks/useConfig";
import { UserMenuType } from "@/types";

import { UserMenu } from "../common/UserMenu";

import type { UserMenuModeType } from "@prefabs.tech/react-ui";

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
