import { AuthenticationError } from "apollo-server";

/**
 * Verify the password with REGEX
 * More characters – If the length is under 8 characters.
 * Weak – If the length is less than 10 characters and doesn’t contain a combination of symbols, caps, text.
 * Medium – If the length is 10 characters or more and has a combination of symbols, caps, text.
 * Strong – If the length is 14 characters or more and has a combination of symbols, caps, text.
 * @author Benoit Podwinski <me@benoitpodwinski.com>
 * @param {string} password
 * @returns {boolean} if valid password return true
 * @throws {AuthenticationError} if bad password
 */

export default async function verifyPassword(
  password: string
): Promise<boolean> {
  const strongRegex = new RegExp(
    "^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
    "g"
  );

  const mediumRegex = new RegExp(
    "^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
    "g"
  );

  const enoughRegex = new RegExp("(?=.{8,}).*", "g");

  if (password.length === 0) {
    throw new AuthenticationError("Type password");
  } else if (false === enoughRegex.test(password)) {
    throw new AuthenticationError("Type a password with more characters");
  } else if (strongRegex.test(password)) {
    return true;
  } else if (mediumRegex.test(password)) {
    return true;
  } else {
    throw new AuthenticationError("Weak password!");
  }
}
