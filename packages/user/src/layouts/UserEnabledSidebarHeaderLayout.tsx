import {
  SidebarHeaderLayout,
  SidebarHeaderLayoutProperties,
  UserMenuType,
} from "@prefabs.tech/react-layout";

import { useUser } from "@/hooks";

import { useUserNavigationMenu } from "..";

interface Properties extends SidebarHeaderLayoutProperties {
  authNavigationMenu?: UserMenuType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogout?: () => Promise<any>;
  userNavigationMenu?: UserMenuType;
}

export const UserEnabledSidebarHeaderLayout: React.FC<Properties> = ({
  authNavigationMenu,
  children,
  className,
  collapsible,
  navigationMenu,
  onLogout,
  userMenuLocation = "header",
  userMenuMode,
  userNavigationMenu,
  ...otherProperties
}) => {
  const { user } = useUser();

  const userMenu = useUserNavigationMenu({
    addAuthNavigationMenu: false,
    authNavigationMenu,
    onLogout,
    userNavigationMenu,
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
