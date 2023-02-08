import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { CountryController } from './country.controller';
import { countryProviders } from './country.providers';
import { CountryRepository } from './country.repository';
import { CountryService } from './services/country.service';

@Module({
  controllers: [CountryController],
  providers: [
    CountryService,
    CountryRepository,
    ...databaseProviders,
    ...countryProviders,
  ],
  exports: [CountryService],
})
export class CountryModule {}
