import _ from 'lodash-es';
import { Op } from 'sequelize';

import User from '../models/user.js';

/**
 * Creates a new user in the database.
 *
 * @param {object} data - The data for the new user to be created.
 * @param {object} [params=null] - Additional options for the query.
 * @returns {Promise<object>} The created user object with plain data format.
 */
const create = async (data, params = null) => {
  let response = await User.create(data, { ...params });
  response = response.get({ plain: true });
  return _.omit(response, 'password');
};

/**
 * Retrieves a user by email from the database.
 *
 * @param {string} email - The email of the user to be retrieved.
 * @param {object} [params=null] - Additional options for the query.
 * @returns {Promise<object|null>} The user object if found, or null if not.
 */
const findByEmail = async (email, params = null) => {
  return User.findOne({ where: { email }, ...params });
};

/**
 * Retrieves a user by id from the database.
 *
 * @param {string} id - The id of the user to be retrieved.
 * @param {object} [params=null] - Additional options for the query.
 * @returns {Promise<object|null>} The user object if found, or null if not.
 */
const findById = async (id, params = null) => {
  return User.findOne({ where: { id }, ...params });
};

/**
 * Retrieves and counts users based on filters and pagination options.
 *
 * @param {object} filters - The filtering and pagination options.
 * @param {object} [params=null] - Additional options for the query, such as transaction or attributes.
 * @returns {Promise<object>} The result containing the count of users and the array of users.
 */
const findAndCountAll = async (filters, params = null) => {
  const { page, limit, find, order, accountId, type } = filters;

  let orderClause = [['name', 'ASC']];
  const offset = page * limit;
  const where = { accountId };

  if (!_.isNil(type)) {
    where.type = type;
  }

  if (!_.isNil(find)) {
    where[Op.or] = [{ name: { [Op.iLike]: `%${find}%` } }, { email: { [Op.iLike]: `%${find}%` } }];
  }

  if (order === 'z-a') {
    orderClause = [['name', 'DESC']];
  }

  return User.findAndCountAll({ where, order: orderClause, offset, limit, ...params });
};

/**
 * Updates an existing user in the database.
 *
 * @param {string} id - The ID of the user to be updated.
 * @param {object} data - The updated data for the user.
 * @param {object} [params=null] - Additional options for the update query.
 * @returns {Promise<object>} The updated user object, excluding the password.
 */
const update = async (id, data, params = null) => {
  const response = await User.update(data, { where: { id }, ...params });
  let user = response[1][0];
  return _.omit(user, 'password');
};

/**
 * Deletes a user from the database.
 *
 * @param {string} id - The ID of the user to be deleted.
 * @returns {Promise<void>} Resolves when the user has been successfully deleted.
 */
const remove = async (id) => {
  await User.destroy({ where: { id } });
};

export default { create, findByEmail, findById, findAndCountAll, update, remove };
