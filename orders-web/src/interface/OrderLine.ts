export interface IOrderLine {
  sku: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
export interface IProductCart extends IOrderLine {
  addedAt: Date;
}
