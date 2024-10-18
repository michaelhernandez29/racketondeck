import _ from 'lodash-es';
import { Op } from 'sequelize';

import Academy from '../models/academy.js';

/**
 * Creates a new academy in the database.
 *
 * @param {object} data - The data to create the academy, including fields such as name, accountId, and other details.
 * @returns {Promise<object>} The plain object representation of the created academy.
 */
const create = async (data) => {
  const response = await Academy.create(data);
  return response.get({ plain: true });
};

/**
 * Retrieves a academy by id from the database.
 *
 * @param {string} id - The id of the academy to be retrieved.
 * @param {object} [params=null] - Additional options for the query.
 * @returns {Promise<object|null>} The academy object if found, or null if not.
 */
const findById = async (id, params = null) => {
  return Academy.findOne({ where: { id }, ...params });
};

/**
 * Finds and counts academies based on provided filters and pagination options.
 *
 * @param {object} filters - The filters and pagination options to apply.
 * @param {object} [params=null] - Additional query options such as transaction or attributes.
 * @returns {Promise<object>} An object containing the total count of academies and the array of academies.
 */
const findAndCountAll = async (filters, params = null) => {
  const { page, limit, find, order, accountId } = filters;

  let orderClause = [['name', 'ASC']];
  const offset = page * limit;
  const where = { accountId };

  if (!_.isNil(find)) {
    where[Op.or] = [{ name: { [Op.iLike]: `%${find}%` } }];
  }

  if (order === 'z-a') {
    orderClause = [['name', 'DESC']];
  }

  return Academy.findAndCountAll({ where, order: orderClause, offset, limit, ...params });
};

/**
 * Updates an existing academy in the database.
 *
 * @param {string} id - The ID of the academy to be updated.
 * @param {object} data - The updated data for the academy.
 * @param {object} [params=null] - Additional options for the update query.
 * @returns {Promise<object>} The updated academy object.
 */
const update = async (id, data, params = null) => {
  const response = await Academy.update(data, { where: { id }, ...params });
  return response[1][0];
};

/**
 * Deletes an academy from the database.
 *
 * @param {string} id - The ID of the academy to be deleted.
 * @returns {Promise<void>} Resolves when the academy has been successfully deleted.
 */
const remove = async (id) => {
  await Academy.destroy({ where: { id } });
};

export default { create, findById, findAndCountAll, update, remove };
