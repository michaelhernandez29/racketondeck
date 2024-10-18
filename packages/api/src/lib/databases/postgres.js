import Sequelize from 'sequelize';

import config from '../../config/index.js';
const postgresConfig = config.databases.sequelize;

/**
 * Initializes and configures a Sequelize instance for PostgreSQL database connection.
 *
 * @property {string} database - The name of the database to connect to.
 * @property {string} username - The username for database authentication.
 * @property {string} password - The password for database authentication.
 * @property {object} dbConfig - Additional configuration options for the Sequelize instance.
 */
const { database, username, password, ...dbConfig } = postgresConfig;
const postgres = new Sequelize(database, username, password, dbConfig);

export default postgres;
