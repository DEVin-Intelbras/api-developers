import { Controller, Post, Param } from '@nestjs/common';
import { StateService } from './services/state.service';
import axios from 'axios';
import { stateIGBE } from './interface';
import { CountryService } from '../countries/services/country.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('states')
@Controller('state')
export class StateController {
  constructor(
    private stateService: StateService,
    private countryService: CountryService,
  ) {}

  @Post('create/:country_id')
  async createAllStates(
    @Param('country_id') country_id: number,
  ): Promise<string> {
    try {
      const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
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
}
