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
}
