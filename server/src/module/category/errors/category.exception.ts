import { HttpStatus } from "@nestjs/common";
import { PTException } from "src/errors/exception";

export class CategoryException {
  static readonly NOT_EXISTS = new PTException(
    [
      {
        code: "plied-time.category.not-found",
        message: "카테고리가 존재하지 않습니다.",
        httpStatus: HttpStatus.NOT_FOUND,
      },
    ],
    HttpStatus.NOT_FOUND,
  );
}
