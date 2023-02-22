import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TechnologyRepository } from '../repositories/technology.repository';
import { TechnologyEntity } from '../entities/technology.entity';
import { CreateTechnologyDto } from '../dto/create-technology.dto';

@Injectable()
export class TechnologyService {
  constructor(private readonly technologyRepository: TechnologyRepository) {}

  async findById(id: number): Promise<TechnologyEntity> {
    const foundTechnology = await this.technologyRepository.getById(id);
    if (!foundTechnology) {
      throw new NotFoundException('technologyNotFound');
    }

    return foundTechnology;
  }

  async createTechnology(
    newTechnology: CreateTechnologyDto,
  ): Promise<TechnologyEntity> {
    const existTechnology = await this.technologyRepository.getByName(
      newTechnology.name,
    );

    if (existTechnology) {
      throw new BadRequestException('entityWithArgumentsExists');
    }
    const saveTechnology = await this.technologyRepository.createTechnology(
      newTechnology,
    );

    if (!saveTechnology) {
      throw new BadRequestException('technologyNotSave');
    }

    return saveTechnology;
  }

  async createManyTechnologies(
    newTechnologies: CreateTechnologyDto[],
  ): Promise<TechnologyEntity[]> {
    try {
      const saveTechnologies =
        await this.technologyRepository.createManyTechnologies(newTechnologies);

      return saveTechnologies;
    } catch (error) {
      throw new BadRequestException('entityWithArgumentsExists');
    }
  }
}
