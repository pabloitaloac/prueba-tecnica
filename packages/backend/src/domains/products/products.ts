import { BillingPeriod, Products } from "./types";

export const products: Products = {
  colorMonthly: {
    id: "colorMonthly",
    price: 10,
    billingPeriod: BillingPeriod.Monthly,
  },
  colorYearly: {
    id: "colorYearly",
    price: 100,
    billingPeriod: BillingPeriod.Annually,
  },
  colorTeams: {
    id: "colorTeams",
    price: 90,
    billingPeriod: BillingPeriod.Annually,
  },
};
