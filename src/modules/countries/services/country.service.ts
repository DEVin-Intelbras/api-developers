import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CountryRepository } from '../country.repository';
import { CreateCountryDto } from '../dto/create-country.dto';
import { UpdateCountryDto } from '../dto/update-country.dto';
import { CountryEntity } from '../entities/country.entity';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async findById(id: number): Promise<CountryEntity> {
    const foundCountry = await this.countryRepository.getById(id);
    if (!foundCountry) {
      throw new NotFoundException('countryNotFound');
    }

    return foundCountry;
  }

  async createCountry(newCountry: CreateCountryDto): Promise<CountryEntity> {
    const existCountry = await this.countryRepository.getByName(
      newCountry.name,
    );

    if (existCountry) {
      throw new BadRequestException('entityWithArgumentsExists');
    }
    const saveCountry = await this.countryRepository.createCountry(newCountry);

    if (!saveCountry) {
      throw new BadRequestException('countryNotSave');
    }

    return saveCountry;
  }

  async updateCountry(
    id: number,
    fieldsCountryUpdate: UpdateCountryDto,
  ): Promise<CountryEntity> {
    const foundCountry = await this.countryRepository.getById(id);

    if (!foundCountry) {
      throw new NotFoundException('countryNotFound');
    }

    const countryUpdate = await this.countryRepository.updateCountry({
      ...foundCountry,
      ...fieldsCountryUpdate,
    });

    if (!countryUpdate) {
      throw new BadRequestException('countryNotUpdate');
    }

    return countryUpdate;
  }

  async deleteCountry(id: number): Promise<string> {
    const foundCountry = await this.countryRepository.getById(id);

    if (!foundCountry) {
      throw new NotFoundException('countryNotFound');
    }

    const countryDelete = await this.countryRepository.deleteCountry(
      foundCountry,
    );

    if (!countryDelete) {
      throw new NotFoundException('CountryNotDelete');
    }

    return 'País deletado com sucesso';
  }
}
