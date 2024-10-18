import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import _ from 'lodash-es';

import errorCodes from '../constants/errorCodes.js';

/**
 * Sends a 200 OK response.
 *
 * @param {object} res - Express response object.
 * @param {object} [data=null] - Optional data to include in the response.
 * @param {number|null} [count=null] - Optional count to include in the response.
 */
const ok = (res, data = null, count = null) => {
  const response = {
    statusCode: StatusCodes.OK,
    message: ReasonPhrases.OK,
  };

  if (!_.isNil(data)) {
    response.data = data;
  }

  if (!_.isNil(count)) {
    response.count = count;
  }

  res.status(response.statusCode).json(response);
};

/**
 * Sends a 201 Created response.
 *
 * @param {object} res - Express response object.
 * @param {object} [data=null] - Optional data to include in the response.
 */
const created = (res, data = null) => {
  const response = {
    statusCode: StatusCodes.CREATED,
    message: ReasonPhrases.CREATED,
  };

  if (!_.isNil(data)) {
    response.data = data;
  }

  res.status(response.statusCode).json(response);
};

/**
 * Sends a 400 Bad Request response.
 *
 * @param {object} res - Express response object.
 * @param {string} [message=ReasonPhrases.BAD_REQUEST] - Custom error message.
 * @param {string} [errorCode=errorCodes.BAD_REQUEST] - Custom error code.
 */
const badRequest = (res, message = ReasonPhrases.BAD_REQUEST, errorCode = errorCodes.BAD_REQUEST) => {
  const response = {
    statusCode: StatusCodes.BAD_REQUEST,
    message,
    errorCode,
  };

  res.status(response.statusCode).json(response);
};

/**
 * Sends a 401 Unauthorized response.
 *
 * @param {object} res - Express response object.
 * @param {string} [message=ReasonPhrases.UNAUTHORIZED] - Custom error message.
 * @param {string} [errorCode=errorCodes.UNAUTHORIZED] - Custom error code.
 */
const unauthorized = (res, message = ReasonPhrases.UNAUTHORIZED, errorCode = errorCodes.UNAUTHORIZED) => {
  const response = {
    statusCode: StatusCodes.UNAUTHORIZED,
    message,
    errorCode,
  };

  res.status(response.statusCode).json(response);
};

/**
 * Sends a 403 Forbidden response.
 *
 * @param {object} res - Express response object.
 * @param {string} [message=ReasonPhrases.FORBIDDEN] - Custom error message.
 * @param {string} [errorCode=errorCodes.FORBIDDEN] - Custom error code.
 */
const forbidden = (res, message = ReasonPhrases.FORBIDDEN, errorCode = errorCodes.FORBIDDEN) => {
  const response = {
    statusCode: StatusCodes.FORBIDDEN,
    message,
    errorCode,
  };

  res.status(response.statusCode).json(response);
};

/**
 * Sends a 404 Not Found response.
 *
 * @param {object} res - Express response object.
 * @param {string} [message=ReasonPhrases.NOT_FOUND] - Custom error message.
 * @param {string} [errorCode=errorCodes.NOT_FOUND] - Custom error code.
 */
const notFound = (res, message = ReasonPhrases.NOT_FOUND, errorCode = errorCodes.NOT_FOUND) => {
  const response = {
    statusCode: StatusCodes.NOT_FOUND,
    message,
    errorCode,
  };

  res.status(response.statusCode).json(response);
};

/**
 * Sends a 409 Conflict response.
 *
 * @param {object} res - Express response object.
 * @param {string} [message=ReasonPhrases.CONFLICT] - Custom error message.
 * @param {string} [errorCode=errorCodes.CONFLICT] - Custom error code.
 */
const conflict = (res, message = ReasonPhrases.CONFLICT, errorCode = errorCodes.CONFLICT) => {
  const response = {
    statusCode: StatusCodes.CONFLICT,
    message,
    errorCode,
  };

  res.status(response.statusCode).json(response);
};

/**
 * Sends a 500 Internal Server Error response.
 *
 * @param {object} res - Express response object.
 * @param {string} [message=ReasonPhrases.INTERNAL_SERVER_ERROR] - Custom error message.
 * @param {string} [errorCode=errorCodes.ERROR] - Custom error code.
 */
const error = (res, message = ReasonPhrases.INTERNAL_SERVER_ERROR, errorCode = errorCodes.ERROR) => {
  const response = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message,
    errorCode,
  };

  res.status(response.statusCode).json(response);
};

export default { ok, created, badRequest, unauthorized, forbidden, notFound, conflict, error };
