const messages = {
  1000: 'E-mail com formato inválido',
};

function callbackResponse(code: number): string {
  return messages[code] || 'Erro não identificado, contatar o suporte';
}

export { callbackResponse };
