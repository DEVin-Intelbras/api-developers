import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/common/env';
import { UserModule } from '../users/user.module';
import { CityModule } from '../cities/city.module';
import { StateModule } from '../states/state.module';
import { CountryModule } from '../countries/country.module';
import { AppController } from './app.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'public'),
    }),
    UserModule,
    CityModule,
    StateModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [...databaseProviders],
})
export class AppModule {}
