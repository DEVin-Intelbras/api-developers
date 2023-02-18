import { CreateCountryDto } from 'src/core/dtos';
import { CountryEntity } from 'src/core/entities';

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
}
