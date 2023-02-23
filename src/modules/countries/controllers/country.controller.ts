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
import { UpdateCountryDto } from '../dto/update-country.dto';
import { isNumber } from '@nestjs/class-validator';
import { FilterCountryDto } from '../dto/filter-country.dto';
import { countryDocumentation } from '../documentation';
const { ApiOperation: doc } = countryDocumentation;
@ApiTags('countries')
@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @ApiOperation(doc.getById)
  @Get('getById/:id')
  @UsePipes(new ValidationPipe())
  async getById(@Param('id') id: number): Promise<CountryEntity> {
    if (!isNumber(+id)) {
      throw new BadRequestException('FieldMustBeNumber');
    }
    return await this.countryService.findById(id);
  }

  @ApiOperation(doc.createCountry)
  @Post('create')
  @UsePipes(new ValidationPipe())
  async createCountry(
    @Body() newCountry: CreateCountryDto,
  ): Promise<CountryEntity> {
    return this.countryService.createCountry(newCountry);
  }

  @ApiOperation(doc.updateCountry)
  @Patch('update/:id')
  @UsePipes(new ValidationPipe())
  async updateCountry(
    @Param('id') id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<CountryEntity> {
    if (!isNumber(+id)) {
      throw new BadRequestException('FieldMustBeNumber');
    }
    const countryUpdate = await this.countryService.updateCountry(
      id,
      updateCountryDto,
    );
    return countryUpdate;
  }

  @ApiOperation(doc.deleteById)
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteById(@Param('id') id: number): Promise<string> {
    if (!isNumber(+id)) {
      throw new BadRequestException('FieldMustBeNumber');
    }
    return await this.countryService.deleteCountry(id);
  }

  @ApiOperation(doc.getByFilter)
  @Get('getByFilter')
  @UsePipes(new ValidationPipe())
  async getByFilter(
    @Query() query: FilterCountryDto,
  ): Promise<CountryEntity[]> {
    return await this.countryService.getByFilter(query);
  }
}
