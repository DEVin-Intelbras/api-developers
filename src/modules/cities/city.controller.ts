import { Controller, Post } from '@nestjs/common';
import { StateService } from '../states/services/state.service';
import { CityService } from './services/city.service';
import axios from 'axios';
import { City } from './interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cities')
@Controller('city')
export class CityController {
  constructor(
    private cityService: CityService,
    private stateService: StateService,
  ) {}

  @Post('create')
  async createAllStates(): Promise<string> {
    try {
      const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/municipios',
      );
      const states = await this.stateService.getByAll();

      data.forEach((city: City) => {
        const state = states.find(
          ({ initials }) => city.microrregiao.mesorregiao.UF.sigla === initials,
        );

        const newCity = {
          name: city.nome,
          state_id: state.id,
        };

        this.cityService.createCity(newCity);
      });
      return 'Cidades salvas com sucesso';
    } catch (error) {
      console.log(error);
    }
  }
}
