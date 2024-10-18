import logger from '../helpers/logger.js';
import responseHelper from '../helpers/responseHelper.js';

/**
 * Middleware to handle errors and send appropriate responses.
 *
 * This middleware intercepts any errors that occur in the application and logs the details.
 * It sends a custom response based on the error status if available, or a generic 500 Internal Server Error response
 * otherwise.
 * The middleware also logs the operation ID if available for better traceability.
 *
 * @param {object} err - The error object, expected to contain at least a message and an optional status code.
 * @param {object} req - Express request object, potentially containing OpenAPI information (e.g., operationId).
 * @param {object} res - Express response object used to send the error response.
 * @param {Function} _next - Express next middleware function (unused but required for middleware signature).
 */
export default (err, req, res, _next) => {
  const operationId = req?.openapi?.schema?.operationId;

  if (err.status) {
    const title = operationId ? `[error] [${operationId}]` : '[error]';

    logger.error({ message: `${title}: ${err.message}`, error: err, operationId });
    responseHelper.custom(req, res, err.status, err.message);
    return;
  }

  const title = operationId ? `[Unexpected error] [${operationId}]` : '[Unexpected error]';

  logger.error({ message: `${title}: ${err.message}`, error: err, operationId });
  responseHelper.error(req, res);
};
