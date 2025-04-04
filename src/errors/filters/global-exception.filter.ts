import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { Request, Response } from "express";
import * as process from "node:process";
import { PTException } from "src/errors/exception";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const normalizedException = this.normalizeException(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = this.getStatus(normalizedException);
    const body = this.getBody(normalizedException, request);

    response.status(status).json(body);
  }

  private normalizeException(exception: HttpException): HttpException {
    if (exception instanceof NotFoundException) {
      return new PTException(
        [
          {
            code: "plied-time.not-found.url",
            message: "존재하지 않은 URL 호출입니다.",
            httpStatus: HttpStatus.NOT_FOUND,
          },
        ],
        HttpStatus.NOT_FOUND
      );
    }
    return exception;
  }

  private getStatus(exception: HttpException): HttpStatus {
    return exception instanceof PTException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getBody(exception: HttpException, request: Request): string | object {
    const isPTException = exception instanceof PTException;

    const body = isPTException
      ? exception.getResponse()
      : {
          errors: [
            {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              path: request.url,
              message: "서버에 알 수 없는 에러가 생겼습니다. 관리자에게 문의해주세요.",
            },
          ],
        };

    if (process.env.NODE_ENV !== "production") {
      this.appendDebugInfo(body, exception);
    }

    return body;
  }

  private appendDebugInfo(body: any, exception: HttpException) {
    if (typeof body === "object" && exception.stack) {
      const [type, fileLine] = exception.stack.split("\n");
      body.debug = {
        type,
        file: fileLine?.match(/at (\w+\.\w+)/)?.[1],
      };
    }
  }
}
