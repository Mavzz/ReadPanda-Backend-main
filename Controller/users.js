import client from '../Database/config.js';
import { cryptPassword, decryptPassword } from '../Utilities/helper.js';
import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

/**
 * Get all users from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getUsers = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create a new user in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // Check if user already exists
    const userCheck = await client.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (userCheck.rows.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Decrypt the password
    const bytes = CryptoJS.AES.decrypt(password, process.env.CRYPTO_SECRET);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    // Insert new user
    const hashedPassword = cryptPassword(decryptedPassword);

    const result = await client.query(
      "INSERT INTO users (username, password, email, isactive) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, hashedPassword, email, true]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Log in a user and generate a JWT token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {

    // Decrypt the password
    const bytes = CryptoJS.AES.decrypt(password, process.env.CRYPTO_SECRET);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    // Check if user exists
    const userCheck = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (userCheck.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = userCheck.rows[0];

    // Verify password
    const isPasswordValid = decryptPassword(decryptedPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET is not defined" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
