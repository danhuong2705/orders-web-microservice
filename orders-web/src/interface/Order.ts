import { IOrderLine } from "./OrderLine";

export interface IOrder {
  orderId: string;
  userId: number;
  state: number;
  totalPrice: number;
  createdAt: string;
  orderItems: IOrderLine[];
}
