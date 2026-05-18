import type {
  CheckoutSessionPayload,
  PrefabsTechReactStripeConfig,
} from "../../types";

import { API_PATH_CHECKOUT_SESSION, API_PATH_STATUS } from "../../constants";
import client from "../axios";

export const checkoutSession = async (
  payload: CheckoutSessionPayload,
  apiBaseUrl: string,
  config?: PrefabsTechReactStripeConfig,
) => {
  const path = config?.apiRoutes?.checkoutSession || API_PATH_CHECKOUT_SESSION;

  const response = await client(apiBaseUrl).post(path, payload);

  if ("error" in response.data) {
    throw new Error(response.data);
  }

  const redirectUrl = response.data.url as string;
  window.location.href = redirectUrl;

  return response.data;
};

export const getStatus = async (
  apiBaseUrl: string,
  config?: PrefabsTechReactStripeConfig,
) => {
  const path = config?.apiRoutes?.status || API_PATH_STATUS;

  const response = await client(apiBaseUrl).get(path);

  if ("error" in response.data) {
    throw new Error(response.data);
  }

  return response.data;
};
