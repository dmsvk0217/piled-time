import { HttpStatus } from "@nestjs/common";
import { PTException } from "src/errors/exception";

export class TodoException {
  static readonly NOT_EXISTS = new PTException(
    [
      {
        code: "plied-time.todo.not-found",
        message: "할 일이 존재하지 않습니다.",
        httpStatus: HttpStatus.NOT_FOUND,
      },
    ],
    HttpStatus.NOT_FOUND
  );

  static readonly INVALID_PERCENT = new PTException(
    [
      {
        code: "plied-time.todo.invalid-percent",
        message: "달성률(percent)은 0, 25, 50, 75, 100 중 하나여야 합니다.",
        httpStatus: HttpStatus.BAD_REQUEST,
      },
    ],
    HttpStatus.BAD_REQUEST
  );
}
