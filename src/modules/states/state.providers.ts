import { DataSource } from 'typeorm';
import { StateEntity } from './entities/state.entity';

export const stateProviders = [
  {
    provide: 'STATE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StateEntity),
    inject: ['DATA_SOURCE'],
  },
];
