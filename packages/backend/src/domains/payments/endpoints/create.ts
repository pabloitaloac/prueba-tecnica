import handler from "@backend/utils/endpoints/handler";
import { ApiResponse, GenericHandler } from "@backend/types";
import { products } from "@backend/domains/products/products";
import { CreatePaymentBody } from "../types";
import { BillingPeriod, Product } from "@backend/domains/products/types";

type CreatePaymentResponse = {
  price: number;
};

const getProduct = ({
  quantity,
  selected,
  title,
}: CreatePaymentBody): Product => {

  if (title==="Insider"){
    if (selected === "monthly") {
      return products.insiderMonthly;
    }
    if (quantity > 1) {
      return products.insiderTeams;
    }
    return products.insiderYearly;
  } else if (title==="Color"){
    if (selected === "monthly") {
      return products.colorMonthly;
    }
    if (quantity > 1) {
      return products.colorTeams;
    }
    return products.colorYearly;
  } else if(title==="Insider + Color"){
    if (selected === "monthly") {
      return {
        id: "Insider + Color Monthly",
        price: (products.insiderMonthly.price + products.colorMonthly.price) * 0.9,
        billingPeriod: BillingPeriod.Monthly,
      }
    }
    if (quantity > 1) {
      if(selected === "monthly"){
        return {
          id: "Insider + Color Teams Monthly",
          price: (products.insiderTeams.price + products.colorTeams.price) * 0.9,
          billingPeriod: BillingPeriod.Monthly,
        }
      }
      return {
        id: "Insider + Color Teams Yearly",
        price: (products.insiderTeams.price + products.colorTeams.price) * 0.8,
        billingPeriod: BillingPeriod.Annually,
      }
    }
    return {
      id: "Insider + Color Yearly",
      price: (products.insiderYearly.price + products.colorYearly.price) * 0.7,
      billingPeriod: BillingPeriod.Annually,
    }
  }

  return products.colorYearly;
};




const createPayment = ({
  body,
}: GenericHandler<CreatePaymentBody>): Promise<
  ApiResponse<CreatePaymentResponse>
> => {
  const { 
    quantity,
    selected,
    title
   } = body;

  const product = getProduct({ quantity, selected, title });

  return Promise.resolve({
    statusCode: 201,
    body: {
      price: Number((product.price * quantity).toFixed(2)),
    },
  });
};

export default handler<CreatePaymentBody, null, null>(createPayment);
