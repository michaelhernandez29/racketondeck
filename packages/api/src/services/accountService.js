import errorMessages from '../constants/errorMessages.js';
import permissionTypes from '../constants/permissionTypes.js';
import roleTypes from '../constants/roleTypes.js';
import logger from '../helpers/logger.js';
import postgres from '../lib/databases/postgres.js';
import Account from '../models/account.js';
import AccountPermission from '../models/accountPermission.js';
import userService from './userService.js';

/**
 * Assigns permissions to a user for an account.
 *
 * @private
 * @param {string} accountId - The unique identifier of the account.
 * @param {string} userId - The unique identifier of the user.
 * @param {object} transaction - The transaction object.
 * @returns {Promise<void>} - Resolves when permissions are created.
 */
const _assignPermissions = async (accountId, userId, transaction) => {
  const permissions = [
    { accountId, userId, permission: permissionTypes.ADMIN },
    { accountId, userId, permission: permissionTypes.WRITE },
    { accountId, userId, permission: permissionTypes.READ },
  ];
  await AccountPermission.bulkCreate(permissions, { transaction });
};

/**
 * Creates a new account and user in the database within a transaction.
 *
 * @param {object} data - The data required to create the account and user.
 * @param {string} data.name - The name of the account to be created.
 * @param {string} data.email - The email of the user associated with the account.
 * @param {string} data.password - The password for the user.
 * @returns {Promise<object>} - The created account data as a plain object.
 * @throws {Error} - Throws an error if the transaction fails.
 */
const create = async (data) => {
  const transaction = await postgres.transaction();

  try {
    const accountData = { name: data.name, type: data.type };
    const account = await Account.create(accountData, { transaction });

    const userData = {
      accountId: account.id,
      role: roleTypes.OWNER,
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const user = await userService.create(userData, { transaction });

    await _assignPermissions(account.id, user.id, transaction);
    await transaction.commit();
    return account.get({ plain: true });
  } catch (error) {
    await transaction.rollback();

    logger.error({ message: errorMessages.ACCOUNT_CREATION_FAILED, error });
    throw new Error(errorMessages.ACCOUNT_CREATION_FAILED);
  }
};

/**
 * Finds an account by its ID in the database.
 *
 * @param {string} id - The unique identifier of the account.
 * @param {object} [params=null] - Additional query options for finding the account.
 * @returns {Promise<object|null>} - The account data if found, or null if not.
 */
const findById = async (id, params = null) => {
  return Account.findOne({ where: { id }, ...params });
};

export default { create, findById };
