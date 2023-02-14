import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';

import { map } from 'rxjs/operators';
import { responseHttp, responseHttpProps } from 'src/utils/message';
import { Response, Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class TransformerInterceptor<T> implements NestInterceptor<T> {
  intercept(
    host: ExecutionContext,
    next: CallHandler,
  ): Observable<responseHttpProps> {
    const context = host.switchToHttp();
    const { path } = context.getRequest<Request>();
    const { statusCode } = context.getResponse<Response>();

    return next.handle().pipe(
      map((records) => {
        return responseHttp({
          statusCode,
          message: records.message,
          path,
          records,
        });
      }),
    );
  }
}
