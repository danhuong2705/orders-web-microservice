import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderDocument, Order } from './order.schema';
import { ORDER_STATE } from '../constants/orders.constants';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  getOrderList(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async createOrder(createOrder: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrder);
    return await createdOrder.save();
  }

  async getOrderDetail(orderId: string): Promise<Order> {
    return await this.orderModel.findOne({ orderId });
  }
  async updateOrderState(orderId: string, state: ORDER_STATE): Promise<Order> {
    return this.orderModel.findOneAndUpdate(
      { orderId },
      { $set: { state: state } },
      { new: true, useFindAndModify: false },
    );
  }
}
