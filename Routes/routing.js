const express = require("express");


const routing = express.Router();
const users = require("../Controller/users");

routing.post("/signup", users.signUp);

routing.get("/auth/login", users.loginCheck);


module.exports = routing;