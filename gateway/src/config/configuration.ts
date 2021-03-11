import { Transport } from '@nestjs/microservices';
export default () => {
  const ordersServiceHost =
    process.env.NODE_ENV == 'prod'
      ? process.env.ORDERS_SERVICE_HOST
      : '0.0.0.0';
  const paymentServiceHost =
    process.env.NODE_ENV == 'prod'
      ? process.env.PAYMENT_SERVICE_HOST
      : '0.0.0.0';
  const orderServicePost = parseInt(
    process.env.NODE_ENV == 'prod' ? process.env.ORDERS_SERVICE_PORT : '9000',
  );
  const paymentServicePost = parseInt(
    process.env.NODE_ENV == 'prod' ? process.env.PAYMENT_SERVICE_PORT : '9001',
  );
  return {
    port: process.env.API_GATEWAY_PORT || 8080,
    orderService: {
      options: {
        port: orderServicePost,
        host: ordersServiceHost,
      },
      transport: Transport.TCP,
    },
    paymentService: {
      options: {
        port: paymentServicePost,
        host: paymentServiceHost,
      },
      transport: Transport.TCP,
    },
  };
};
