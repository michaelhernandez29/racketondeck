import { DataTypes } from 'sequelize';

import featureCodes from '../constants/featureCodes.js';
import postgres from '../lib/databases/postgres.js';

/**
 * Sequelize model for the "Feature" entity.
 *
 * Represents a feature in the RacketOnDeck platform. Each feature is identified by a unique UUID
 * and includes information such as the creation date, update date, and its associated code.
 *
 * @typedef {object} Feature
 * @property {string} id - The unique identifier for the feature, generated as UUID v4.
 * @property {Date} createdAt - The date and time when the feature was created.
 * @property {Date} updatedAt - The date and time when the feature was last updated.
 * @property {string} code - The code representing the specific feature, constrained to predefined values.
 *
 * @returns {Model} Feature - The Sequelize model for the "Feature" table.
 */
const Feature = postgres.define(
  'Feature',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'id',
      description: 'The unique identifier for the feature, generated as UUID v4.',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      description: 'The date and time when the feature was created.',
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      description: 'The date and time when the feature was last updated.',
      defaultValue: DataTypes.NOW,
    },
    code: {
      type: DataTypes.ENUM,
      values: Object.values(featureCodes),
      allowNull: false,
      field: 'code',
      description: 'The code representing the specific feature, constrained to predefined values.',
    },
  },
  {
    tableName: 'features',
    description: 'Contains information about features available on the RacketOnDeck platform.',
  },
);

export default Feature;
