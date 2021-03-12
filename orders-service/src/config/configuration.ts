import { Transport } from '@nestjs/microservices';

export default () => {
  const DEFAULT_HOST = '0.0.0.0';
  return {
    mongoDns: process.env.MONGO_DSN || 'mongodb://localhost/orders',
    redisHost: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.ORDERS_SERVICE_PORT) || 9000,
    host: process.env.ORDERS_SERVICE_HOST || '0.0.0.0',
    paymentService: {
      options: {
        port: process.env.PAYMENT_SERVICE_PORT || 9001,
        host: process.env.PAYMENT_SERVICE_HOST || DEFAULT_HOST,
      },
      transport: Transport.TCP,
    },
  };
};
