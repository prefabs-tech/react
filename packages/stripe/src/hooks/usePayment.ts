import { useContext } from "react";

import { stripeContext } from "../context/StripeProvider";

export const usePayment = () => {
  const context = useContext(stripeContext);

  if (!context) {
    throw new Error("usePayment must be used within a StripeProvider");
  }

  return context;
};
