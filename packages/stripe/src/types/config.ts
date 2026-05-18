import type { RouteOverrides } from "./router";

export interface PrefabsTechReactStripeConfig {
  apiRoutes?: {
    checkoutSession?: string;
    status?: string;
  };
  routes?: RouteOverrides;
}
