const express = require('express');
const bodyparser = require("body-parser");
const route = require("./Routes/routing");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(bodyparser.json());

app.use((req, res, next) =>{
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("access-control-expose-headers", "Content-Type, Authorization");
  next();
})

// Routes for API endpoints
app.use("/", route);

// Server listening on port 3000 for incoming requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});