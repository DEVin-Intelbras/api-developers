import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestStatic } from 'src/utils/test';
import { CountryRepository } from '../country.repository';
import { CountryService } from './country.service';

describe('countryService', () => {
  let countryService: CountryService;
  let countryRepository: CountryRepository;

  const mockRepository = {
    getById: jest.fn(),
    createCountry: jest.fn(),
    updateCountry: jest.fn(),
    deleteCountry: jest.fn(),
    getByName: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: CountryRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    countryService = module.get<CountryService>(CountryService);
    countryRepository = module.get<CountryRepository>(CountryRepository);
  });

  beforeEach(() => {
    mockRepository.createCountry.mockReset();
    mockRepository.deleteCountry.mockReset();
    mockRepository.getById.mockReset();
    mockRepository.updateCountry.mockReset();
    mockRepository.getByName.mockReset();
  });

  it('deveria ser definido countryService', () => {
    expect(countryService).toBeDefined();
  });

  it('deveria ser definido countryRepository', () => {
    expect(countryRepository).toBeDefined();
  });

  describe('findById', () => {
    it('deveria retornar o objeto country', async () => {
      const country = TestStatic.countryData();
      mockRepository.getById.mockReturnValue(country);
      const foundCountry = await countryService.findById(country.id);
      expect(foundCountry).toMatchObject({ id: country.id });
      expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    });

    it('deveria retornar uma excessão devido ao valor enviado', async () => {
      mockRepository.getById.mockReturnValue(null);
      const pathId = 2;
      expect(countryService.findById(pathId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    });
  });

  describe('createCountry', () => {
    it('deveria criar um país corretamente', async () => {
      const country = TestStatic.countryData();
      const countryDto = TestStatic.countryDto();

      mockRepository.getByName.mockReturnValue(null);
      mockRepository.createCountry.mockReturnValue(country);

      const saveCountry = await countryService.createCountry(countryDto);

      expect(saveCountry).toMatchObject({
        name: country.name,
        language: country.language,
      });
      expect(mockRepository.getByName).toHaveBeenCalledTimes(1);
      expect(mockRepository.createCountry).toHaveBeenCalledTimes(1);
    });

    it('deveria retornar uma exceção, pois o país já existe', async () => {
      const country = TestStatic.countryData();
      const countryDto = TestStatic.countryDto();

      mockRepository.getByName.mockReturnValue(country);
      await countryService.createCountry(countryDto).catch((error: Error) => {
        expect(error).toMatchObject({
          message: 'entityWithArgumentsExists',
        });
        expect(error).toBeInstanceOf(BadRequestException);
      });
      expect(mockRepository.getByName).toHaveBeenCalledTimes(1);
    });

    it('deveria retornar uma exceção, pois houve uma falha ao salvar o país', async () => {
      const countryDto = TestStatic.countryDto();

      mockRepository.getByName.mockReturnValue(null);
      mockRepository.createCountry.mockReturnValue(null);

      await countryService.createCountry(countryDto).catch((error: Error) => {
        expect(error).toMatchObject({
          message: 'countryNotSave',
        });
        expect(error).toBeInstanceOf(BadRequestException);
      });
    });
  });

  describe('updateCountry', () => {
    it('deveria atualizar o país com sucesso', async () => {
      const country = TestStatic.countryData();
      const updatedCountry = {
        language: 'Inglês',
      };

      mockRepository.getById.mockReturnValue(country);
      mockRepository.updateCountry.mockReturnValue({
        ...country,
        ...updatedCountry,
      });

      const updateCountry = await countryService.updateCountry(
        country.id,
        updatedCountry,
      );

      expect(updateCountry).toMatchObject({
        language: updatedCountry.language,
      });

      expect(mockRepository.getById).toHaveBeenCalledTimes(1);
      expect(mockRepository.updateCountry).toHaveBeenCalledTimes(1);
    });
  });
});
