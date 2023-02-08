import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/common/env';
import { UserModule } from '../users/user.module';
import { CityModule } from '../cities/city.module';
import { StateModule } from '../states/state.module';
import { CountryModule } from '../countries/country.module';
import { AppController } from './app.controller';
import { databaseProviders } from 'src/core/database/database.providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
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
