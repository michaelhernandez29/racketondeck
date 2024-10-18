import validator from 'validator';

import errorCodes from '../constants/errorCodes.js';
import errorMessages from '../constants/errorMessages.js';
import cryptoHelper from '../helpers/cryptoHelper.js';
import responseHelper from '../helpers/responseHelper.js';
import accountService from '../services/accountService.js';
import userService from '../services/userService.js';

/**
 * Handler for POST /accounts
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
const create = async (req, res) => {
  const payload = req.body;

  if (!validator.isEmail(payload.email)) {
    responseHelper.badRequest(req, res, errorMessages.INVALID_EMAIL_FORMAT, errorCodes.BAD_REQUEST);
    return;
  }

  const user = await userService.findByEmail(payload.email, { raw: true });
  if (user) {
    responseHelper.conflict(req, res, errorMessages.DUPLICATE_EMAIL, errorCodes.CONFLICT);
    return;
  }

  payload.password = await cryptoHelper.hash(payload.password);
  const response = await accountService.create(payload);

  responseHelper.created(req, res, response);
};

export { create };
