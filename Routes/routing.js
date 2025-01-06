import express from 'express';
import { createUser, loginUser, getUsers } from "../Controller/users.js";

const router = express.Router();

// Route to get all users
router.get('/users', getUsers);

// Route to create a new user
router.post("/signup", createUser);

// Route to login a user
router.post("/auth/login", loginUser);

export default router;