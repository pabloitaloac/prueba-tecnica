# Technical Interview

## Instructions

This is a simplified real case scenario. You are a software engineer at a company that up until now has been selling one product. Now they wanna add another product and promote it on their paywall. Your goal is to modify the current codebase to support this new product both on the frontend and the backend.

The code you will find allows the user to buy once license of the `color` product monthly or yearly, and also to buy licenses ranging from 2 to 100 yearly, for teams.

## Requirements

Now there will be two products: `color` the old product, and `insider`, a new one. 

1. The paywall should show the `insider` product allowing the user to select and purchase it. The user should be able to:
    1. Buy the `color` product with a quantity of 1, monthly or yearly
    2. Buy the `color` product with a quantity of 2 to 100, only yearly

2. The paywall should show the `color` product allowing the user to select and purchase it. The user should be able to:
    1. Buy the `insider` product with a quantity of 1, monthly or yearly
    2. Buy the `insider` product with a quantity of 2 to 100, only yearly

3. The paywall should show a third option allowing the user to buy both products together. The user should be able to:
    1. Buy both products together with a quantity of 1, monthly or yearly, with a discount of 10% on the total price
    2. Buy both products together with a quantity of 2 to 100, only yearly, with a discount of 20% on the total price

The product mapping is as following:

- `color` with quantity 1 and monthly is `monthly`
- `color` with quantity 1 and yearly is `yearly`
- `color` with quantity 2 to 100 and yearly is `teams`
- `insider` with quantity 1 and monthly is `insider-monthly`
- `insider` with quantity 1 and yearly is `insider-yearly`
- `insider` with quantity 2 to 100 and yearly is `insider-teams`
