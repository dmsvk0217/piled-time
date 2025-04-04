import { HttpException, HttpStatus } from "@nestjs/common";
import { BusinessExceptionType, ValidateExceptionType } from "./types";

export class PTException extends HttpException {
  constructor(errors: BusinessExceptionType[] | ValidateExceptionType[], httpStatus?: HttpStatus) {
    super({ errors }, httpStatus ? httpStatus : HttpStatus.BAD_REQUEST);
  }
}
