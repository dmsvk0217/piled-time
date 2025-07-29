import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const method = req.method.toUpperCase();

    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
      return next();
    }

    const csrfTokenFromCookie = req.cookies["csrf_token"];
    const csrfTokenFromHeader = req.headers["x-csrf-token"];

    if (!csrfTokenFromCookie || csrfTokenFromCookie !== csrfTokenFromHeader) {
      throw new ForbiddenException("Invalid CSRF token");
    }

    next();
  }
}
