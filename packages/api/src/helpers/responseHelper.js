import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import _ from 'lodash-es';

import errorCodes from '../constants/errorCodes.js';
import logger from './logger.js';

/**
 * Generates a log object for a response.
 *
 * This function creates a log object containing details about the response,
 * including the request method, path, response time, user information, and transaction ID.
 * It is intended to standardize the structure of log entries for API responses.
 *
 * @private
 * @param {object} req - Express request object, expected to have custom properties like __startTime__,
 * __transactionId__, and _user.
 * @param {object} data - Data related to the response, such as status code and other details.
 * @returns {object} - A log object with details of the response including type, method, path, response time, user ID,
 * account ID, transaction ID, data, and message.
 */
const _generateLog = (req, data) => {
  const responseTime = new Date().getTime() - req.__startTime__;
  const transactionId = req.__transactionId__;

  return {
    type: 'RESPONSE',
    method: req.method,
    path: req.originalUrl,
    responseTime,
    userId: req._user?.id ?? undefined,
    accountId: req._user?.accountId ?? undefined,
    transactionId,
    data,
    message: `[RESPONSE] [${data?.statusCode}] ${req.route?.path}`,
  };
};

/**
 * Sends a 200 OK response.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {object} [data=null] - Optional data to include in the response.
 * @param {number|null} [count=null] - Optional count to include in the response.
 */
const ok = (req, res, data = null, count = null) => {
  const response = {
    statusCode: StatusCodes.OK,
    message: ReasonPhrases.OK,
  };

  if (!_.isNil(count)) {
    response.count = count;
  }

  if (!_.isNil(data)) {
    response.data = data;
  }

  logger.info(_generateLog(req, response));
  res.status(response.statusCode).json(response);
};

/**
 * Sends a 201 Created response.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {object} [data=null] - Optional data to include in the response.
 */
const created = (req, res, data = null) => {
  const response = {
    statusCode: StatusCodes.CREATED,
    message: ReasonPhrases.CREATED,
  };

  if (!_.isNil(data)) {
    response.data = data;
  }

  logger.info(_generateLog(req, response));
  res.status(response.statusCode).json(response);
};

/**
 * Sends a 204 No Content response.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const noContent = (req, res) => {
  const response = {
    statusCode: StatusCodes.NO_CONTENT,
    message: ReasonPhrases.NO_CONTENT,
  };

  logger.info(_generateLog(req, response));
  res.status(response.statusCode).json(response);
};

/**
 * Sends a 400 Bad Request response.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {string} [message=ReasonPhrases.BAD_REQUEST] - Custom error message.
 * @param {string} [errorCode=errorCodes.BAD_REQUEST] - Custom error code.
 */
const badRequest = (req, res, message = ReasonPhrases.BAD_REQUEST, errorCode = errorCodes.BAD_REQUEST) => {
  const response = {
    statusCode: StatusCodes.BAD_REQUEST,
    message,
    errorCode,
  };

  logger.error(_generateLog(req, response));
  res.status(response.statusCode).json(response);
};

/**
 * Sends a 401 Unauthorized response.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {string} [message=ReasonPhrases.UNAUTHORIZED] - Custom error message.
 * @param {string} [errorCode=errorCodes.UNAUTHORIZED] - Custom error code.
 */
const unauthorized = (req, res, message = ReasonPhrases.UNAUTHORIZED, errorCode = errorCodes.UNAUTHORIZED) => {
  const response = {
    statusCode: StatusCodes.UNAUTHORIZED,
    message,
    errorCode,
  };

  logger.error(_generateLog(req, response));
  res.status(response.statusCode).json(response);
};

/**
 * Sends a 403 Forbidden response.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {string} [message=ReasonPhrases.FORBIDDEN] - Custom error message.
 * @param {string} [errorCode=errorCodes.FORBIDDEN] - Custom error code.
 */
const forbidden = (req, res, message = ReasonPhrases.FORBIDDEN, errorCode = errorCodes.FORBIDDEN) => {
  const response = {
    statusCode: StatusCodes.FORBIDDEN,
    message,
    errorCode,
  };

  logger.error(_generateLog(req, response));
  res.status(response.statusCode).json(response);
};

/**
 * Sends a 404 Not Found response.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {string} [message=ReasonPhrases.NOT_FOUND] - Custom error message.
 * @param {string} [errorCode=errorCodes.NOT_FOUND] - Custom error code.
 */
const notFound = (req, res, message = ReasonPhrases.NOT_FOUND, errorCode = errorCodes.NOT_FOUND) => {
  const response = {
    statusCode: StatusCodes.NOT_FOUND,
    message,
    errorCode,
  };

  logger.error(_generateLog(req, response));
  res.status(response.statusCode).json(response);
};

/**
 * Sends a 409 Conflict response.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {string} [message=ReasonPhrases.CONFLICT] - Custom error message.
 * @param {string} [errorCode=errorCodes.CONFLICT] - Custom error code.
 */
const conflict = (req, res, message = ReasonPhrases.CONFLICT, errorCode = errorCodes.CONFLICT) => {
  const response = {
    statusCode: StatusCodes.CONFLICT,
    message,
    errorCode,
  };

  logger.error(_generateLog(req, response));
  res.status(response.statusCode).json(response);
};

/**
 * Sends a 500 Internal Server Error response.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {string} [message=ReasonPhrases.INTERNAL_SERVER_ERROR] - Custom error message.
 * @param {string} [errorCode=errorCodes.ERROR] - Custom error code.
 */
const error = (req, res, message = ReasonPhrases.INTERNAL_SERVER_ERROR, errorCode = errorCodes.ERROR) => {
  const response = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message,
    errorCode,
  };

  logger.error(_generateLog(req, response));
  res.status(response.statusCode).json(response);
};

/**
 * Sends a custom response with a specified status code.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {number} statusCode - Custom status code for the response.
 * @param {string} message - Custom message for the response.
 * @param {string|null} [errorCode=null] - Optional custom error code.
 */
const custom = (req, res, statusCode, message, errorCode = null) => {
  const response = {
    statusCode,
    message,
  };

  if (!_.isNil(errorCode)) {
    response.errorCode = errorCode;
  }

  logger.error(_generateLog(req, response));
  res.status(response.statusCode).json(response);
};

export default { ok, created, noContent, badRequest, unauthorized, forbidden, notFound, conflict, error, custom };
