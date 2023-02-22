import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { DeveloperEntity } from '../entities/developer.entity';

@Injectable()
export class DeveloperRepository extends Repository<DeveloperEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(DeveloperEntity, dataSource.createEntityManager());
  }
  async getById(id: number): Promise<DeveloperEntity> {
    return this.findOne({ where: { id }, relations: ['user', 'technologies'] });
  }

  async getByUser(user_id: number): Promise<DeveloperEntity> {
    return this.findOne({
      where: { user_id },
      relations: ['user', 'technologies'],
    });
  }

  async getAll(): Promise<DeveloperEntity[]> {
    return this.find({ relations: ['user', 'technologies'] });
  }

  async createDeveloper(
    newDeveloper: DeveloperEntity,
  ): Promise<DeveloperEntity> {
    const developerSave = await this.save(newDeveloper);
    return developerSave;
  }

  async updateDeveloper(developer: DeveloperEntity): Promise<DeveloperEntity> {
    const updatedDeveloper = await this.save(developer);
    return updatedDeveloper;
  }
}
