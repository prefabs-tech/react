import {
  SidebarHeaderLayout,
  SidebarHeaderLayoutProperties,
} from "@prefabs.tech/react-layout";

import { useUser } from "@/hooks";

import { useUserNavigationMenu } from "..";

import type { NavMenuItemType } from "@prefabs.tech/react-ui";

interface Properties extends SidebarHeaderLayoutProperties {
  authNavigationMenu?: NavMenuItemType;
  userNavigationMenu?: NavMenuItemType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogout?: () => Promise<any>;
}

export const UserEnabledSidebarHeaderLayout: React.FC<Properties> = ({
  authNavigationMenu,
  children,
  className,
  collapsible,
  navigationMenu,
  userNavigationMenu,
  onLogout,
  userMenuLocation = "header",
  ...otherProperties
}) => {
  const { user } = useUser();

  const userMenu = useUserNavigationMenu({
    authNavigationMenu,
    addAuthNavigationMenu: false,
    userNavigationMenu,
    onLogout,
  });

  return (
    <SidebarHeaderLayout
      children={children}
      className={className}
      collapsible={collapsible}
      navigationMenu={user ? navigationMenu : authNavigationMenu}
      userMenu={user ? userMenu : undefined}
      userMenuLocation={userMenuLocation}
      {...otherProperties}
    />
  );
};
