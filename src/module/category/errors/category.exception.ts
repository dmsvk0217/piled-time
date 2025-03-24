import { HttpStatus } from "@nestjs/common";
import { Exception } from "src/errors/exception";

export class CategoryException {
  static readonly NOT_EXISTS = new Exception(
    [
      {
        code: "category.find.not-found",
        message: "카테고리가 존재하지 않습니다.",
        httpStatus: HttpStatus.NOT_FOUND,
      },
    ],
    HttpStatus.NOT_FOUND
  );

  static readonly ALREADY_EXISTS = new Exception(
    [
      {
        code: "category.save.already-exists",
        message: "카테고리가 이미 존재합니다.",
        httpStatus: HttpStatus.BAD_REQUEST,
      },
    ],
    HttpStatus.BAD_REQUEST
  );
}
