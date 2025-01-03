import bcrypt from 'bcrypt';

/**
 * Encrypts a password using bcrypt.
 * @param {string} password - The password to encrypt.
 * @returns {Promise<string>} - The encrypted password.
 */
export const cryptPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

/**
 * Decrypts a password using bcrypt.
 * @param {string} password - The password to decrypt.
 * @param {string} hash - The hash to compare against.
 * @returns {Promise<boolean>} - Whether the password matches the hash.
 */
export const decryptPassword = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};