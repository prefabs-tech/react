import type { AxiosInstance } from "axios";

import type { PrefabsTechReactStripeConfig } from "../types";

export const getAxiosClient = async (
  apiBaseUrl: string,
  config?: PrefabsTechReactStripeConfig,
): Promise<AxiosInstance> => {
  if (config?.axiosClient) {
    return config.axiosClient(apiBaseUrl);
  }

  try {
    const { axiosClient } = await import("@prefabs.tech/react-user");

    return axiosClient(apiBaseUrl);
  } catch {
    throw new Error("Stripe package requires an axios instance.");
  }
};

export { checkoutSession, getStatus } from "./payment";
