import CancelledPage from "./components/CancelledPage";
import SuccessPage from "./components/SuccessPage";
import { StripeProvider } from "./context/StripeProvider";
import { useBackNavigation } from "./hooks/useBackNavigation";
import { useConfig } from "./hooks/useConfig";
import { usePayment } from "./hooks/usePayment";
import { registerTranslations } from "./i18n";
import { getStripeRoutes } from "./routes";

export {
  CancelledPage,
  getStripeRoutes,
  registerTranslations,
  StripeProvider,
  SuccessPage,
  useBackNavigation,
  useConfig,
  usePayment,
};

export type { StripeConfig } from "./types/config";
export type { CheckoutSessionPayload } from "./types/payment";
export type { RouteOverride, RouteOverrides } from "./types/router";
