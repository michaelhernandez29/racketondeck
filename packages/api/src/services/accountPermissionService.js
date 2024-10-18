import AccountPermission from '../models/accountPermission.js';

/**
 * Creates a new account permission in the database.
 *
 * @param {object} data - The data for the new account permission.
 * @returns {Promise<object>} A promise that resolves to the created account permission object in plain format.
 */
const create = async (data) => {
  const response = await AccountPermission.create(data);
  return response.get({ plain: true });
};

/**
 * Finds an account permission by the user ID.
 *
 * @param {string} id - The unique identifier (UUID) of the user.
 * @param {object} [params=null] - Additional query parameters for the search.
 * @returns {Promise<object|null>} A promise that resolves to the found account permission object or null if not found.
 */
const findAndCountAllByUserId = async (id, params = null) => {
  return AccountPermission.findAndCountAll({ where: { id }, ...params });
};

/**
 * Deletes an account permission from the database.
 *
 * @param {string} id - The ID of the account permission to be deleted.
 * @returns {Promise<void>} Resolves when the account permission has been successfully deleted.
 */
const remove = async (id) => {
  await AccountPermission.destroy({ where: { id } });
};

export default { create, findAndCountAllByUserId, remove };
