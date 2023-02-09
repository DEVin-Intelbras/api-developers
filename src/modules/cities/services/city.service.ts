import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from '../dto/create-city.dto';
import { CityRepository } from '../city.repository';
import { CityEntity } from '../entities/city.entity';

@Injectable()
export class CityService {
  constructor(private readonly cityRepository: CityRepository) {}

  async findById(id: number): Promise<CityEntity> {
    const foundCity = await this.cityRepository.getById(id);
    if (!foundCity) {
      throw new NotFoundException('cityNotFound');
    }

    return foundCity;
  }

  async createCity(newCity: CreateCityDto): Promise<void> {
    await this.cityRepository.createCity(newCity);
  }
}
