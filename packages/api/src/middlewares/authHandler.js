import errorMessages from '../constants/errorMessages.js';
import cryptoHelper from '../helpers/cryptoHelper.js';
import logger from '../helpers/logger.js';

/**
 * Middleware for authenticating JWT tokens.
 *
 * This middleware checks for a JWT token in the `Authorization` header.
 * If the token is missing or invalid, it throws an error with a 401 Unauthorized response.
 * If the token is valid, it attaches the decoded user information to `req.user`
 * and passes control to the next middleware.
 *
 * @param {object} req - Express request object.
 * @param {object} _res - Express response object.
 * @param {Function} _next - Function to move to the next middleware.
 * @throws {Error} If the token is missing, throws an error with a message from `AUTH_TOKEN_MISSING`.
 * @throws {Error} If the token is invalid, throws an error with a message from `INVALID_AUTH_TOKEN`.
 * @returns {void|response} Calls `next()` if authentication is successful, otherwise sends a 401 response.
 */
export default (req, _res, _next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    throw new Error(errorMessages.AUTH_TOKEN_MISSING);
  }

  try {
    const user = cryptoHelper.verify(token);
    req.user = user;

    return true;
  } catch (error) {
    logger.error({ message: errorMessages.INVALID_AUTH_TOKEN, error });
    throw new Error(errorMessages.INVALID_AUTH_TOKEN);
  }
};
