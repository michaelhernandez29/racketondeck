import winston from 'winston';

import config from '../config/index.js';
const winstonConfig = config.winston;

/**
 * Creates a Winston logger instance configured to log messages to both console and files.
 *
 * The logger is configured to:
 * - Log messages to the console with colorized output.
 * - Log error messages to `error.log`.
 * - Log all messages to `combined.log`.
 *
 * The log level and other configurations are read from the application's configuration file.
 */
const logger = winston.createLogger({
  level: winstonConfig.level,
  format: winston.format.combine(winston.format.json()),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export default logger;
