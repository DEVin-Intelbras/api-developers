import AppDataSource from './orm.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = AppDataSource;
      return dataSource.initialize();
    },
  },
];
