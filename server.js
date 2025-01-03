import express from 'express';
import bodyParser from 'body-parser';
import routes from './Routes/routing.js';
import dotenv from 'dotenv';
import client from "./Database/config.js";
dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(bodyParser.json());

app.use((req, res, next) =>{
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("access-control-expose-headers", "Content-Type, Authorization");
  next();
})

// Connect to the database
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));


// Routes for API endpoints
app.use("/", routes);

// Server listening on port 3000 for incoming requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});