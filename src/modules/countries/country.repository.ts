import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountryEntity } from './entities/country.entity';

@Injectable()
export class CountryRepository extends Repository<CountryEntity> {
  constructor(@Inject('DATA_SOURCE') dataSource: DataSource) {
    super(CountryEntity, dataSource.createEntityManager());
  }
  async getById(id: number): Promise<CountryEntity> {
    return this.findOne({ where: { id } });
  }

  async createCountry(newCountry: CreateCountryDto): Promise<void> {
    const country = new CountryEntity();
    const dataCountry = {
      ...country,
      ...newCountry,
    };

    await this.save(dataCountry);
  }
}
