const userDocumentation = {
  ApiOperation: {
    getById: {
      summary: 'user/:id',
      description:
        'Este endpoint recebe como param o id do usuário e retorna os dados',
    },
    createUser: {
      summary: 'user/create',
      description:
        'Este endpoint recebe como no body os campos necessários para cadastrar um usuário',
    },
  },
  ApiProperty: {},
};

export { userDocumentation };
