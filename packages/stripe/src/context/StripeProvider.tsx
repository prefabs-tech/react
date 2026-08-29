import type { ReactNode } from "react";

import { createContext, useMemo, useState } from "react";

import type { CheckoutSessionPayload, StripeConfig } from "../types";

import {
  checkoutSession as doCheckoutSession,
  getStatus as doGetStatus,
} from "../api";

export interface StripeContextType {
  checkoutSession: (
    payload: CheckoutSessionPayload,
    apiBaseUrl: string,
  ) => Promise<unknown>;
  config?: StripeConfig;
  getStatus: (apiBaseUrl: string) => Promise<unknown>;
  setConfig: (newConfig: StripeConfig) => void;
}

export const stripeContext = createContext<StripeContextType | undefined>(
  undefined,
);

interface StripeProviderProperties {
  children: ReactNode;
  config?: StripeConfig;
}

export const StripeProvider = ({
  children,
  config: initialConfig,
}: StripeProviderProperties) => {
  const [config, setConfig] = useState<StripeConfig | undefined>(initialConfig);

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
