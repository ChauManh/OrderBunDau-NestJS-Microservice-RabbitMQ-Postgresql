// src/common/interceptors/response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { ReturnFromController } from '../interfaces/return-from-controller.interface';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<ReturnFromController<T>, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<ReturnFromController<T>>,
  ): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((returnFromResponse: ReturnFromController<T>) => {
        response.status(returnFromResponse.statusCode);

        return {
          message: returnFromResponse.message,
          data: returnFromResponse.data,
        };
      }),
    );
  }
}
