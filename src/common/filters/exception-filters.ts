import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    let message = (exception as any)?.response?.message
      ? (exception as any)?.response?.message
      : (exception as any)?.message;
    let code = "HttpException";

    Logger.error(message, exception.stack, `${request.method} ${request.url}`);

    switch (exception.constructor) {
      case NotFoundException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        code = (exception as any).code;
        break;
      case ForbiddenException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        code = (exception as any).code;
        break;
      case UnauthorizedException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        code = (exception as any).code;
        break;
      case HttpException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        code = (exception as any).code;
        break;
      case Prisma.PrismaClientKnownRequestError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as unknown as Prisma.PrismaClientKnownRequestError)
          .message;
        code = (exception as any).code;
        break;
      case Prisma.PrismaClientInitializationError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (
          exception as unknown as Prisma.PrismaClientInitializationError
        ).message;
        code = (exception as any).code;
        break;
      case Prisma.PrismaClientUnknownRequestError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (
          exception as unknown as Prisma.PrismaClientUnknownRequestError
        ).message;
        code = (exception as any).code;
        break;
      case Prisma.PrismaClientValidationError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as unknown as Prisma.PrismaClientValidationError)
          .message;
        code = (exception as any).code;
        break;
      case BadRequestException:
        status = (exception as HttpException).getStatus();
        message = (exception as any)?.response?.message
          ? (exception as any)?.response?.message
          : (exception as any)?.message;
        code = (exception as any).code;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json({
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
