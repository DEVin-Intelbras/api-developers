import { DataSource } from 'typeorm';
import { CountryEntity } from './entities/country.entity';

export const countryProviders = [
  {
    provide: 'COUNTRY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CountryEntity),
    inject: ['DATA_SOURCE'],
  },
];
