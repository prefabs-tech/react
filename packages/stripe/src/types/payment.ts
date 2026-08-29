export interface CheckoutSessionPayload {
  cancelUrl?: string;
  currency?: string;
  mode?: "payment" | "setup" | "subscription";
  productName: string;
  quantity?: number;
  successUrl?: string;
  unitAmount: number;
}
