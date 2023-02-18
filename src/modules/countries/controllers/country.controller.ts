import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { CreateCountryDto } from '../dto/create-country.dto';
import { CountryService } from '../services/country.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CountryEntity } from '../entities/country.entity';
import { ApiResponses } from '../../../utils/decorators';
import { UpdateCountryDto } from '../dto/update-country.dto';
import { isNumber } from '@nestjs/class-validator';
import { FilterCountryDto } from '../dto/filter-country.dto';

@ApiTags('countries')
@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}
  @ApiOperation({
    summary: 'country/:id',
    description:
      'Este endpoint recebe como param o id e retorna os dados do país.',
  })
  @Get('getById/:id')
  @UsePipes(new ValidationPipe())
  async getById(@Param('id') id: number): Promise<CountryEntity> {
    if (!isNumber(id)) {
      throw new BadRequestException('FieldMustBeNumber');
    }
    return await this.countryService.findById(id);
  }

  @ApiOperation({
    summary: 'country/create',
    description:
      'Este endpoint recebe como body o name e language para salvar um registro de dados.',
  })
  @Post('create')
  @ApiResponses({ 201: CreateCountryDto })
  @UsePipes(new ValidationPipe())
  async createCountry(
    @Body() newCountry: CreateCountryDto,
  ): Promise<CountryEntity> {
    return this.countryService.createCountry(newCountry);
  }

  @ApiOperation({
    summary: 'country/update/:id',
    description:
      'Este endpoint recebe como body o name e language e o path como id para atualizar um registro de dados.',
  })
  @Patch('update/:id')
  async updateCountry(
    @Param('id') id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<CountryEntity> {
    const countryUpdate = await this.countryService.updateCountry(
      id,
      updateCountryDto,
    );
    return countryUpdate;
  }

  @ApiOperation({
    summary: 'country/:id',
    description: 'Este endpoint recebe como param o id e excluí o registro',
  })
  @Delete(':id')
  async deleteById(@Param('id') id: number): Promise<string> {
    return await this.countryService.deleteCountry(id);
  }

  @Get('getByFilter')
  @UsePipes(new ValidationPipe())
  async getByFilter(
    @Query() query: FilterCountryDto,
  ): Promise<CountryEntity[]> {
    return await this.countryService.getByFilter(query);
  }
}
