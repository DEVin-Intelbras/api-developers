import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountryEntity } from './entities/country.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class CountryRepository extends Repository<CountryEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(CountryEntity, dataSource.createEntityManager());
  }
  async getById(id: number): Promise<CountryEntity> {
    return this.findOne({ where: { id } });
  }

  async getByName(name: string): Promise<CountryEntity> {
    return this.findOne({ where: { name } });
  }

  async createCountry(newCountry: CreateCountryDto): Promise<CountryEntity> {
    const country = new CountryEntity();
    const dataCountry = {
      ...country,
      ...newCountry,
    };

    const countrySave = await this.save(dataCountry);
    return countrySave;
  }

  async updateCountry(country: CountryEntity): Promise<CountryEntity> {
    const countryUpdate = await this.save(country);
    return countryUpdate;
  }

  async deleteCountry(country: CountryEntity): Promise<boolean> {
    const countryDeleted = await this.delete(country);

    if (countryDeleted) return true;
    return false;
  }

  async getByFilter(query): Promise<CountryEntity[]> {
    return this.find(query);
  }
}
