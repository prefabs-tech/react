import {
  HeaderLayout,
  HeaderLayoutProperties,
  UserMenuType,
} from "@prefabs.tech/react-layout";

import { useUser, useUserNavigationMenu } from "..";

interface IProperties extends Omit<
  HeaderLayoutProperties,
  "userMenuMode" | "menu"
> {
  authNavigationMenu?: UserMenuType;
  userNavigationMenu?: UserMenuType;
  onLogout?: () => Promise<unknown>;
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
