import errorCodes from '../constants/errorCodes.js';
import errorMessages from '../constants/errorMessages.js';
import responseHelper from '../helpers/responseHelper.js';
import academyService from '../services/academyService.js';
import accountService from '../services/accountService.js';

/**
 * Handler for POST /accounts/{accountId}/academies
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
const create = async (req, res) => {
  const { accountId } = req.params;
  const payload = req.body;

  const account = await accountService.findById(accountId, { raw: true });
  if (!account) {
    responseHelper.notFound(req, res, errorMessages.ACCOUNT_NOT_FOUND, errorCodes.ACCOUNT_NOT_FOUND);
    return;
  }

  const data = { accountId, ...payload };
  const response = await academyService.create(data);
  responseHelper.created(req, res, response);
};

/**
 * Handler for GET /accounts/{accountId}/academies
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
const findAndCountAll = async (req, res) => {
  const { accountId } = req.params;
  const queries = req.query;

  const account = await accountService.findById(accountId, { raw: true });
  if (!account) {
    responseHelper.notFound(req, res, errorMessages.ACCOUNT_NOT_FOUND, errorCodes.ACCOUNT_NOT_FOUND);
    return;
  }

  const filters = { accountId, ...queries };
  const response = await academyService.findAndCountAll(filters, { raw: true });
  responseHelper.ok(req, res, response.rows, response.count);
};

/**
 * Handler for GET /accounts/{accountId}/academies/{academyId}
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
const findById = async (req, res) => {
  const { accountId, academyId } = req.params;

  const account = await accountService.findById(accountId, { raw: true });
  if (!account) {
    responseHelper.notFound(req, res, errorMessages.ACCOUNT_NOT_FOUND, errorCodes.ACCOUNT_NOT_FOUND);
    return;
  }

  const academy = await academyService.findById(academyId, { raw: true });
  if (!academy) {
    responseHelper.notFound(req, res, errorMessages.ACADEMY_NOT_FOUND, errorCodes.ACADEMY_NOT_FOUND);
    return;
  }

  responseHelper.ok(req, res, academy);
};

/**
 * Handler for PUT /accounts/{accountId}/academies/{academyId}
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
const update = async (req, res) => {
  const { accountId, academyId } = req.params;
  const payload = req.body;

  const account = await accountService.findById(accountId, { raw: true });
  if (!account) {
    responseHelper.notFound(req, res, errorMessages.ACCOUNT_NOT_FOUND, errorCodes.ACCOUNT_NOT_FOUND);
    return;
  }

  const academy = await academyService.findById(academyId, { raw: true });
  if (!academy) {
    responseHelper.notFound(req, res, errorMessages.ACADEMY_NOT_FOUND, errorCodes.ACADEMY_NOT_FOUND);
    return;
  }

  const response = await academyService.update(academyId, payload, { raw: true, returning: true });
  responseHelper.ok(req, res, response);
};

/**
 * Handler for DELETE /accounts/{accountId}/academies/{academyId}
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
const remove = async (req, res) => {
  const { accountId, academyId } = req.params;

  const account = await accountService.findById(accountId, { raw: true });
  if (!account) {
    responseHelper.notFound(req, res, errorMessages.ACCOUNT_NOT_FOUND, errorCodes.ACCOUNT_NOT_FOUND);
    return;
  }

  const academy = await academyService.findById(academyId, { raw: true });
  if (!academy) {
    responseHelper.notFound(req, res, errorMessages.ACADEMY_NOT_FOUND, errorCodes.ACADEMY_NOT_FOUND);
    return;
  }

  await academyService.remove(academyId);
  responseHelper.noContent(req, res);
};

export { create, findAndCountAll, findById, remove, update };
