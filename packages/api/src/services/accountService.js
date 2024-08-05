import account from '../models/account.js';
import dbPostgres from '../lib/databases/dbPostgres.js';
import logger from '../helpers/logger.js';
import user from '../models/user.js';

/**
 * Creates a new account and associated user.
 *
 * This function starts a transaction to ensure that both the account and user are created
 * atomically. If an error occurs during the process, the transaction is rolled back.
 *
 * @param {object} data - The user data to be associated with the new account.
 * @param {string} data.name - The name of the user.
 * @param {string} data.email - The email address of the user.
 * @param {string} data.password - The password of the user.
 * @param {string} data.roleType - The role of the user.
 * @param {string} data.userType - The type of the user.
 * @param {string} [data.image] - The image URL of the user. This field is optional.
 * @param {boolean} [data.enabled=true] - Indicates whether the user account is enabled.
 * @returns {Promise<object>} The newly created account object.
 * @throws {Error} Throws an error if unable to create the account or user.
 */
const create = async (data) => {
	const transaction = await dbPostgres.transaction();

	try {
		const newAccount = await account.create({}, { transaction });
		const userData = { accountId: newAccount.id, ...data };
		await user.create(userData, { transaction });

		await transaction.commit();
		return newAccount.get({ plain: true });
	} catch (error) {
		logger.error({ message: '[accountService.create] Unexpected error creating account', data, error });
		await transaction.rollback();
	}
};

export default { create };
