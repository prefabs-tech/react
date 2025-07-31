import {
  HeaderLayout,
  HeaderLayoutProperties,
} from "@prefabs.tech/react-layout";

import { useUser, useUserNavigationMenu } from "..";

import type { NavMenuItemType } from "@prefabs.tech/react-ui";

interface IProperties
  extends Omit<HeaderLayoutProperties, "userMenuMode" | "menu"> {
  authNavigationMenu?: NavMenuItemType;
  userNavigationMenu?: NavMenuItemType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogout?: () => Promise<any>;
}

export const UserEnabledHeaderLayout = ({
  authNavigationMenu,
  userNavigationMenu,
  onLogout,
  ...otherProperties
}: IProperties) => {
  const { user } = useUser();

  const userMenu = useUserNavigationMenu({
    authNavigationMenu,
    addAuthNavigationMenu: true,
    userNavigationMenu,
    onLogout,
  });

  return (
    <HeaderLayout
      menu={userMenu}
      userMenuMode={user ? "popup" : "horizontal"}
      {...otherProperties}
    />
  );
};
