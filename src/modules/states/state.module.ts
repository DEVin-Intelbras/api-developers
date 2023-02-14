import { Module } from '@nestjs/common';
import { StateController } from './controllers/state.controller';
import { StateService } from './services/state.service';
import { StateRepository } from './state.repository';
import { CountryModule } from '../countries/country.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from '../countries/entities/country.entity';

@Module({
  imports: [CountryModule, TypeOrmModule.forFeature([CountryEntity])],
  controllers: [StateController],
  providers: [StateRepository, StateService],
  exports: [StateService],
})
export class StateModule {}
