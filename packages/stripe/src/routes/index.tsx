import { Route } from "react-router-dom";

import type { RouteOverrides } from "../types";

import CancelledPage from "../components/CancelledPage";
import SuccessPage from "../components/SuccessPage";
import { useConfig } from "../hooks/useConfig";

const DEFAULT_PATHS = {
  CANCELLED: "/stripe/cancelled",
  SUCCESS: "/stripe/success",
};

interface StripeRoutesOptions {
  routes?: RouteOverrides;
}

export const getStripeRoutes = (options?: StripeRoutesOptions) => {
  const config = useConfig();

  const { cancelled, success } = options?.routes || {};

  const { customPaths } = config || {};

  const stripeRoutes = [
    {
      element: cancelled?.element || <CancelledPage />,
      path: customPaths?.cancelled || DEFAULT_PATHS.CANCELLED,
    },
    {
      element: success?.element || <SuccessPage />,
      path: customPaths?.success || DEFAULT_PATHS.SUCCESS,
    },
  ];

  return (
    <>
      {stripeRoutes.map((route) => (
        <Route element={route.element} key={route.path} path={route.path} />
      ))}
    </>
  );
};
