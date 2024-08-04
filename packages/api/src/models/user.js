import { DataTypes } from 'sequelize';
import dbPostgres from '../lib/databases/dbPostgres.js';

/**
 * Defines the user model for Sequelize.
 *
 * @property {string} id - The unique identifier of the user.
 * @property {date} createdAt - The creation date of the user.
 * @property {date} updatedAt - The last update date of the user.
 * @property {string} accountId - The foreign key referencing the account.
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} roleType - The role of the user.
 * @property {string} userType - The type of the user.
 * @property {string} [image] - The image URL of the user. This field is optional.
 * @property {boolean} enabled - Indicates whether the user account is enabled.
 */
const user = dbPostgres.define(
	'user',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
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
		accountId: {
			type: DataTypes.UUID,
			allowNull: false,
			field: 'account_id',
			references: {
				model: 'accounts',
				key: 'id',
			},
			onDelete: 'CASCADE',
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'name',
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
			field: 'email',
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'password',
		},
		roleType: {
			type: DataTypes.ENUM('ACCOUNT_OWNER', 'ACCOUNT_ADMIN', 'APPLICATION_USER'),
			allowNull: false,
			field: 'role_type',
		},
		userType: {
			type: DataTypes.ENUM('MANAGER', 'INSTRUCTOR', 'PLAYER'),
			allowNull: false,
			field: 'user_type',
		},
		image: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'image',
		},
		enabled: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
			field: 'enabled',
		},
	},
	{
		tableName: 'users',
	},
);

export default user;
