import express from 'express';
import { createUser, loginUser, getUsers } from "../Controller/users.js";
import { getUserPreferences, updateUserPreferences } from "../Controller/user_preferences.js";

const router = express.Router();

// Route to get all users
router.get('/users', getUsers);

// Route to create a new user
router.post("/signup", createUser);

// Route to login a user
router.post("/auth/login", loginUser);

// Get user preferences
router.get("/user/preferences", getUserPreferences);

router.post("/user/preferences", updateUserPreferences);

export default router;