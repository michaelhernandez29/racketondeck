import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config/index.js';
const { crypto: cryptoConfig } = config;

/**
 * Generates a hash for the provided text using bcrypt.
 *
 * @param {string} text - The text to hash.
 * @returns {Promise<string>} A promise that resolves with the hashed text.
 */
const hash = async (text) => {
	return bcrypt.hash(text, cryptoConfig.saltRounds);
};

/**
 * Compares a plain text with a hashed text to see if they match.
 *
 * @param {string} plainText - The plain text to compare.
 * @param {string} hash - The hashed text to compare against.
 * @returns {Promise<boolean>} A Promise resolving to a boolean indicating whether the texts match.
 */
const compare = async (plainText, hash) => {
	return bcrypt.compare(plainText, hash);
};

/**
 * Signs the given data into a JWT.
 *
 * @param {object} data - The data to be included in the JWT payload.
 * @returns {Promise<string>} A Promise resolving to the signed JWT.
 */
const sign = async (data) => {
	return jwt.sign(data, cryptoConfig.privateKey, { expiresIn: cryptoConfig.expiresIn });
};

export default { hash, compare, sign };
