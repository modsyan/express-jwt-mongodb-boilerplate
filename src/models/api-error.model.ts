export default class ApiError extends Error {
  constructor(
    readonly statusCode: number,
    readonly message: string,
    readonly source?: Error
  ) {
    super();
  }
}

export class BadRequestError extends ApiError {
  constructor(readonly message: string = "Bad Request", source?: Error) {
    super(400, message, source);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(readonly message: string = "Unauthorized Error", source?: Error) {
    super(401, message, source);
  }
}

export class ForbiddenError extends ApiError {
  constructor(readonly message: string = "Forbidden", source?: Error) {
    super(403, message, source);
  }
}

export class NotFoundError extends ApiError {
  constructor(readonly message: string = "", source?: Error) {
    super(404, message, source);
  }
}

export class ValidationError extends ApiError {
  constructor(readonly message: string = "Validation Error", source?: Error) {
    super(422, message, source);
  }
}

export class InternalServerError extends ApiError {
  constructor(
    readonly message: string = "Internal Server Error",
    source?: Error
  ) {
    super(500, message, source);
  }
}

export class UnprocessableEntity extends ApiError {
  constructor(
    readonly message: string = "Unprocessable Entity",
    source?: Error
  ) {
    super(422, message, source);
  }
}
