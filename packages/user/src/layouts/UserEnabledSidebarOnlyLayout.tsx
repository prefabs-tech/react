import { SidebarOnlyLayout } from "@prefabs.tech/react-layout";

import { useUser } from "@/hooks";

import { useUserNavigationMenu } from "..";

import type { SidebarOnlyLayoutProperties } from "@prefabs.tech/react-layout";
import type { NavMenuItemType } from "@prefabs.tech/react-ui";

interface Properties extends Omit<SidebarOnlyLayoutProperties, "userMenu"> {
  authNavigationMenu?: NavMenuItemType;
  userNavigationMenu?: NavMenuItemType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogout?: () => Promise<any>;
}

export const UserEnabledSidebarOnlyLayout: React.FC<Properties> = ({
  authNavigationMenu,
  children,
  className,
  customSidebar,
  collapsible,
  displayNavIcons,
  navigationMenu,
  noSidebarHeader,
  noSidebarFooter,
  noLocaleSwitcher,
  userNavigationMenu,
  userMenuMode,
  onLogout,
}) => {
  const { user } = useUser();

  const userMenu = useUserNavigationMenu({
    authNavigationMenu,
    addAuthNavigationMenu: true,
    userNavigationMenu,
    onLogout,
  });

  return (
    <SidebarOnlyLayout
      children={children}
      className={className}
      collapsible={collapsible}
      displayNavIcons={displayNavIcons}
      navigationMenu={user ? navigationMenu : authNavigationMenu}
      customSidebar={customSidebar}
      noSidebarHeader={noSidebarHeader}
      noSidebarFooter={noSidebarFooter}
      noLocaleSwitcher={noLocaleSwitcher}
      userMenu={user ? userMenu : undefined}
      userMenuMode={userMenuMode}
    />
  );
};
