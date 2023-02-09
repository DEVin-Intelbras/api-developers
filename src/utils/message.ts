const messages = {
  emailInvalid: 'E-mail com formato inválido',
  userNotFound: 'Usuário não encontrado',
  cityNotFound: 'Cidade não encontrada',
};
interface responseHttpProps {
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
    path,
    records,
    timestamp: new Date().toISOString(),
  };
}

export { callbackResponse, responseHttp };
