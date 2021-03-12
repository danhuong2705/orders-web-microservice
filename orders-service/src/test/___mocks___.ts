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
  totalPrice: 200000,
  orderItems: [
    {
      sku: '2',
      name: 'CREW SWEATSHIRT',
      price: 200000,
      imageUrl:
        'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/55d6296fe40140468240ac9300a5bb62_9366/Crew_Sweatshirt_Multicolor_HB4763_21_model.jpg',
      quantity: 1,
    },
  ],
  createdAt: '2021-03-11T10:12:18.141Z',
};
