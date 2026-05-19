import { useContext } from "react";

import { stripeContext } from "../context/StripeProvider";

export const useConfig = () => {
  const context = useContext(stripeContext);

  if (!context) {
    throw new Error("useConfig must be used within a StripeProvider");
  }

  return context.config;
};
