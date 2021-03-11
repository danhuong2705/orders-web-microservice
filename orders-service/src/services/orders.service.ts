import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderDocument, Order } from '../schemas/order.schema';
import { ORDER_STATE } from '../constants/orderState.constants';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async getOrderList(): Promise<Order[]> {
    return await this.orderModel.find().exec();
  }

  async createOrder(createOrder: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrder);
    return await createdOrder.save();
  }

  async getOrderDetail(orderId: string): Promise<Order> {
    const order = await this.orderModel.findOne({ orderId });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
  async updateOrderState(orderId: string, state: ORDER_STATE): Promise<Order> {
    const order = await this.orderModel.findOne({ orderId });
    if (
      order.state === ORDER_STATE.CANCELLED ||
      order.state === ORDER_STATE.DELIVERED
    ) {
      throw new BadRequestException('Can not update order');
    }
    return this.orderModel.findOneAndUpdate(
      { orderId },
      { $set: { state: state } },
      { new: true, useFindAndModify: false },
    );
  }
}
