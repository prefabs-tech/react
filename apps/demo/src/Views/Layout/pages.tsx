import { useTranslation } from "@prefabs.tech/react-i18n";
import { Outlet } from "react-router-dom";

import { Demo } from "../../components/Demo";
import { StickyCollapsibleFooterDemo } from "./components/StickyCollapsibleFooterDemo";

export const LAYOUT_ROUTES = {
  GET_STARTED: "/layout",
  STICKY_COLLAPSIBLE_FOOTER: "/layout/stickycollapsiblefooter",
};

export const routes = [
  {
    element: <StickyCollapsibleFooterDemo />,
    key: "stickyCollapsibleFooter.title",
    path: LAYOUT_ROUTES.STICKY_COLLAPSIBLE_FOOTER,
  },
];

export const Pages = () => {
  const [t] = useTranslation("layout");

  const subnav = [
    { label: t("app:getStarted"), route: "/layout" },
    {
      label: t("headers.components"),
      submenu: [
        ...routes.map(({ key, path }) => {
          return { label: t(key), route: path };
        }),
      ],
    },
  ];

  return (
    <Demo isGrouped subnav={subnav}>
      <Outlet />
    </Demo>
  );
};
