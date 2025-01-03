import express from 'express';
import { createUser, loginUser } from "../Controller/users.js";

const routing = express.Router();

routing.post("/signup", createUser);

routing.get("/auth/login", loginUser);


export default routing;