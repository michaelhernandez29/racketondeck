import logger from '../../helpers/logger.js';
import sequelize from 'sequelize';

import config from '../../config/index.js';
const postgresConfig = config.databases.postgres;

/**
 * Initializes a new Sequelize instance for the PostgreSQL database.
 */
const dbPostgres = new sequelize(postgresConfig.name, postgresConfig.username, postgresConfig.password, {
	host: postgresConfig.host,
	dialect: 'postgres',
	logging: false,
});

export default dbPostgres;
