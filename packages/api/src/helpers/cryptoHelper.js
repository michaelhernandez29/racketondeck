import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config/config.js';
const bcryptConfig = config.crypto.bcrypt;
const jwtConfig = config.crypto.jwt;

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
const hash = async (password) => {
  return bcrypt.hash(password, bcryptConfig.saltRounds);
};

/**
 * Compares a plain text password with a hashed password.
 * @param {string} password - The plain text password to compare.
 * @param {string} hash - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to true if the passwords match, false otherwise.
 */
const compare = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

/**
 * Generates a JWT token with the given payload.
 * @param {object} payload - The payload to be encoded in the token.
 * @returns {string} The generated JWT token.
 */
const generateToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {object} The decoded payload if the token is valid.
 * @throws {Error} If the token is invalid or expired.
 */
const verifyToken = async (token) => {
  return jwt.verify(token, jwtConfig.secret);
};

export default { hash, compare, generateToken, verifyToken };
