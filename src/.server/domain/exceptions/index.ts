export class HttpError extends Error {
  public statusCode = 400;

  constructor(message = "Bad Request", options?: ErrorOptions) {
    super(message, options);
    this.name = "ApplicationError";
  }
}

export class DBOperationError extends HttpError {
  constructor(message = "DB error", options?: ErrorOptions) {
    super(message, options);
    this.name = "DBOperationError";
  }
}

export class AuthenticationError extends HttpError {
  constructor() {
    super("You must be logged in to view this content");
    this.name = "AuthenticationError";
    // this.statusCode = HttpStatusCode.Unauthorized;
  }
}

export class NotVerifiedError extends HttpError {
  constructor(message = "Not verified!") {
    super(message);
    this.name = "NotVerifiedError";
    // this.statusCode = HttpStatusCode.Forbidden;
  }
}

export class AuthorizationError extends HttpError {
  constructor(message = "Unauthorized action") {
    super(message);
    this.name = "AuthorizationError";
    // this.statusCode = HttpStatusCode.Forbidden;
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
    // this.statusCode = HttpStatusCode.NotFound;
  }
}

export class ValidationError extends HttpError {
  public fieldErrors: Record<string, string[] | undefined>;

  constructor(
    fieldErrors: Record<string, string[] | undefined>,
    message = "Validation failed!",
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = "ValidationError";
    this.fieldErrors = fieldErrors;
    // this.statusCode = HttpStatusCode.BadRequest;
  }
}

export class TokenError extends HttpError {
  constructor(message = "Invalid code!") {
    super(message);
    this.name = "TokenExpiredError";
  }
}
