import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestStatic } from 'src/utils/test';
import { FilterCountryDto } from '../dto/filter-country.dto';
import { CountryService } from '../services/country.service';
import { CountryController } from './country.controller';

describe('CountryController', () => {
  let countryController: CountryController;

  const mockService = {
    findById: jest.fn(),
    createCountry: jest.fn(),
    updateCountry: jest.fn(),
    deleteCountry: jest.fn(),
    getByFilter: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [{ provide: CountryService, useValue: mockService }],
    }).compile();

    countryController = module.get<CountryController>(CountryController);
  });

  beforeEach(() => {
    mockService.createCountry.mockReset();
    mockService.deleteCountry.mockReset();
    mockService.findById.mockReset();
    mockService.updateCountry.mockReset();
    mockService.getByFilter.mockReset();
  });

  it('deveria estar definido', () => {
    expect(countryController).toBeDefined();
  });

  describe('getById', () => {
    it('deveria retornar o resultado da busca e devolver um registro de dados de país', async () => {
      const country = TestStatic.countryData();
      mockService.findById.mockReturnValue(country);
      const foundCountry = await countryController.getById(country.id);
      expect(foundCountry).toMatchObject({ id: country.id });
      expect(mockService.findById).toHaveBeenCalledTimes(1);
    });

    it('deveria retornar uma exceção, pois o path param enviado não é um numérico', async () => {
      const anyValue = 'anyValue' as unknown as number;
      await countryController.getById(anyValue).catch((error: Error) => {
        expect(error).toMatchObject({
          message: 'FieldMustBeNumber',
        });
        expect(error).toBeInstanceOf(BadRequestException);
      });
    });
  });

  describe('getByFilter', () => {
    it('deveria retornar o valor do país de acordo com o filtro name', async () => {
      const query: FilterCountryDto = { name: 'na' };
      const countries = TestStatic.countriesData();
      const filterCountries = countries.filter(({ name }) =>
        name.includes(query.name),
      );

      mockService.getByFilter.mockReturnValue(filterCountries);
      const foundCountries = await countryController.getByFilter(query);
      foundCountries.forEach((country) => {
        expect(country.name).toContain(query.name);
      });
    });
  });

  describe('createCountry', () => {
    it('deveria criar um registro de país com sucesso', async () => {
      const countryDto = TestStatic.countryDto();
      const country = TestStatic.countryData();

      mockService.createCountry.mockReturnValue(country);
      const saveCountry = await countryController.createCountry(countryDto);
      expect(saveCountry).toMatchObject({
        language: countryDto.language,
        name: countryDto.name,
      });
    });
  });
});
