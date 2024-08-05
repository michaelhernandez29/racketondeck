import { DataTypes } from 'sequelize';
import dbPostgres from '../lib/databases/dbPostgres.js';

/**
 * Defines the account model for Sequelize.
 *
 * @property {string} id - The unique identifier of the account.
 * @property {date} createdAt - The creation date of the account.
 * @property {date} updatedAt - The last update date of the account.
 * @property {boolean} enabled - Indicates whether the account is enabled.
 */
const account = dbPostgres.define(
	'account',
	{
		id: {
			type: DataTypes.UUIDV4,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			field: 'id',
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'created_at',
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'updated_at',
		},
		enabled: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
			field: 'enabled',
		},
	},
	{
		tableName: 'accounts',
	},
);

export default account;
