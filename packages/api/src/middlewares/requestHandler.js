import { v4 as uuidv4 } from 'uuid';

import logger from '../helpers/logger.js';

/**
 * Generates a log object for an API request.
 *
 * This function creates a log object containing details about the incoming request,
 * including the request method, path, endpoint, request time, transaction ID, and payload (if available).
 * It standardizes the structure of log entries for API requests.
 *
 * @param {object} req - Express request object, expected to have properties such as __startTime__, __transactionId__,
 * and optionally swagger details.
 * @returns {object} - A log object with details of the request including type, method, path, endpoint, request time,
 * transaction ID, payload, and message.
 */
const _generateLog = (req) => {
  const requestTime = req.__startTime__;
  const transactionId = req.__transactionId__;
  const endpoint = `${req.method} ${req?.swagger?.apiPath ?? ''}`;

  let payload;
  if (req.body) {
    payload = req.body;
  }

  return {
    type: 'REQUEST',
    method: req.method,
    path: req.originalUrl,
    endpoint,
    requestTime,
    transactionId,
    payload,
    message: `[REQUEST] ${endpoint} ${req.originalUrl}`,
  };
};

/**
 * Middleware to initialize request logging.
 *
 * This middleware sets up the request logging by assigning a start time and a unique transaction ID to the request.
 * It then generates an initial log entry for the incoming request and logs it using the application's logger.
 *
 * @param {object} req - Express request object.
 * @param {object} _res - Express response object (not used).
 * @param {Function} next - Express next middleware function.
 */
export default (req, _res, next) => {
  req.__startTime__ = new Date().getTime();
  req.__transactionId__ = uuidv4();

  logger.info({ ..._generateLog(req) });
  next();
};
