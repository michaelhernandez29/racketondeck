import _ from 'lodash-es';
import errorCodes from '../constants/errorCodes.js';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

/**
 * Sends a successful response with optional data and count.
 *
 * @param {object} res - Express response object.
 * @param {object?} data - Data to include in the response body.
 * @param {number?} count - Count of items (e.g., for pagination).
 */
const ok = (res, data = null, count = null) => {
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

	res.status(response.statusCode).json(response);
};

/**
 * Sends a response indicating successful creation with data.
 *
 * @param {object} res - Express response object.
 * @param {object} data - Data to include in the response body.
 */
const created = (res, data) => {
	const response = {
		statusCode: StatusCodes.CREATED,
		message: ReasonPhrases.CREATED,
		data,
	};

	res.status(response.statusCode).json(response);
};

/**
 * Sends a response indicating a bad request with optional message and error code.
 *
 * @param {object} res - Express response object.
 * @param {string?} [message=ReasonPhrases.BAD_REQUEST] - Message describing the error.
 * @param {string?} [errorCode=errorCodes.BAD_REQUEST] - Error code for identification.
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
 * Sends a response indicating unauthorized access with optional message and error code.
 *
 * @param {object} res - Express response object.
 * @param {string?} [message=ReasonPhrases.UNAUTHORIZED] - Message describing the error.
 * @param {string?} [errorCode=errorCodes.UNAUTHORIZED] - Error code for identification.
 */
const unAuthorized = (res, message = ReasonPhrases.UNAUTHORIZED, errorCode = errorCodes.UNAUTHORIZED) => {
	const response = {
		statusCode: StatusCodes.UNAUTHORIZED,
		message,
		errorCode,
	};

	res.status(response.statusCode).json(response);
};

/**
 * Sends a response indicating forbidden access with optional message and error code.
 *
 * @param {object} res - Express response object.
 * @param {string?} [message=ReasonPhrases.FORBIDDEN] - Message describing the error.
 * @param {string?} [errorCode=errorCodes.FORBIDDEN] - Error code for identification.
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
 * Sends a response indicating resource not found with optional message and error code.
 *
 * @param {object} res - Express response object.
 * @param {string?} [message=ReasonPhrases.NOT_FOUND] - Message describing the error.
 * @param {string?} [errorCode=errorCodes.NOT_FOUND] - Error code for identification.
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
 * Sends a response indicating conflict with optional message and error code.
 *
 * @param {object} res - Express response object.
 * @param {string?} [message=ReasonPhrases.CONFLICT] - Message describing the error.
 * @param {string?} [errorCode=errorCodes.CONFLICT] - Error code for identification.
 */
const conflict = (res, message = ReasonPhrases.CONFLICT, errorCode = errorCodes.CONFLICT) => {
	const response = {
		statusCode: StatusCodes.CONFLICT,
		message,
		errorCode,
	};

	res.status(response.statusCode).json(response);
};

export default { ok, created, badRequest, unAuthorized, forbidden, notFound, conflict };
