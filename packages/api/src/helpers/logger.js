import config from '../config/index.js';
import winston from 'winston';
const { combine, json, timestamp } = winston.format;

/**
 * Configures and creates a Winston logger instance.
 *
 * This module sets up a Winston logger using the log level defined in the
 * configuration file and formats the log output as JSON with timestamps.
 * The logs are output to the console.
 */
const logger = winston.createLogger({
	level: config.logLevel,
	format: combine(timestamp(), json()),
	transports: [new winston.transports.Console()],
});

export default logger;
