import { DataTypes } from 'sequelize';

import roleTypes from '../constants/roleTypes.js';
import postgres from '../lib/databases/postgres.js';
import Account from './account.js';

/**
 * Sequelize model for the "User" entity.
 *
 * Represents a user in the RacketOnDeck platform. Each user is associated with an account,
 * and can have various roles such as PLAYER, MANAGER, or INSTRUCTOR. Users have associated
 * personal information such as email, password, and contact details.
 *
 * @typedef {object} User
 * @property {string} id - The unique identifier for the user, generated as UUID v4.
 * @property {string} accountId - Foreign key that references the associated account.
 * @property {Date} createdAt - The date and time when the user was created.
 * @property {Date} updatedAt - The date and time when the user was last updated.
 * @property {string} name - The name of the user or the academy being registered.
 * @property {string} email - The email address for the user, used for login and notifications.
 * @property {string} password - The user's password, stored securely in an encrypted format.
 * @property {string} type - The role or type of the user in the platform (e.g., PLAYER, MANAGER, INSTRUCTOR).
 * @property {string} [phoneNumber] - The contact phone number for the user (optional).
 * @property {string} [profilePicture] - URL to the user's profile picture (optional).
 * @property {boolean} enabled - Indicates whether the user account is active or disabled.
 *
 * @returns {Model} User - The Sequelize model for the "User" table.
 */
const User = postgres.define(
  'User',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'id',
      description: 'Unique identifier for the user, generated automatically as a UUID v4.',
    },
    accountId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      field: 'account_id',
      description: 'Foreign key that references the account associated with the user.',
      references: {
        model: Account,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      description: 'The date and time when the user was created.',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      description: 'The date and time when the user was last updated.',
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'name',
      description: 'The name of the user or the academy being registered.',
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'email',
      description: 'The email address of the user, used for login and notifications.',
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'password',
      description: 'The user’s password, stored securely in an encrypted format.',
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(roleTypes),
      allowNull: false,
      field: 'role',
      description: 'The role or type of the user in the platform, such as PLAYER, MANAGER, or INSTRUCTOR.',
    },
    phoneNumber: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'phone_number',
      description: 'The contact phone number for the user, if provided.',
    },
    profilePicture: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'profile_picture',
      description: 'URL to the user’s profile picture.',
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'enabled',
      description: 'Indicates whether the user account is active or disabled.',
    },
  },
  {
    tableName: 'users',
    description:
      'Contains information about the users of the RacketOnDeck platform, including their roles, contact details, and account status.',
  },
);

export default User;
