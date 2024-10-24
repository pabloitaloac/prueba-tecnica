# Technical Interview

## Instructions

This is a simplified real case scenario. You are a software engineer at a company that up until now has been selling one product. Now they wanna add another product and promote it on their paywall. Your goal is to modify the current codebase to support this new product both on the frontend and the backend.

The code you will find allows the user to buy one license of the `color` product, monthly or yearly, and also to buy licenses ranging from 2 to 100 yearly, for teams.

## Requirements

Now there will be two products: `color` the old product, and `insider`, a new one. 

1. The paywall should show the `insider` product allowing the user to select and purchase it. The user should be able to:
    1. Buy the `insider` product with a quantity of 1, monthly (39.99€) or yearly (299€)
    2. Buy the `insider` product with a quantity of 2 to 100, only yearly (299€/unit)

2. The paywall should show the `color` product allowing the user to select and purchase it. The user should be able to:
    1. Buy the `color` product with a quantity of 1, monthly (14,99€) or yearly (89,99€)
    2. Buy the `color` product with a quantity of 2 to 100, only yearly (89,99€/unit)

3. The paywall should show a third option allowing the user to buy both products together. The user should be able to:
    1. Buy both products together with a quantity of 1, monthly or yearly, with a discount of 10% on the total price
    2. Buy both products together with a quantity of 2 to 100, only yearly, with a discount of 20% on the total price

### Goal

You can see a working example of the final result here: https://connect.pantone.com/#/paywall

The UI is not a priority in this test, it does not need to match the one you'll find in production. In this technical interview, you will only need to implement a simplified version of it. The user just needs to be able to send the backend what products they want to buy and the quantity of each. The backend should return the total price of the purchase.

The product mapping is as following:

- `color` with quantity 1 and monthly is `colorMonthly`
- `color` with quantity 1 and yearly is `colorYearly`
- `color` with quantity 2 to 100 and yearly is `colorTeams`
- `insider` with quantity 1 and monthly is `insiderMonthly`
- `insider` with quantity 1 and yearly is `insiderYearly`
- `insider` with quantity 2 to 100 and yearly is `insiderTeams`
