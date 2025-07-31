import { useTranslation } from "@prefabs.tech/react-i18n";
import { HeaderLayout } from "@prefabs.tech/react-layout";
import { Outlet } from "react-router-dom";

import { MENU_ROUTES } from "../constants";

export const BasicLayout = (): JSX.Element => {
  const [t] = useTranslation("app");

  const menu = MENU_ROUTES.map((menuRoute) => ({
    ...menuRoute,
    label: t(menuRoute.key),
  }));

  return (
    <HeaderLayout
      children={<Outlet />}
      headerAddon={
        <div className="header-addon">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/prefabs-tech/react/blob/main/CHANGELOG.md"
          >
            <span>{t("header.menu.changelog")}</span>
          </a>
        </div>
      }
      navigationMenu={{
        menu: menu,
      }}
    />
  );
};
