export default () => {
  return {
    port: parseInt(process.env.PAYMENT_SERVICE_PORT) || 9001,
    host: process.env.PAYMENT_SERVICE_HOST || '0.0.0.0',
  };
};
