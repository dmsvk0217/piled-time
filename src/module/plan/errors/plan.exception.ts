import { HttpStatus } from "@nestjs/common";
import { PTException } from "src/errors/exception";

export class PlanException {
  static readonly NOT_EXISTS = new PTException(
    [
      {
        code: "plied-time.plan.not-found",
        message: "계획이 존재하지 않습니다.",
        httpStatus: HttpStatus.NOT_FOUND,
      },
    ],
    HttpStatus.NOT_FOUND
  );

  static readonly ALREADY_EXISTS = new PTException(
    [
      {
        code: "plied-time.plan.already-exists",
        message: "계획이 이미 존재합니다.",
        httpStatus: HttpStatus.BAD_REQUEST,
      },
    ],
    HttpStatus.BAD_REQUEST
  );
}
