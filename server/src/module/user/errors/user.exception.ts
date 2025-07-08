import { HttpStatus } from "@nestjs/common";
import { PTException } from "src/errors/exception";

export class UserException {
  static readonly NOT_EXISTS = new PTException(
    [
      {
        code: "plied-time.user.not-found",
        message: "유저가 존재하지 않습니다.",
        httpStatus: HttpStatus.NOT_FOUND,
      },
    ],
    HttpStatus.NOT_FOUND,
  );
}
