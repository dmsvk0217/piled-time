export type ValidateExceptionType = {
  readonly code: string;
  readonly target: string;
  readonly message: string;
  readonly httpStatus?: number;
};
