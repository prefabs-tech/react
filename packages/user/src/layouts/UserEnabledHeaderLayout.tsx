import {
  HeaderLayout,
  HeaderLayoutProperties,
  UserMenuType,
} from "@prefabs.tech/react-layout";

import { useUser, useUserNavigationMenu } from "..";

interface IProperties extends Omit<
  HeaderLayoutProperties,
  "menu" | "userMenuMode"
> {
  authNavigationMenu?: UserMenuType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogout?: () => Promise<any>;
  userNavigationMenu?: UserMenuType;
}

export const UserEnabledHeaderLayout = ({
  authNavigationMenu,
  onLogout,
  userNavigationMenu,
  ...otherProperties
}: IProperties) => {
  const { user } = useUser();

  const userMenu = useUserNavigationMenu({
    addAuthNavigationMenu: true,
    authNavigationMenu,
    onLogout,
    userNavigationMenu,
  });

  return (
    <HeaderLayout
      menu={userMenu}
      userMenuMode={user ? "popup" : "horizontal"}
      {...otherProperties}
    />
  );
};
