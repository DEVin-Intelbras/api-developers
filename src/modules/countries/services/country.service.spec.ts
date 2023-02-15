import { NotFoundException } from '@nestjs/common';
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
    });

    it('deveria retornar uma excessão devido ao valor enviado', async () => {
      mockRepository.getById.mockReturnValue(null);
      const pathId = 2;
      expect(countryService.findById(pathId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
