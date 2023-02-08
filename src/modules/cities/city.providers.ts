import { DataSource } from 'typeorm';
import { CityEntity } from './entities/city.entity';

export const cityProviders = [
  {
    provide: 'CITY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CityEntity),
    inject: ['DATA_SOURCE'],
  },
];
