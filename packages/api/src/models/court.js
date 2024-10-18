import { DataTypes } from 'sequelize';

import postgres from '../lib/databases/postgres.js';
import Academy from './academy.js';

/**
 * Sequelize model for the "Court" entity.
 *
 * Represents a court in the RacketOnDeck platform. Each court is associated
 * with an academy and can store various details such as name, surface type,
 * indoor/outdoor status, sport type, and current status.
 *
 * @typedef {object} Court
 * @property {string} id - The unique identifier for the court, generated as UUID v4.
 * @property {Date} createdAt - The date when the court was created.
 * @property {Date} updatedAt - The date when the court was last updated.
 * @property {string} academyId - Foreign key that references the associated academy.
 * @property {string} name - The name of the court.
 * @property {string} surface - The type of surface of the court (e.g., Clay, Grass, Hard).
 * @property {boolean} isIndoor - Indicates if the court is indoor (true) or outdoor (false).
 * @property {string} sport - The sport that can be played on the court (e.g., Padel, Tennis).
 * @property {string} status - The current status of the court (e.g., occupied, available, maintenance).
 *
 * @returns {Model} Court - The Sequelize model for the "Court" table.
 */
const Court = postgres.define(
  'Court',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'id',
      description: 'The unique identifier for the court, generated as UUID v4.',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      description: 'The date and time when the court was created.',
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      description: 'The date and time when the court was last updated.',
      defaultValue: DataTypes.NOW,
    },
    academyId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      field: 'academy_id',
      description: 'Foreign key that references the academy associated with the court.',
      references: {
        model: Academy,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'name',
      description: 'The name of the court.',
    },
    surface: {
      type: DataTypes.ENUM,
      values: ['Clay', 'Grass', 'Hard', 'Carpet', 'Turf'],
      allowNull: false,
      field: 'surface',
      description: 'The type of surface of the court.',
    },
    isIndoor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_indoor',
      description: 'Indicates if the court is indoor (true) or outdoor (false).',
    },
    sport: {
      type: DataTypes.ENUM,
      values: ['Padel', 'Tennis', 'Squash', 'Badminton', 'Pickleball'],
      allowNull: false,
      field: 'sport',
      description: 'The sport that can be played on the court.',
    },
    status: {
      type: DataTypes.ENUM,
      values: ['occupied', 'available', 'maintenance'],
      allowNull: false,
      field: 'status',
      description: 'The current status of the court.',
    },
  },
  {
    tableName: 'courts',
    description:
      'Contains information about the courts available on the RacketOnDeck platform, including details about the surface, sport, and status.',
  },
);

export default Court;
