const countryDocumentation = {
  ApiOperation: {
    getById: {
      summary: 'country/:id',
      description:
        'Este endpoint recebe como param o id e retorna os dados do país.',
    },
    createCountry: {
      summary: 'country/create',
      description:
        'Este endpoint recebe como body o name e language para salvar um registro de dados.',
    },
    updateCountry: {
      summary: 'country/update/:id',
      description:
        'Este endpoint recebe como body o name e language e o path como id para atualizar um registro de dados.',
    },
    deleteById: {
      summary: 'country/:id',
      description: 'Este endpoint recebe como param o id e excluí o registro',
    },
    getByFilter: {
      summary: 'country/getByFilter',
      description:
        'Este endpoint retorna uma listagem completa dos país disponíveis, também podendo utilizar filtros para melhorar o retorno de dados',
    },
  },
  ApiProperty: {
    CreateCountryDtoName: { name: 'name', example: 'Brasil' },
    CreateCountryDtoLanguage: { name: 'language', example: 'Português' },
    FilterCountryDtoName: { name: 'name', required: false, example: 'Brasil' },
    FilterCountryDtoLanguage: {
      name: 'language',
      required: false,
      example: 'Português',
    },
    FilterCountryDtoId: {
      name: 'id',
      required: false,
      example: 1,
    },
    FilterCountryDtoCreatedAt: {
      name: 'createdAt',
      required: false,
      examples: { asc: { value: 'asc' }, desc: { value: 'desc' } },
    },
    FilterCountryDtoUpdatedAt: {
      name: 'updatedAt',
      required: false,
      examples: { asc: { value: 'asc' }, desc: { value: 'desc' } },
    },
  },
};

export { countryDocumentation };
