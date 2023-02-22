import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStateDto } from '../dto/create-state.dto';
import { StateEntity } from '../entities/state.entity';
import { StateRepository } from 'src/modules/states/state.repository';
import { CountryService } from 'src/modules/countries/services/country.service';

@Injectable()
export class StateService {
  constructor(
    private readonly stateRepository: StateRepository,
    private readonly countryService: CountryService,
  ) {}

  async getByAll(): Promise<StateEntity[]> {
    return await this.stateRepository.getByAll();
  }

  async createState(newState: CreateStateDto): Promise<void> {
    await this.stateRepository.createState(newState);
  }

  async createNewState(newState: CreateStateDto): Promise<StateEntity> {
    try {
      await this.countryService.findById(newState.country_id);
    } catch (error) {
      throw new BadRequestException('countryNotFound');
    }
    const existState = await this.stateRepository.getByName(newState.name);

    if (existState) {
      throw new BadRequestException('entityWithArgumentsExists');
    }
    const saveState = await this.stateRepository.createState(newState);

    if (!saveState) {
      throw new BadRequestException('countryNotSave');
    }

    return saveState;
  }
}
