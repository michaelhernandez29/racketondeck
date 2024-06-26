import applicationService from '../services/applicationService.js';
import errorMessages from '../constants/errorMessages.js';
import eventService from '../services/eventService.js';
import responseHelper from '../helpers/responseHelper.js';

/**
 * Handler for POST /applications/{applicationId}/events
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const create = async (req, res) => {
  const { applicationId } = req.params;
  const payload = req.body;
  const requestUser = req._user;

  const application = await applicationService.findById(requestUser.accountId, applicationId);
  if (!application) {
    responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND);
    return;
  }

  const response = await eventService.create({ applicationId, ...payload });
  responseHelper.created(res, response);
};

/**
 * Handler for GET /applications/{applicationId}/events
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const findAndCountAll = async (req, res) => {
  const { applicationId } = req.params;
  const filters = req.query;
  const requestUser = req._user;

  const application = await applicationService.findById(requestUser.accountId, applicationId);
  if (!application) {
    responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND);
    return;
  }

  const response = await eventService.findAndCountAll({ applicationId, ...filters });
  responseHelper.ok(res, response.rows, response.count);
};

/**
 * Handler for GET /applications/{applicationId}/events/{eventId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const findById = async (req, res) => {
  const { applicationId, eventId } = req.params;
  const requestUser = req._user;

  const application = await applicationService.findById(requestUser.accountId, applicationId);
  if (!application) {
    responseHelper.notFound(res, errorMessages.APPLICATION_NOT_FOUND);
    return;
  }

  const response = await eventService.findById(eventId);
  if (!response) {
    responseHelper.notFound(res, errorMessages.EVENT_NOT_FOUND);
    return;
  }

  responseHelper.ok(res, response);
};
