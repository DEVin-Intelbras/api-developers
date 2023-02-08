import { Controller, Post, Body } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountryService } from './services/country.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('countries')
@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Post('create')
  async createCountry(@Body() newCountry: CreateCountryDto): Promise<string> {
    try {
      this.countryService.createCountry(newCountry);
      return 'país salvo com sucesso';
    } catch (error) {
      console.log(error);
    }
  }
}
