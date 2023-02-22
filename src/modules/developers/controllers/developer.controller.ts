import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import { CreateTechnologyDto } from '../dto/create-technology.dto';
import { UpdateDeveloperDto } from '../dto/update-developer.dto';
import { DeveloperEntity } from '../entities/developer.entity';
import { TechnologyEntity } from '../entities/technology.entity';
import { DeveloperService } from '../services/developer.service';
import { TechnologyService } from '../services/technology.service';

@Controller('developer')
export class DeveloperController {
  constructor(
    private developerService: DeveloperService,
    private technologyService: TechnologyService,
  ) {}

  @Get('getDeveloperById/:id')
  async getDeveloperById(@Param('id') id: number): Promise<DeveloperEntity> {
    return await this.developerService.findById(id);
  }

  @Get('getTechnologyById/:id')
  async getTechnologyById(@Param('id') id: number): Promise<TechnologyEntity> {
    return await this.technologyService.findById(id);
  }

  @Post('createTechnology')
  async createTechnology(
    @Body() newTechnology: CreateTechnologyDto,
  ): Promise<TechnologyEntity> {
    return await this.technologyService.createTechnology(newTechnology);
  }

  @Post('createManyTechnologies')
  async createManyTechnologies(
    @Body() newTechnologies: CreateTechnologyDto[],
  ): Promise<TechnologyEntity[]> {
    return await this.technologyService.createManyTechnologies(newTechnologies);
  }

  @Post('createDeveloper')
  async createDeveloper(
    @Body() newDeveloper: CreateDeveloperDto,
  ): Promise<DeveloperEntity> {
    return await this.developerService.createDeveloper(newDeveloper);
  }

  @Patch('updateDeveloper/:id')
  async updateDeveloper(
    @Param('id') id: number,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ): Promise<DeveloperEntity> {
    return await this.developerService.updateDeveloper(id, updateDeveloperDto);
  }
}
