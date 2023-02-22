import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/common/env';
import { UserModule } from '../users/user.module';
import { CityModule } from '../cities/city.module';
import { StateModule } from '../states/state.module';
import { CountryModule } from '../countries/country.module';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/core/database/data-source';
import { RecruiterModule } from '../recruiters/recruiter.module';
import { DeveloperModule } from '../developers/developer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'public'),
    }),
    TypeOrmModule.forRoot({ autoLoadEntities: true, ...dataSourceOptions }),
    UserModule,
    CityModule,
    StateModule,
    CountryModule,
    RecruiterModule,
    DeveloperModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
