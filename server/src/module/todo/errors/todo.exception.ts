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
}
