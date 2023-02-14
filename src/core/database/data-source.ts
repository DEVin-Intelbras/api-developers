import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  CityEntity,
  CountryEntity,
  StateEntity,
  UserEntity,
} from '../entities';
import { data1676260604072 } from 'src/core/database/migrations/1676260604072-data';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: [CountryEntity, StateEntity, CityEntity, UserEntity],
  migrations: [data1676260604072],
  synchronize: false,
  migrationsTableName: 'migrations_history',
  logging: true,
  logNotifications: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
