import { useTranslation } from "@prefabs.tech/react-i18n";
import { useNavigate } from "react-router-dom";

import { DEFAULT_PATHS } from "@/constants";
import { logout } from "@/supertokens";

import { useConfig } from "./useConfig";
import { useUser } from "./useUser";

import type {
  NavGroupType,
  NavItemType,
  NavMenuItemType,
} from "@prefabs.tech/react-ui";

interface Properties {
  authNavigationMenu?: NavMenuItemType;
  addAuthNavigationMenu: boolean;
  userNavigationMenu?: NavMenuItemType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogout?: () => Promise<any>;
}

export const useUserNavigationMenu = ({
  authNavigationMenu,
  addAuthNavigationMenu,
  userNavigationMenu,
  onLogout,
}: Properties) => {
  const { t } = useTranslation("user");

  const { user, setUser } = useUser();

  const config = useConfig();

  const changePasswordPath =
    config.customPaths?.changePassword || DEFAULT_PATHS.CHANGE_PASSWORD;

  const isSocialLogin = !!user?.thirdParty;

  const logoutRedirectRoute =
    config?.logoutRedirectRoute || DEFAULT_PATHS.LOGIN;

  const navigate = useNavigate();

  if (!user && addAuthNavigationMenu) {
    return authNavigationMenu;
  }

  const signout = async () => {
    if (await logout()) {
      await setUser(null);

      onLogout && (await onLogout());

      navigate(logoutRedirectRoute);
    }
  };

  const signoutRoute = {
    icon: "pi pi-power-off",
    label: t("userMenu.logout"),
    onClick: signout,
  };

  if (!userNavigationMenu) {
    return {
      menu: [signoutRoute],
      className: "dz-user-menu",
    };
  }

  const _userNavigationMenu = userNavigationMenu.menu.filter(
    (item: NavItemType | NavGroupType) =>
      !(isSocialLogin && "route" in item && item.route === changePasswordPath),
  );

  return {
    ...userNavigationMenu,
    menu: [..._userNavigationMenu, signoutRoute],
    className: `dz-user-menu ${userNavigationMenu.className || ""}`.trim(),
  };
};
