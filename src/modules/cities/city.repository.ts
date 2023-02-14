import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { CityEntity } from './entities/city.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class CityRepository extends Repository<CityEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(CityEntity, dataSource.createEntityManager());
  }
  async getById(id: number): Promise<CityEntity> {
    return this.findOne({ where: { id } });
  }

  async getByAll(): Promise<CityEntity[]> {
    return this.find();
  }

  async createCity(newCity: CreateCityDto): Promise<void> {
    const city = new CityEntity();
    city.state_id = newCity.state_id;
    city.name = newCity.name;

    await this.save(city);
  }
}
