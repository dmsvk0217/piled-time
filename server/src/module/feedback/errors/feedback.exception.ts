import { HttpStatus } from "@nestjs/common";
import { PTException } from "src/errors/exception";

export class FeedbackException {
  static readonly NOT_EXISTS = new PTException(
    [
      {
        code: "plied-time.feedback.not-found",
        message: "피드백이 존재하지 않습니다.",
        httpStatus: HttpStatus.NOT_FOUND,
      },
    ],
    HttpStatus.NOT_FOUND,
  );
}
