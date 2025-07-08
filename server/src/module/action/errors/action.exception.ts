import { HttpStatus } from "@nestjs/common";
import { PTException } from "src/errors/exception";

export class ActionException {
  static readonly NOT_EXISTS = new PTException(
    [
      {
        code: "plied-time.action.not-found",
        message: "실행이 존재하지 않습니다.",
        httpStatus: HttpStatus.NOT_FOUND,
      },
    ],
    HttpStatus.NOT_FOUND,
  );

  static readonly ALREADY_EXISTS = new PTException(
    [
      {
        code: "plied-time.action.already-exists",
        message: "실행이 이미 존재합니다.",
        httpStatus: HttpStatus.BAD_REQUEST,
      },
    ],
    HttpStatus.BAD_REQUEST,
  );
}
