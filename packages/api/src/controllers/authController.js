import _ from 'lodash-es';
import validator from 'validator';

import errorCodes from '../constants/errorCodes.js';
import errorMessages from '../constants/errorMessages.js';
import cryptoHelper from '../helpers/cryptoHelper.js';
import responseHelper from '../helpers/responseHelper.js';
import userService from '../services/userService.js';

/**
 * Handler for POST /auth/login
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
const login = async (req, res) => {
  const payload = req.body;

  if (!validator.isEmail(payload.email)) {
    responseHelper.badRequest(req, res, errorMessages.INVALID_EMAIL_FORMAT, errorCodes.BAD_REQUEST);
    return;
  }

  let user = await userService.findByEmail(payload.email, { raw: true });
  if (!user) {
    responseHelper.notFound(req, res, errorMessages.EMAIL_NOT_FOUND, errorCodes.NOT_FOUND);
    return;
  }

  const isPasswordValid = await cryptoHelper.compare(payload.password, user.password);
  if (!isPasswordValid) {
    responseHelper.badRequest(req, res, errorMessages.INVALID_PASSWORD, errorCodes.BAD_REQUEST);
    return;
  }

  user = _.omit(user, 'password');
  const response = cryptoHelper.sign(user);
  responseHelper.ok(req, res, response);
};

export { login };
