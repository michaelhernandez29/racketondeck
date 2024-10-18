import { DataTypes } from 'sequelize';

import postgres from '../lib/databases/postgres.js';
import Account from './account.js';
import User from './user.js';

/**
 * Sequelize model for the "AccountPermission" entity.
 *
 * Represents the permissions associated with a specific account for users in the RacketOnDeck platform.
 * Each permission entry links a user to an account and defines the level of access they have.
 *
 * @typedef {object} AccountPermission
 * @property {string} id - The unique identifier for the permissions entry, generated as UUID v4.
 * @property {Date} createdAt - The date and time when the permissions entry was created.
 * @property {Date} updatedAt - The date and time when the permissions entry was last updated.
 * @property {string} accountId - Foreign key referencing the account associated with the permission.
 * @property {string} userId - Foreign key referencing the user associated with the permission.
 * @property {string} permission - The level of access granted to the user (e.g., 'READ', 'WRITE', 'ADMIN').
 *
 * @returns {Model} AccountPermission - The Sequelize model for the "AccountPermission" table.
 */
const AccountPermission = postgres.define(
  'AccountPermission',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'id',
      description: 'The unique identifier for the permissions entry, generated as UUID v4.',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      description: 'The date and time when the permissions entry was created.',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      description: 'The date and time when the permissions entry was last updated.',
    },
    accountId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      field: 'account_id',
      description: 'Foreign key referencing the account associated with the permission.',
      references: {
        model: Account,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      field: 'user_id',
      description: 'Foreign key referencing the user associated with the permission.',
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    permission: {
      type: DataTypes.ENUM('READ', 'WRITE', 'ADMIN'),
      allowNull: false,
      field: 'permission',
      description: 'The level of access granted to the user (e.g., "READ", "WRITE", "ADMIN").',
    },
  },
  {
    tableName: 'accounts_permissions',
    description: 'Contains the permissions for users associated with specific accounts on the RacketOnDeck platform.',
  },
);

export default AccountPermission;
