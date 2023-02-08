import { Injectable } from '@nestjs/common';
import { CreateCityDto } from '../dto/create-city.dto';
import { CityRepository } from '../city.repository';

@Injectable()
export class CityService {
  constructor(private readonly cityRepository: CityRepository) {}

  async createCity(newCity: CreateCityDto): Promise<void> {
    await this.cityRepository.createCity(newCity);
  }
}
