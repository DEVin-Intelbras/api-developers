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
} from '@nestjs/common';
import { StateService } from '../services/state.service';
import axios from 'axios';
import { stateIGBE } from '../interface';
import { CountryService } from '../../countries/services/country.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isNumber } from '@nestjs/class-validator';
import { StateEntity } from '../entities/state.entity';
import { CreateStateDto } from '../dto/create-state.dto';
import { UpdateStateDto } from '../dto/update-country.dto';

@ApiTags('states')
@Controller('state')
export class StateController {
  constructor(
    private stateService: StateService,
    private countryService: CountryService,
  ) {}

  @Post('createAllStates/:country_id')
  async createAllStates(
    @Param('country_id') country_id: number,
  ): Promise<string> {
    try {
      const { data } = await axios.get(
        'http://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );
      const country = await this.countryService.findById(country_id);

      data.forEach((state: stateIGBE) => {
        const newState = {
          name: state.nome,
          initials: state.sigla,
          country_id: country.id,
        };

        this.stateService.createState(newState);
      });
      return 'Estados salvos com sucesso';
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({
    summary: 'state/:id',
    description:
      'Este endpoint recebe como param o id e retorna os dados do estado.',
  })
  @Get(':id')
  @UsePipes(new ValidationPipe())
  async getById(@Param('id') id: number): Promise<StateEntity[]> {
    return await this.stateService.getByAll();
  }

  @ApiOperation({
    summary: 'state/create',
    description:
      'Este endpoint recebe como body o name, initials, country_id para salvar um registro de dados.',
  })
  @Post('create')
  @UsePipes(new ValidationPipe())
  async createState(@Body() newState: CreateStateDto): Promise<StateEntity> {
    return this.stateService.createNewState(newState);
  }

  // @ApiOperation({
  //   summary: 'state/update/:id',
  //   description:
  //     'Este endpoint recebe como body o name, initials, country_id e o path como id para atualizar um registro de dados.',
  // })
  // @Patch('update/:id')
  // @UsePipes(new ValidationPipe())
  // async updateState(
  //   @Param('id') id: number,
  //   @Body() updateStateDto: UpdateStateDto,
  // ): Promise<StateEntity> {
  //   if (!isNumber(+id)) {
  //     throw new BadRequestException('FieldMustBeNumber');
  //   }

  //   const updatedState = await this.stateService.updateState(
  //     id,
  //     updateStateDto,
  //   );
  //   return updatedState;
  // }

  // @ApiOperation({
  //   summary: 'state/:id',
  //   description: 'Este endpoint recebe como param o id e excluí o registro',
  // })
  // @Delete(':id')
  // @UsePipes(new ValidationPipe())
  // async deleteById(@Param('id') id: number): Promise<string> {
  //   if (!isNumber(+id)) {
  //     throw new BadRequestException('FieldMustBeNumber');
  //   }

  //   return await this.stateService.deleteState(id);
  // }
}
