import { LocaleSwitcher } from "@prefabs.tech/react-i18n";
import { NavigationMenu } from "@prefabs.tech/react-ui";
import { useMemo } from "react";

import { SidebarFooter } from "./Footer";
import { SidebarHeader } from "./Header";
import { UserMenu } from "../common/UserMenu";

import type {
  NavGroupDisplayMode,
  NavGroupType,
  NavItemType,
  NavMenuItemType,
  NavMenuType,
} from "@prefabs.tech/react-ui";

import { useLayoutContext } from "@/context/LayoutProvider";
import useConfig from "@/hooks/useConfig";

type SidebarProperties = {
  children?: React.ReactNode;
  collapsible?: boolean;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  noFooter?: boolean;
  noHeader?: boolean;
  noLocaleSwitcher?: boolean;
  userMenu?: NavMenuItemType;
  userMenuMode?: NavGroupDisplayMode;
  trigger?: React.ReactNode;
};

export const Sidebar = ({
  children,
  collapsible = true,
  displayNavIcons = false,
  navigationMenu,
  noFooter = false,
  noHeader = false,
  noLocaleSwitcher = false,
  userMenu,
  userMenuMode,
  trigger,
}: SidebarProperties) => {
  const { layout: layoutConfig } = useConfig();
  const { setMenuMobileOpen } = useLayoutContext();

  const refinedMenu = useMemo(() => {
    const addOnClick = (
      menu: NavItemType | NavGroupType,
    ): NavItemType | NavGroupType => ({
      ...menu,
      onClick: () => {
        if ("onClick" in menu && typeof menu.onClick === "function") {
          menu.onClick();
        }

        setMenuMobileOpen(false);
      },
      ...(Array.isArray((menu as NavGroupType).submenu) && {
        submenu: (menu as NavGroupType).submenu.map(addOnClick),
      }),
    });

    if (!Array.isArray(navigationMenu)) {
      return {
        ...navigationMenu,
        menu: Array.isArray(navigationMenu?.menu)
          ? navigationMenu.menu.map(addOnClick)
          : [],
      };
    }

    return navigationMenu.map((_menu) => ({
      ..._menu,
      menu: Array.isArray(_menu.menu) ? _menu.menu.map(addOnClick) : [],
    }));
  }, [navigationMenu]);

  const renderContent = () => {
    return (
      <>
        {!noHeader && <SidebarHeader />}
        <NavigationMenu
          displayIcons={displayNavIcons}
          navigationMenu={refinedMenu || []}
        />
        {userMenu && (
          <UserMenu
            menu={userMenu}
            trigger={trigger}
            userMenuMode={userMenuMode}
          />
        )}
        {!noLocaleSwitcher && (
          <div className="dz-sidebar-locale-switcher">
            <LocaleSwitcher
              showBadge={layoutConfig?.localeSwitcher?.showBadge}
            />
          </div>
        )}
        {!noFooter && <SidebarFooter />}
      </>
    );
  };

  return (
    <div className={`dz-sidebar ${collapsible ? "collapsible" : ""}`.trim()}>
      {children || renderContent()}
    </div>
  );
};
