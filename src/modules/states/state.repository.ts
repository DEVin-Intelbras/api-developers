import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CreateStateDto } from './dto/create-state.dto';
import { StateEntity } from './entities/state.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class StateRepository extends Repository<StateEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(StateEntity, dataSource.createEntityManager());
  }

  async getByAll(): Promise<StateEntity[]> {
    return this.find({ relations: ['country'] });
  }

  async getByName(name: string): Promise<StateEntity> {
    return this.findOne({ where: { name } });
  }

  async createState(newState: CreateStateDto): Promise<StateEntity> {
    const state = new StateEntity();
    const dataState = {
      ...state,
      ...newState,
    };

    const saveState = await this.save(dataState);
    return saveState;
  }
}
