import { Module } from '@nestjs/common';
import { StateController } from './state.controller';
import { StateService } from './services/state.service';
import { StateRepository } from './state.repository';
import { CountryModule } from '../countries/country.module';
import { databaseProviders } from 'src/core/database/database.providers';
import { stateProviders } from './state.providers';

@Module({
  imports: [CountryModule],
  controllers: [StateController],
  providers: [
    StateRepository,
    StateService,
    ...databaseProviders,
    ...stateProviders,
  ],
  exports: [StateService],
})
export class StateModule {}
