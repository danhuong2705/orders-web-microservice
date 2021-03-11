import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { OrdersModule } from './modules/orders.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: configuration().mongoDns,
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true,
        };
      },
    }),
    BullModule.forRoot({
      redis: {
        host: configuration().redisHost,
        port: 6379,
      },
    }),
    OrdersModule,
  ],
})
export class AppModule {}
