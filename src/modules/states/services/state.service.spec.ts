import { Test, TestingModule } from '@nestjs/testing';
import { CountryRepository } from 'src/modules/countries/country.repository';
import { CountryService } from 'src/modules/countries/services/country.service';
import { TestStatic } from 'src/utils/test';
import { StateRepository } from '../state.repository';
import { StateService } from './state.service';

describe('stateService', () => {
  let stateService: StateService;
  let stateRepository: StateRepository;
  let countryService: CountryService;
  let countryRepository: CountryRepository;

  const mockStateRepository = {
    getByAll: jest.fn(),
    getByName: jest.fn(),
    createState: jest.fn(),
  };

  const mockCountryRepository = {
    getById: jest.fn(),
    createCountry: jest.fn(),
    updateCountry: jest.fn(),
    deleteCountry: jest.fn(),
    getByName: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        CountryService,
        {
          provide: CountryRepository,
          useValue: mockCountryRepository,
        },
        {
          provide: StateRepository,
          useValue: mockStateRepository,
        },
      ],
    }).compile();

    countryService = module.get<CountryService>(CountryService);
    countryRepository = module.get<CountryRepository>(CountryRepository);
    stateService = module.get<StateService>(StateService);
    stateRepository = module.get<StateRepository>(StateRepository);
  });

  it('deveria ser definido countryService', () => {
    expect(countryService).toBeDefined();
  });

  it('deveria ser definido countryRepository', () => {
    expect(countryRepository).toBeDefined();
  });

  it('deveria ser definido countryService', () => {
    expect(stateService).toBeDefined();
  });

  it('deveria ser definido countryRepository', () => {
    expect(stateRepository).toBeDefined();
  });

  describe('getByAll', () => {
    it('deveria retornar todos os estados com os dados do país relacionado', async () => {
      const states = TestStatic.statesData();
      const country = TestStatic.countryData();
      mockStateRepository.getByAll.mockReturnValue(states);
      const result = await stateService.getByAll();
      result.forEach((data) => {
        expect(data.country.id).toEqual(country.id);
      });
    });
  });

  describe('createNewState', () => {
    it('deveria criar um novo estado', async () => {
      const stateDto = TestStatic.stateDto();
      const state = TestStatic.stateData();
      const country = TestStatic.countryData();

      mockCountryRepository.getById.mockReturnValue(country);
      mockStateRepository.getByName.mockReturnValue(null);
      mockStateRepository.createState.mockReturnValue(state);

      const newState = await stateService.createNewState(stateDto);

      expect(newState).toMatchObject(state);
    });
  });
});
