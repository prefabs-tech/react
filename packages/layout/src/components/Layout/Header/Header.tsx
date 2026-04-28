import type { NavMenuType, UserMenuModeType } from "@prefabs.tech/react-ui";

import { NavigationMenu } from "@prefabs.tech/react-ui";
import React from "react";

import { UserMenuType } from "@/types";

import { Logo, ToggleMenuMobile } from "../common";
import { HeaderMenu } from "./HeaderMenu";
import { HeaderTitle } from "./HeaderTitle";

interface HeaderProperties {
  children?: React.ReactNode;
  displayNavIcons?: boolean;
  headerAddon?: React.ReactNode;
  menu?: UserMenuType;
  navigationMenu?: NavMenuType;
  noLocaleSwitcher?: boolean;
  noLogo?: boolean;
  noToggle?: boolean;
  title?: React.ReactNode | string;
  userMenuMode?: UserMenuModeType;
}

export const Header = ({
  children,
  displayNavIcons,
  headerAddon,
  menu,
  navigationMenu,
  noLocaleSwitcher,
  noLogo,
  noToggle,
  title,
  userMenuMode = "popup",
}: HeaderProperties) => {
  const renderContent = () => {
    return (
      <>
        {!noToggle && <ToggleMenuMobile />}
        {!noLogo && <Logo />}
        {title && <HeaderTitle title={title} />}
        {headerAddon && headerAddon}
        {navigationMenu && (
          <NavigationMenu
            displayIcons={displayNavIcons}
            horizontal
            navigationMenu={navigationMenu}
          />
        )}
        {(menu || !noLocaleSwitcher) && (
          <HeaderMenu
            menu={menu}
            noLocaleSwitcher={noLocaleSwitcher}
            userMenuMode={userMenuMode}
          />
        )}
      </>
    );
  };

  return (
    <header data-nav={!!navigationMenu}>
      <div className="dz-header-container">{children || renderContent()}</div>
    </header>
  );
};
