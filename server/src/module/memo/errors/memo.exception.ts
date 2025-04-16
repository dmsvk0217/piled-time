import { HttpStatus } from "@nestjs/common";
import { PTException } from "src/errors/exception";

export class MemoException {
  static readonly NOT_EXISTS = new PTException(
    [
      {
        code: "plied-time.memo.not-found",
        message: "메모가 존재하지 않습니다.",
        httpStatus: HttpStatus.NOT_FOUND,
      },
    ],
    HttpStatus.NOT_FOUND
  );
}
