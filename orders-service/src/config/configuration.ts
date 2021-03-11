export default () => {
  return {
    mongoDns:
      process.env.NODE_ENV == 'prod'
        ? process.env.MONGO_DSN
        : 'mongodb://localhost/orders',
    redisHost:
      process.env.NODE_ENV == 'prod' ? process.env.REDIS_HOST : 'localhost',
    port: parseInt(
      process.env.NODE_ENV == 'prod' ? process.env.ORDERS_SERVICE_PORT : '9000',
    ),
    host:
      process.env.NODE_ENV == 'prod'
        ? process.env.ORDERS_SERVICE_HOST
        : '0.0.0.0',
  };
};
