import type { AxiosInstance } from "axios";

import { create } from "axios";

import type { StripeConfig } from "../types";

export const getAxiosClient = async (
  apiBaseUrl: string,
  config?: StripeConfig,
): Promise<AxiosInstance> => {
  if (config?.axiosClient) {
    return config.axiosClient(apiBaseUrl);
  }

  try {
    const { axiosClient } = await import("@prefabs.tech/react-user");

    return axiosClient(apiBaseUrl);
  } catch {
    return create({
      baseURL: apiBaseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }
};

export { checkoutSession, getStatus } from "./payment";
