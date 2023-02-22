import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ILike } from 'typeorm';
import { CountryRepository } from '../country.repository';
import { CreateCountryDto } from '../dto/create-country.dto';
import { FilterCountryDto } from '../dto/filter-country.dto';
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

    try {
      const countryUpdate = await this.countryRepository.updateCountry({
        ...foundCountry,
        ...fieldsCountryUpdate,
      });

      return countryUpdate;
    } catch (error) {
      throw new BadRequestException('countryNotUpdate');
    }
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

  async getByFilter(query: FilterCountryDto): Promise<CountryEntity[]> {
    const listOfKeys = Object.keys(query);
    const createdAt = [];
    const queryArrayObjects = listOfKeys.map((key) => {
      if (key !== 'createdAt') {
        if (key === 'id') {
          return { [key]: query[key] };
        }
        return { [key]: ILike(`%${query[key]}%`) };
      }
      createdAt.push({ order: { [key]: query[key] } });
    });

    const onlyKeysExist = queryArrayObjects.filter((key) => key);

    const queryForSearch = Object.assign(
      {
        where: onlyKeysExist,
      },
      createdAt.length !== 0 && { ...createdAt[0] },
    );

    const findCountry = await this.countryRepository.getByFilter(
      queryForSearch,
    );

    return findCountry;
  }
}
