import { IOrderItem } from './orderItem.interface';
import { IResponse } from './response.interface';

export interface IOrder {
  orderId: string;
  userId: number;
  state: number;
  totalPrice: number;
  createdAt: string;
  orderItems: IOrderItem[];
}
export interface IOrderResponse extends IResponse {
  data: IOrder;
}

export interface IOrderListResponse extends IResponse {
  data: IOrder[];
}
