import { Type } from 'class-transformer';
import { IsString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { IOrderItem } from '../interfaces/orderItem.interface';
import { OrderItem } from './order-item.dto';
export class CreateOrderDto {
  @IsString()
  orderId: string;

  @IsInt()
  userId: number;

  @IsInt()
  state: number;

  @IsInt()
  totalPrice: number;

  @IsString()
  createdAt: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  orderItems: IOrderItem[];
}
