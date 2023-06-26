import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

interface ResponseBody {
  timestamp: string;
  statusCode: number;
  path: string;
  message: string[];
  errorCode: string;
  description: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Record<string, unknown>, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const description: ResponseBody['description'] = '',
      errorCode: ResponseBody['errorCode'] = '';

    let statusCode: ResponseBody['statusCode'] = 0,
      message: ResponseBody['message'] = [];

    const timestamp: ResponseBody['timestamp'] = new Date().toISOString(),
      path: ResponseBody['path'] = httpAdapter.getRequestUrl(ctx.getRequest());

    if (exception instanceof BadRequestException) {
      const error = exception.getResponse();

      if (typeof error === 'object') {
        const _error = error as {
          statusCode: number;
          message: string[];
          error: string;
        };
        message = _error.message;
        statusCode = _error.statusCode;
      }
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = [exception.message];
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const responseBody: ResponseBody = {
      statusCode,
      timestamp,
      path,
      message,
      errorCode,
      description,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
