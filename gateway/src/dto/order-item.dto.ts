import { IsString, IsInt } from 'class-validator';

export class OrderItem {
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
