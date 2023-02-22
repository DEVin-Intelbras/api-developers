import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  CityEntity,
  CountryEntity,
  StateEntity,
  UserEntity,
} from '../entities';
import { RecruiterEntity } from 'src/modules/recruiters/entities/recruiter.entity';
import { TechnologyEntity } from 'src/modules/developers/entities/technology.entity';
import { DeveloperEntity } from 'src/modules/developers/entities/developer.entity';
import { data1676936968660 } from './migrations/1676936968660-data';
import { data1676950125739 } from './migrations/1676950125739-data';
import { data1677095803655 } from './migrations/1677095803655-data';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: [
    CountryEntity,
    StateEntity,
    CityEntity,
    UserEntity,
    RecruiterEntity,
    TechnologyEntity,
    DeveloperEntity,
  ],
  migrations: [data1676936968660, data1676950125739, data1677095803655],
  synchronize: false,
  migrationsTableName: 'migrations_history',
  logging: true,
  logNotifications: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
