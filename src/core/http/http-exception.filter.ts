import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { callbackResponse, responseHttp } from 'src/utils/message';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const code: string = exception.getResponse()['message'];

    response.status(status).json(
      responseHttp({
        statusCode: status,
        message: callbackResponse(code),
        path: request.url,
      }),
    );
  }
}
