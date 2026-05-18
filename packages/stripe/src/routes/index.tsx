import type { RouteObject } from "react-router-dom";

import type { PrefabsTechReactStripeConfig } from "../types";

import CancelledPage from "../components/CancelledPage";
import SuccessPage from "../components/SuccessPage";

const defaultRoutes = {
  cancelled: {
    element: <CancelledPage />,
    path: "/stripe/cancelled",
  },
  success: {
    element: <SuccessPage />,
    path: "/stripe/success",
  },
};

export const getStripeRoutes = (
  config?: PrefabsTechReactStripeConfig,
): RouteObject[] => {
  const routes: RouteObject[] = [];

  const cancelledRoute: RouteObject = {
    element: config?.routes?.cancelled?.component ? (
      <config.routes.cancelled.component />
    ) : (
      defaultRoutes.cancelled.element
    ),
    path: config?.routes?.cancelled?.path || defaultRoutes.cancelled.path,
  };

  const successRoute: RouteObject = {
    element: config?.routes?.success?.component ? (
      <config.routes.success.component />
    ) : (
      defaultRoutes.success.element
    ),
    path: config?.routes?.success?.path || defaultRoutes.success.path,
  };

  routes.push(cancelledRoute, successRoute);

  return routes;
};
