export type Product = {
  id: string;
  price: number;
  billingPeriod: BillingPeriod;
};

export type Products = {
  colorMonthly: Product;
  colorYearly: Product;
  colorTeams: Product;
  insiderMonthly: Product;
  insiderYearly: Product;
  insiderTeams: Product;
};

export enum BillingPeriod {
  Monthly = "monthly",
  Annually = "annually",
}

export type ProductsResponse = Products;
