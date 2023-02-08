import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { cityProviders } from './city.providers';
import { StateModule } from '../states/state.module';
import { CityService } from './services/city.service';
import { CityRepository } from './city.repository';

@Module({
  imports: [StateModule],
  controllers: [CityController],
  providers: [
    ...databaseProviders,
    ...cityProviders,
    CityService,
    CityRepository,
  ],
})
export class CityModule {}
