import { Module } from '@nestjs/common';
import { CityController } from './controllers/city.controller';
import { StateModule } from '../states/state.module';
import { CityService } from './services/city.service';
import { CityRepository } from './city.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';

@Module({
  imports: [StateModule, TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [CityService, CityRepository],
})
export class CityModule {}
