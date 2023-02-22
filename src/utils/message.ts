const messages = {
  emailInvalid: 'E-mail com formato inválido',
  userNotFound: 'Usuário não encontrado',
  cityNotFound: 'Cidade não encontrada',
  countryNotFound: 'País não encontrado',
  FieldMustBeString: 'O valor enviado não é uma string',
  FieldMustBeNumber: 'O valor enviado não é um number',
  entityWithArgumentsExists: 'Já existe uma entidade com os atributos enviados',
  countryNotUpdate: 'Não foi possível atualizar o país',
  FieldMustNotBeEmpty: 'O campo enviado não pode ser vazio',
  technologyNotFound: 'Tecnologia não encontrada',
};

export interface responseHttpProps {
  statusCode: number;
  message?: string;
  path?: string;
  records?: any;
  timestamp?: string;
}

function callbackResponse(code: string): string {
  return messages[code] || 'Erro não identificado, contatar o suporte';
}

function responseHttp({
  statusCode,
  message,
  path,
  records,
}: responseHttpProps): responseHttpProps {
  return {
    statusCode,
    message,
    timestamp: new Date().toISOString(),
    path,
    records,
  };
}

export { callbackResponse, responseHttp };
