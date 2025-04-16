import { ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { PTException } from "src/errors/exception";
import { ValidateExceptionType } from "src/errors/types";

export class GlobalValidationPipe extends ValidationPipe {
  public createExceptionFactory() {
    return (errors: ValidationError[]) => {
      const extractionErrors = this.extractionValidationErrors(errors);
      return new PTException(extractionErrors);
    };
  }

  private extractionValidationErrors(errors: ValidationError[]): ValidateExceptionType[] {
    return errors.map(({ property, target, constraints }) => {
      const code = this.getCode(property, target.constructor.name, Object.keys(constraints)[0]);
      return {
        code: code,
        target: property,
        message: Object.values(constraints)[0],
      };
    }, []);
  }

  private getCode(target: string, className: string, constraint: string) {
    return `${this.camelToSnake(target)}.${this.camelToSnake(constraint)}.${this.camelToSnake(className)}`;
  }

  private camelToSnake(str: string) {
    return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/^-/, "");
  }
}
