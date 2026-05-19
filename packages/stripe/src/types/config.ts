import type { AxiosInstance } from "axios";

import type { RouteOverrides } from "./router";

export interface PrefabsTechReactStripeConfig {
  apiRoutes?: {
    checkoutSession?: string;
    status?: string;
  };
  axiosClient?: (baseURL: string) => AxiosInstance;
  routes?: RouteOverrides;
}
