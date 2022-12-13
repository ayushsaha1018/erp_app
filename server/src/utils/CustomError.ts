export class CustomError extends Error {
  statusCode: number;
  error: string | object;

  constructor(message: string, statusCode?: number, error?: string | object) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    this.error = error || message;
  }
}
