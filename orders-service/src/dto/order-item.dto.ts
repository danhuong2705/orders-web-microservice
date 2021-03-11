import { IsString, IsInt } from 'class-validator';

export class IOrderItem {
  @IsString()
  sku: number;

  @IsString()
  name: string;

  @IsInt()
  price: number;
  
  @IsString()
  imageUrl: string;

  @IsInt()
  quantity: number;
}
