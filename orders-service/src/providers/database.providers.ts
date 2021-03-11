import * as mongoose from 'mongoose';
import configuration from '../config/configuration';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(configuration().mongoDns, { useNewUrlParser: true }),
  },
];
