import { useTranslation } from "@prefabs.tech/react-i18n";
import { Outlet } from "react-router-dom";

import { Demo } from "../../components/Demo";

export const I18n_ROUTES = {
  GET_STARTED: "/i18n",
};

export const routes = [];

export const Pages = () => {
  const [t] = useTranslation("i18n");

  const subnav = [
    { label: t("app:getStarted"), route: I18n_ROUTES.GET_STARTED },
    ...routes.map(({ path, key }) => {
      return { route: path, label: t(key) };
    }),
  ];

  return (
    <Demo subnav={subnav} isGrouped>
      <Outlet />
    </Demo>
  );
};
