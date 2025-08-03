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
    HttpStatus.NOT_FOUND
  );

  static readonly HAS_TODOS = new PTException(
    [
      {
        code: "plied-time.category.has-todos",
        message: "카테고리에 할 일이 존재하여 삭제할 수 없습니다.",
        httpStatus: HttpStatus.BAD_REQUEST,
      },
    ],
    HttpStatus.BAD_REQUEST
  );
}
