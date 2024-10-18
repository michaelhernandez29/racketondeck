import logger from '../helpers/logger.js';
import responseHelper from '../helpers/responseHelper.js';

/**
 * Middleware to handle errors and send appropriate responses.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {Function} _next - The next middleware function.
 */
export default (err, req, res, _next) => {
  const operationId = req?.openapi?.schema?.operationId;

  if (err.status) {
    const title = operationId ? `[error] [${operationId}]` : '[error]';

    logger.error({
      message: `${title}: ${err.message}`,
      error: err,
      operationId,
    });

    responseHelper.custom(req, res, err.status, err.message);
    return;
  }

  const title = operationId ? `[Unexpected error] [${operationId}]` : '[Unexpected error]';

  logger.error({
    message: `${title}: ${err.message}`,
    error: err,
    operationId,
  });

  responseHelper.error(req, res);
};
