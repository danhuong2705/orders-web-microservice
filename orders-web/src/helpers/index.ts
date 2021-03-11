import { ORDER_STATE } from "../contansts";
import { IProductCart } from "../interface/OrderLine";
import { v4 } from "uuid";

export const orderStateMapping = (state: ORDER_STATE) => {
  switch (state) {
    case 0:
      return "CREATED";
    case 1:
      return "CONFIRMED";
    case 2:
      return "DELIVERED";
    case 3:
      return "CANCELLED";
    default:
      return "CREATED";
  }
};
export const cookNewOrder = (
  orderItems: Array<IProductCart>,
  totalPrice: number
) => {
  return {
    orderId: v4(),
    userId: 1,
    state: 0,
    totalPrice: totalPrice,
    orderItems: orderItems.map((product: IProductCart) => ({
      sku: product.sku,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: product.quantity,
    })),
    createdAt: new Date().toISOString(),
  };
};

export const formatCurrency = (price: number) => {
  return Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
