import { v4 } from 'uuid';

export const ProductCart = [
  {
    sku: '2',
    price: 200000,
    imageUrl:
      'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/55d6296fe40140468240ac9300a5bb62_9366/Crew_Sweatshirt_Multicolor_HB4763_21_model.jpg',
    name: 'CREW SWEATSHIRT',
    quantity: 1,
    addedAt: '2021-03-05T03:43:26.161Z',
  },
];

export const createdOrder = {
  orderId: v4(),
  userId: 1,
  state: 0,
  totalPrice: ProductCart.reduce(
    (acc: number, currProduct: any) =>
      acc + currProduct.quantity * currProduct.price,
    0,
  ),
  orderItems: ProductCart.map((product: any) => ({
    sku: product.sku,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    quantity: product.quantity,
  })),
  createdAt: new Date().toISOString(),
};
