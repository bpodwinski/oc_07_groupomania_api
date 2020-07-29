export default class AppException extends Error {
  httpStatus: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.httpStatus = status;
    this.message = message;
  }
}
