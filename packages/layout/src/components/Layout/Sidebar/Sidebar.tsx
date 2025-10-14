import { NavigationMenu } from "@prefabs.tech/react-ui";

import { UserMenuModeType, UserMenuType } from "@/types";

import { SidebarFooter } from "./Footer";
import { SidebarHeader } from "./Header";
import { UserMenu } from "../common/UserMenu";

import type { NavMenuType } from "@prefabs.tech/react-ui";

type SidebarProperties = {
  children?: React.ReactNode;
  collapsible?: boolean;
  displayNavIcons?: boolean;
  navigationMenu?: NavMenuType;
  noFooter?: boolean;
  noHeader?: boolean;
  noLocaleSwitcher?: boolean;
  userMenu?: UserMenuType;
  userMenuMode?: UserMenuModeType;
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
