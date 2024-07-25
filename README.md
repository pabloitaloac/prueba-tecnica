# Technical Interview

## Instructions

This is a simplified real case scenario. You are a software engineer at a company that up until now has been selling one product. Now they wanna add another product and promote it on their paywall. Your goal is to modify the current codebase to support this new product both on the frontend and the backend.

## Requirements

Now there will be two products: `color`, the old product and `trends`, a new one. The paywall should show the two products and the user should be able to select one of them.
The user should be able to:

1. Buy the product `color` with a quantity of 1, monthly or yearly
2. Buy the product `color` with a quantity of 2 to 100, only yearly
3. Buy the product `trends` with a quantity of 1, monthly or yearly
4. Buy the product `trends` with a quantity of 2 to 100, only yearly
5. Buy both products together with a quantity of 1, monthly or yearly, with a discount of 10% on the total price
6. Buy both products together with a quantity of 2 to 100, only yearly, with a discount of 20% on the total price

The product mapping is as following:

- `color` with quantity 1 and monthly is `monthly`
- `color` with quantity 1 and yearly is `yearly`
- `color` with quantity 2 to 100 and yearly is `teams`
- `trends` with quantity 1 and monthly is `trends-monthly`
- `trends` with quantity 1 and yearly is `trends-yearly`
- `trends` with quantity 2 to 100 and yearly is `trends-teams`
