import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeveloperRepository } from '../repositories/developer.repository';
import { DeveloperEntity } from '../entities/developer.entity';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import { TechnologyService } from './technology.service';
import { UpdateDeveloperDto } from '../dto/update-developer.dto';
import { TechnologyEntity } from '../entities/technology.entity';
import { UserService } from 'src/modules/users/services/user.service';

@Injectable()
export class DeveloperService {
  constructor(
    private readonly developerRepository: DeveloperRepository,
    private readonly technologyService: TechnologyService,
    private readonly userService: UserService,
  ) {}

  async findById(id: number): Promise<DeveloperEntity> {
    const foundDeveloper = await this.developerRepository.getById(id);
    if (!foundDeveloper) {
      throw new NotFoundException('developerNotFound');
    }

    return foundDeveloper;
  }

  async createDeveloper(
    newDeveloper: CreateDeveloperDto,
  ): Promise<DeveloperEntity> {
    const existDeveloper = await this.developerRepository.getByUser(
      newDeveloper.user_id,
    );

    await this.userService.findById(newDeveloper.user_id);

    if (existDeveloper) {
      throw new BadRequestException('entityWithArgumentsExists');
    }

    const technologiesEntity = await Promise.all(
      newDeveloper.technologies.map(async (id) => {
        const technology = await this.technologyService.findById(id);
        return technology;
      }),
    );

    const developer = new DeveloperEntity();
    const dataDeveloper: DeveloperEntity = {
      ...developer,
      ...newDeveloper,
      technologies: technologiesEntity,
    };

    const saveDeveloper = await this.developerRepository.createDeveloper(
      dataDeveloper,
    );

    if (!saveDeveloper) {
      throw new BadRequestException('developerNotSave');
    }

    return saveDeveloper;
  }

  async updateDeveloper(
    id: number,
    updateDeveloperDto: UpdateDeveloperDto,
  ): Promise<DeveloperEntity> {
    const foundDeveloper = await this.developerRepository.getById(id);

    if (!foundDeveloper) {
      throw new NotFoundException('developerNotFound');
    }

    let technologiesEntity: TechnologyEntity[] = [];

    if (updateDeveloperDto.technologies) {
      technologiesEntity = await Promise.all(
        updateDeveloperDto.technologies.map(async (id) => {
          const technology = await this.technologyService.findById(id);
          return technology;
        }),
      );
    }

    const developer = new DeveloperEntity();
    const dataDeveloper = Object.assign(
      updateDeveloperDto,
      technologiesEntity.length !== 0 && { technologies: technologiesEntity },
    );

    try {
      const updatedDeveloper = await this.developerRepository.updateDeveloper({
        ...developer,
        ...foundDeveloper,
        ...dataDeveloper,
      });

      return updatedDeveloper;
    } catch (error) {
      throw new BadRequestException('developerNotUpdate');
    }
  }
}
