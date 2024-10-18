import { DataTypes } from 'sequelize';

import accountTypes from '../constants/accountTypes.js';
import postgres from '../lib/databases/postgres.js';

/**
 * Sequelize model for the "Account" entity.
 *
 * Represents an account on the RacketOnDeck platform, which could be either for an individual user
 * or a racket sport academy. Each account has a unique UUID as its primary identifier, along with essential
 * fields such as name, email, and password.
 *
 * @typedef {object} Account
 * @property {string} id - The unique identifier for the account, generated as UUID v4.
 * @property {Date} createdAt - The date when the account was created.
 * @property {Date} updatedAt - The date when the account was last updated.
 * @property {string} name - The name of the account owner, whether a person or an academy.
 * @property {boolean} enabled - Indicates whether the account is active.
 * @property {string} type - The payment plan associated with the account.
 *
 * @returns {Model} Account - The Sequelize model for the "Account" table.
 */
const Account = postgres.define(
  'Account',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'id',
      description: 'The unique identifier for the account, generated as UUID v4.',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      description: 'The date and time when the account was created.',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      description: 'The date and time when the account was last updated.',
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'name',
      description: 'The name of the account owner, whether an individual or an academy.',
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'enabled',
      description: 'Indicates whether the account is currently active or disabled.',
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.values(accountTypes),
      allowNull: false,
      field: 'type',
      description: 'The payment plan for the account, which can be free, pro, or premium.',
    },
  },
  {
    tableName: 'accounts',
    description: 'Contains information about accounts registered on the RacketOnDeck platform.',
  },
);

export default Account;
