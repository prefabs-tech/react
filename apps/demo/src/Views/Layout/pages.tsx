import { useTranslation } from "@prefabs.tech/react-i18n";
import { Outlet } from "react-router-dom";

import { StickyCollapsibleFooterDemo } from "./components/StickyCollapsibleFooterDemo";
import { Demo } from "../../components/Demo";

export const LAYOUT_ROUTES = {
  GET_STARTED: "/layout",
  STICKY_COLLAPSIBLE_FOOTER: "/layout/stickycollapsiblefooter",
};

export const routes = [
  {
    path: LAYOUT_ROUTES.STICKY_COLLAPSIBLE_FOOTER,
    key: "stickyCollapsibleFooter.title",
    element: <StickyCollapsibleFooterDemo />,
  },
];

export const Pages = () => {
  const [t] = useTranslation("layout");

  const subnav = [
    { route: "/layout", label: t("app:getStarted") },
    {
      label: t("headers.components"),
      submenu: [
        ...routes.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
  ];

  return (
    <Demo subnav={subnav} isGrouped>
      <Outlet />
    </Demo>
  );
};
