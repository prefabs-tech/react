import type { NavMenuType } from "@prefabs.tech/react-ui";

import { NavigationMenu } from "@prefabs.tech/react-ui";

import { UserMenuModeType, UserMenuType } from "@/types";

import { UserMenu } from "../common/UserMenu";
import { SidebarFooter } from "./Footer";
import { SidebarHeader } from "./Header";

type SidebarProperties = {
  children?: React.ReactNode;
  collapsible?: boolean;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  noFooter?: boolean;
  noHeader?: boolean;
  noLocaleSwitcher?: boolean;
  trigger?: React.ReactNode;
  userMenu?: UserMenuType;
  userMenuMode?: UserMenuModeType;
};

export const Sidebar = ({
  children,
  collapsible = true,
  displayNavIcons = false,
  navigationMenu,
  noFooter = false,
  noHeader = false,
  noLocaleSwitcher = false,
  trigger,
  userMenu,
  userMenuMode,
}: SidebarProperties) => {
  const renderContent = () => {
    return (
      <>
        {!noHeader && <SidebarHeader />}
        <NavigationMenu
          displayIcons={displayNavIcons}
          navigationMenu={navigationMenu || []}
        />
        {userMenu && (
          <UserMenu
            menu={userMenu}
            trigger={trigger}
            userMenuMode={userMenuMode}
          />
        )}
        {!noFooter && <SidebarFooter noLocaleSwitcher={noLocaleSwitcher} />}
      </>
    );
  };

  return (
    <div className={`dz-sidebar ${collapsible ? "collapsible" : ""}`.trim()}>
      {children || renderContent()}
    </div>
  );
};
