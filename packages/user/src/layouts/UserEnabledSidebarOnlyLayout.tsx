import type {
  SidebarOnlyLayoutProperties,
  UserMenuType,
} from "@prefabs.tech/react-layout";

import { SidebarOnlyLayout } from "@prefabs.tech/react-layout";

import { useUserNavigationMenu } from "..";

interface Properties extends Omit<SidebarOnlyLayoutProperties, "userMenu"> {
  authNavigationMenu?: UserMenuType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogout?: () => Promise<any>;
  userNavigationMenu?: UserMenuType;
}

export const UserEnabledSidebarOnlyLayout: React.FC<Properties> = ({
  authNavigationMenu,
  children,
  className,
  collapsible,
  customSidebar,
  displayNavIcons,
  navigationMenu,
  noLocaleSwitcher,
  noSidebarFooter,
  noSidebarHeader,
  onLogout,
  userMenuMode,
  userNavigationMenu,
}) => {
  const userMenu = useUserNavigationMenu({
    addAuthNavigationMenu: true,
    authNavigationMenu,
    onLogout,
    userNavigationMenu,
  });

  return (
    <SidebarOnlyLayout
      children={children}
      className={className}
      collapsible={collapsible}
      customSidebar={customSidebar}
      displayNavIcons={displayNavIcons}
      navigationMenu={navigationMenu}
      noLocaleSwitcher={noLocaleSwitcher}
      noSidebarFooter={noSidebarFooter}
      noSidebarHeader={noSidebarHeader}
      userMenu={userMenu}
      userMenuMode={userMenuMode}
    />
  );
};
