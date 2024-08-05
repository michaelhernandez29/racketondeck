import _ from 'lodash-es';
import errorCodes from '../constants/errorCodes.js';
import errorMessages from '../constants/errorMessages.js';
import responseHelper from '../helpers/responseHelper.js';
import userService from '../services/userService.js';
import validator from 'validator';

/**
 * Handler for POST /accounts/{accountId}/users
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const create = async (req, res) => {
	const { accountId } = req.params;
	const payload = req.body;

	if (!validator.isEmail(payload.email)) {
		responseHelper.badRequest(res, errorMessages.EMAIL_FORMAT_INVALID);
		return;
	}

	const user = await userService.findByEmail(payload.email, { raw: true });
	if (user) {
		responseHelper.conflict(res, errorMessages.EMAIL_ALREADY_EXISTS, errorCodes.CONFLICT);
		return;
	}

	let response = await userService.create({ accountId, ...payload });
	response = _.omit(response, 'password');
	responseHelper.created(res, response);
};

export { create };
