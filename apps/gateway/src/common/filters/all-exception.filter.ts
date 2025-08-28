/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ERROR_MESSAGES } from '@app/common/constants/errors';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let statusCode = 500;
    let code = 1005;
    let message = ERROR_MESSAGES.INTERNAL_ERROR.message;

    console.log(exception);

    // Nếu là HttpException (ValidationPipe, manual throw trong Gateway)
    if (exception instanceof HttpException) {
      const response = exception.getResponse() as {
        code?: number;
        message?: any;
      };
      statusCode = exception.getStatus();
      code = response?.code ?? code;
      message = response?.message ?? message;
    }
    // Nếu là lỗi từ service con (RPC)
    else if (
      typeof exception === 'object' &&
      exception?.statusCode &&
      exception?.code
    ) {
      statusCode = exception.statusCode;
      code = exception.code;
      message = exception.message;
    }

    res.status(statusCode).json({ code, message });
  }
}
