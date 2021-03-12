import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import configuration from './config/configuration';
import { AuthenticationMiddleware } from './middleware/authen.middleware';
import { OrderController } from './order.controller';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: 'ORDERS_SERVICE',
      useFactory: () => {
        const orderServiceOptions = configuration().orderService as any;
        return ClientProxyFactory.create(orderServiceOptions);
      },
      inject: [],
    },
    
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('/');
  }
}
