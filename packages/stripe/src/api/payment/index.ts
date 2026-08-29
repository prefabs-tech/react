import type { CheckoutSessionPayload, StripeConfig } from "../../types";

import { getAxiosClient } from "..";
import { API_PATH_CHECKOUT_SESSION, API_PATH_STATUS } from "../../constants";

export const checkoutSession = async (
  payload: CheckoutSessionPayload,
  apiBaseUrl: string,
  config?: StripeConfig,
) => {
  const path = config?.apiRoutes?.checkoutSession || API_PATH_CHECKOUT_SESSION;

  const client = await getAxiosClient(apiBaseUrl, config);
  const response = await client.post(path, payload);

  if ("error" in response.data) {
    throw new Error(response.data);
  }

  const redirectUrl = response.data.url as string;
  window.location.href = redirectUrl;

  return response.data;
};

export const getStatus = async (apiBaseUrl: string, config?: StripeConfig) => {
  const path = config?.apiRoutes?.status || API_PATH_STATUS;

  const client = await getAxiosClient(apiBaseUrl, config);
  const response = await client.get(path);

  if ("error" in response.data) {
    throw new Error(response.data);
  }

  return response.data;
};
