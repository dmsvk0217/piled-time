import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable, catchError, tap } from "rxjs";
import { Logger } from "src/common/logging/logger";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logger = new Logger(context.getClass().name);
    const start = Date.now();

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { method, url } = request;

    return next.handle().pipe(
      tap((responseData) => {
        logger.request(method, url, Date.now() - start);
        const preview =
          typeof responseData === "object"
            ? JSON.stringify(responseData).substring(0, 200)
            : String(responseData);
        logger.response(preview);
      }),
      catchError((error) => {
        logger.errors(method, url, Date.now() - start);
        logger.trace(error?.stack || error);
        throw error;
      })
    );
  }
}
