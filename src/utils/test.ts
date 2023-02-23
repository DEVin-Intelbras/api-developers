import { CreateCountryDto, CreateStateDto } from 'src/core/dtos';
import { CountryEntity, StateEntity } from 'src/core/entities';

export class TestStatic {
  static countryData(): CountryEntity {
    const country = new CountryEntity();
    country.id = 1;
    country.language = 'Português';
    country.name = 'Brasil';
    country.createdAt = new Date();
    country.updatedAt = new Date();
    country.deletedAt = null;

    return country;
  }

  static countryDto(): CreateCountryDto {
    const countryBodyDto = new CreateCountryDto();
    countryBodyDto.language = 'Português';
    countryBodyDto.name = 'Brasil';

    return countryBodyDto;
  }

  static countriesData(): CountryEntity[] {
    const countries = ['Brasil', 'Canada', 'China'].map((name, index) => {
      const country = new CountryEntity();
      country.id = index + 1;
      country.language = 'Português';
      country.name = name;
      country.createdAt = new Date(`2023-02-1${index + 1} 12:06:12.090`);
      country.updatedAt = new Date(`2023-02-1${index + 1} 12:06:12.090`);
      country.deletedAt = null;

      return country;
    });

    return countries;
  }

  static statesData(): StateEntity[] {
    const states = [
      { id: 1, initials: 'RS', name: 'Rio Grande do Sul' },
      { id: 2, initials: 'SC', name: 'Santa Catarina' },
      { id: 3, initials: 'PR', name: 'Paraná' },
    ].map(({ id, initials, name }, index) => {
      const state = new StateEntity();
      state.id = id;
      state.country_id = this.countryData().id;
      state.name = name;
      state.initials = initials;
      state.country = this.countryData();
      state.createdAt = new Date(`2023-02-1${index} 12:06:12.090`);
      state.updatedAt = new Date(`2023-02-2${index} 12:06:12.090`);
      state.deletedAt = null;
      return state;
    });

    return states;
  }
  static stateData(): StateEntity {
    const state = new StateEntity();
    state.id = 28;
    state.country_id = this.countryData().id;
    state.name = 'Nova Intelbras';
    state.initials = 'NI';
    state.country = this.countryData();
    state.createdAt = new Date(`2023-02-10 12:06:12.090`);
    state.updatedAt = new Date(`2023-02-20 12:06:12.090`);
    state.deletedAt = null;
    return state;
  }

  static stateDto(): CreateStateDto {
    const stateBodyDto = new CreateStateDto();
    stateBodyDto.initials = 'NI';
    stateBodyDto.name = 'Nova Intelbras';
    stateBodyDto.country_id = 1;

    return stateBodyDto;
  }
}
