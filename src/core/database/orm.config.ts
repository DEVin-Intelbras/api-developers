import 'dotenv/config';
import { DataSource } from 'typeorm';

const config = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: ['dist/**/*.entity{ .ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  logger: 'file',
  synchronize: false,
  migrationsTableName: 'migrations',
  logging: true,
});

export default config;
