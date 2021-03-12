import { Transport } from '@nestjs/microservices';
export default () => {
  const DEFAULT_HOST = '0.0.0.0';
  return {
    port: process.env.API_GATEWAY_PORT || 8080,
    orderService: {
      options: {
        port: process.env.ORDERS_SERVICE_PORT || 9000,
        host: process.env.ORDERS_SERVICE_HOST || DEFAULT_HOST,
      },
      transport: Transport.TCP,
    },
  };
};
