import user from '../models/user.js';

/**
 * Creates a new user.
 *
 * @param {object} data - The data for the new user.
 * @returns {Promise<object>} A promise that resolves to the newly created user object in plain format.
 * @throws {Error} Throws an error if the creation fails.
 */
const create = async (data) => {
	const response = await user.create(data);
	return response.get({ plain: true });
};

/**
 * Finds a user by their email address.
 *
 * @param {string} email - The email address of the user to find.
 * @param {object} [params] - Additional query parameters to customize the search.
 * @param {object} [params.attributes] - An array of attributes to be selected.
 * @param {object} [params.include] - Associations to be included in the result.
 * @param {object} [params.order] - Specifies the order of the results.
 * @returns {Promise<object|null>} A promise that resolves to the user object if found, or `null` if no user matches the email.
 * @throws {Error} Throws an error if the query fails.
 */
const findByEmail = async (email, params) => {
	return user.findOne({ where: { email }, ...params });
};

export default { create, findByEmail };
