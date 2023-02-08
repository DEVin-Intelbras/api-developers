import { Injectable, NotFoundException } from '@nestjs/common';
import { CountryRepository } from '../country.repository';
import { CreateCountryDto } from '../dto/create-country.dto';
import { CountryEntity } from '../entities/country.entity';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async findById(id: number): Promise<CountryEntity> {
    const foundCountry = await this.countryRepository.getById(id);
    if (!foundCountry) {
      throw new NotFoundException('Country is not found');
    }

    return foundCountry;
  }

  async createCountry(newCountry: CreateCountryDto): Promise<void> {
    await this.countryRepository.createCountry(newCountry);
  }
}
