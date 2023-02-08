import { Injectable } from '@nestjs/common';
import { CreateStateDto } from '../dto/create-state.dto';
import { StateEntity } from '../entities/state.entity';
import { StateRepository } from '../state.repository';

@Injectable()
export class StateService {
  constructor(private readonly stateRepository: StateRepository) {}

  async getByAll(): Promise<StateEntity[]> {
    return await this.stateRepository.getByAll();
  }

  async createState(newState: CreateStateDto): Promise<void> {
    await this.stateRepository.createState(newState);
  }
}
