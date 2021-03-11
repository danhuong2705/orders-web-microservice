import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IOrderItem } from '../interfaces/orderItem.interface';
import { Document } from 'mongoose';
import { ORDER_STATE } from '../constants/orderState.constants';

export type OrderDocument = Order & Document;
@Schema()
export class Order {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  userId: number;

  @Prop({ default: ORDER_STATE.CREATED })
  state: ORDER_STATE;

  @Prop({ required: true })
  createdAt: string;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  orderItems: IOrderItem[];
}
export const OrderSchema = SchemaFactory.createForClass(Order);
