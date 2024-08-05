export type Product = {
  id: string;
  price: number;
  billingPeriod: BillingPeriod;
};

export type Products = {
  colorMonthly: Product;
  colorYearly: Product;
  colorTeams: Product;
};

export enum BillingPeriod {
  Monthly = "monthly",
  Annually = "annually",
}

export type ProductsResponse = Products;
