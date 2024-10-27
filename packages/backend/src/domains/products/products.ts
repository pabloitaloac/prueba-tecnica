import { BillingPeriod, Products } from "./types";

export const products: Products = {

  colorMonthly: {
    id: "colorMonthly",
    price: 14.99,
    billingPeriod: BillingPeriod.Monthly,
  },
  colorYearly: {
    id: "colorYearly",
    price: 89.99,
    billingPeriod: BillingPeriod.Annually,
  },
  colorTeams: {
    id: "colorTeams",
    price: 89.99,
    billingPeriod: BillingPeriod.Annually,
  },

  insiderMonthly: {
    id: "insiderMonthly",
    price: 39.99,
    billingPeriod: BillingPeriod.Monthly,
  },
  insiderYearly: {
    id: "insiderYearly",
    price: 299,
    billingPeriod: BillingPeriod.Annually,
  },
  insiderTeams: {
    id: "insiderTeams",
    price: 299,
    billingPeriod: BillingPeriod.Annually,
  },

};
