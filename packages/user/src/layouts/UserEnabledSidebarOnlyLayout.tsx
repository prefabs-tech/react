import { SidebarOnlyLayout } from "@prefabs.tech/react-layout";

import { useUserNavigationMenu } from "..";

import type {
  SidebarOnlyLayoutProperties,
  UserMenuType,
} from "@prefabs.tech/react-layout";

interface Properties extends Omit<SidebarOnlyLayoutProperties, "userMenu"> {
  authNavigationMenu?: UserMenuType;
  userNavigationMenu?: UserMenuType;
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
      navigationMenu={navigationMenu}
      customSidebar={customSidebar}
      noSidebarHeader={noSidebarHeader}
      noSidebarFooter={noSidebarFooter}
      noLocaleSwitcher={noLocaleSwitcher}
      userMenu={userMenu}
      userMenuMode={userMenuMode}
    />
  );
};
