import { DataTypes } from 'sequelize';

import postgres from '../lib/databases/postgres.js';
import Account from './account.js';

/**
 * Sequelize model for the "Academy" entity.
 *
 * Represents a racket sport academy in the RacketOnDeck platform. Each academy is associated
 * with an account and can store various details such as name, description, and contact information.
 *
 * @typedef {object} Academy
 * @property {string} id - The unique identifier for the academy, generated as UUID v4.
 * @property {Date} createdAt - The date when the academy was created.
 * @property {Date} updatedAt - The date when the academy was last updated.
 * @property {string} accountId - Foreign key that references the associated account.
 * @property {string} name - The name of the academy.
 * @property {string} [description] - A short description of the academy (optional).
 * @property {string} [city] - The city where the academy is located (optional).
 * @property {string} [country] - The country where the academy is located (optional).
 * @property {string} [phoneNumber] - The contact phone number for the academy (optional).
 * @property {string} [email] - The email address for the academy (optional).
 * @property {string} [website] - The website URL for the academy (optional).
 * @property {string} [profilePicture] - URL to the academy’s profile picture (optional).
 * @property {boolean} enabled - Indicates whether the academy is active.
 *
 * @returns {Model} Academy - The Sequelize model for the "Academy" table.
 */
const Academy = postgres.define(
  'Academy',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'id',
      description: 'The unique identifier for the academy, generated as UUID v4.',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      description: 'The date and time when the academy was created.',
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      description: 'The date and time when the academy was last updated.',
      defaultValue: DataTypes.NOW,
    },
    accountId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      field: 'account_id',
      description: 'Foreign key that references the account associated with the academy.',
      references: {
        model: Account,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'name',
      description: 'The name of the academy.',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description',
      description: 'A short description of the academy.',
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'city',
      description: 'The city where the academy is located.',
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'country',
      description: 'The country where the academy is located.',
    },
    phoneNumber: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'phone_number',
      description: 'The contact phone number for the academy.',
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'email',
      description: 'The email address for the academy.',
    },
    website: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'website',
      description: 'The website URL for the academy.',
    },
    profilePicture: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'profile_picture',
      description: 'URL to the academy’s profile picture.',
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'enabled',
      description: 'Indicates whether the academy is currently active or disabled.',
    },
  },
  {
    tableName: 'academies',
    description:
      'Contains information about the racket sports academies on the RacketOnDeck platform, including contact details, location, and status.',
  },
);

export default Academy;
