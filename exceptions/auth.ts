import AppException from "./app";

export default class AuthError extends AppException {
  constructor(message: string) {
    super(401, message);
  }
}
