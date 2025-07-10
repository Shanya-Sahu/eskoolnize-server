export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class UnauthenticatedError extends CustomError {
  constructor(message = "Authentication invalid") {
    super(message, 401);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = "Not authorized to access this route") {
    super(message, 403);
  }
}

export class BadRequestError extends CustomError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class NotFoundError extends CustomError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}
