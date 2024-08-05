import { BillingPeriod } from "@backend/domains/products/types";

export type CreatePaymentBody = {
  quantity: number;
  billingPeriod: BillingPeriod;
};
