import type { ReactNode } from "react";

import { createContext, useMemo, useState } from "react";

import type {
  CheckoutSessionPayload,
  PrefabsTechReactStripeConfig,
} from "../types";

import {
  checkoutSession as doCheckoutSession,
  getStatus as doGetStatus,
} from "../api/payment";

export interface StripeContextType {
  checkoutSession: (
    payload: CheckoutSessionPayload,
    apiBaseUrl: string,
  ) => Promise<unknown>;
  config?: PrefabsTechReactStripeConfig;
  getStatus: (apiBaseUrl: string) => Promise<unknown>;
  setConfig: (newConfig: PrefabsTechReactStripeConfig) => void;
}

export const stripeContext = createContext<StripeContextType | undefined>(
  undefined,
);

interface StripeProviderProperties {
  children: ReactNode;
  config?: PrefabsTechReactStripeConfig;
}

export const StripeProvider = ({
  children,
  config: initialConfig,
}: StripeProviderProperties) => {
  const [config, setConfig] = useState<
    PrefabsTechReactStripeConfig | undefined
  >(initialConfig);

  const checkoutSession = async (
    payload: CheckoutSessionPayload,
    apiBaseUrl: string,
  ) => {
    return await doCheckoutSession(payload, apiBaseUrl, config);
  };

  const getStatus = async (apiBaseUrl: string) => {
    return await doGetStatus(apiBaseUrl, config);
  };

  const value = useMemo(
    () => ({
      checkoutSession,
      config,
      getStatus,
      setConfig,
    }),
    [config],
  );

  return (
    <stripeContext.Provider value={value}>{children}</stripeContext.Provider>
  );
};

export default StripeProvider;
