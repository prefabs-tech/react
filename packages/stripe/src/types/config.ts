import type { AxiosInstance } from "axios";

import type { RouteOverrides } from "./router";

export interface StripeConfig {
  apiRoutes?: {
    checkoutSession?: string;
    status?: string;
  };
  axiosClient?: (baseURL: string) => AxiosInstance;
  customPaths?: {
    cancelled?: string;
    success?: string;
  };
  routes?: RouteOverrides;
}
