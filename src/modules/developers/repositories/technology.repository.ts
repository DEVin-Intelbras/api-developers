import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { TechnologyEntity } from '../entities/technology.entity';
import { CreateTechnologyDto } from '../dto/create-technology.dto';

@Injectable()
export class TechnologyRepository extends Repository<TechnologyEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(TechnologyEntity, dataSource.createEntityManager());
  }
  async getById(id: number): Promise<TechnologyEntity> {
    return this.findOne({ where: { id } });
  }

  async getAll(): Promise<TechnologyEntity[]> {
    return this.find();
  }

  async getByName(name: string): Promise<TechnologyEntity> {
    return this.findOne({ where: { name } });
  }

  async createTechnology(
    newTechnology: CreateTechnologyDto,
  ): Promise<TechnologyEntity> {
    const technology = new TechnologyEntity();
    const dataTechnology = {
      ...technology,
      ...newTechnology,
    };

    const technologySave = await this.save(dataTechnology);
    return technologySave;
  }

  async createManyTechnologies(
    newTechnologies: CreateTechnologyDto[],
  ): Promise<TechnologyEntity[]> {
    const technology = new TechnologyEntity();
    const technologiesEntities: TechnologyEntity[] = newTechnologies.map(
      ({ name }) => {
        return {
          ...technology,
          name,
        };
      },
    );

    const saveTechnologies = await this.save(technologiesEntities);
    return saveTechnologies;
  }
}
