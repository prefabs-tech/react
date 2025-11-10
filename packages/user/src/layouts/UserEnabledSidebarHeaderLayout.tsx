import {
  SidebarHeaderLayout,
  SidebarHeaderLayoutProperties,
  UserMenuType,
} from "@prefabs.tech/react-layout";

import { useUser } from "@/hooks";

import { useUserNavigationMenu } from "..";

interface Properties extends SidebarHeaderLayoutProperties {
  authNavigationMenu?: UserMenuType;
  userNavigationMenu?: UserMenuType;
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
  userMenuMode,
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
      navigationMenu={navigationMenu}
      userMenu={userMenu}
      userMenuLocation={userMenuLocation}
      userMenuMode={user ? userMenuMode : "horizontal"}
      {...otherProperties}
    />
  );
};
