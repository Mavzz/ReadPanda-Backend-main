const express = require('express');
const bodyparser = require("body-parser");
const route = require("./Routes/routing");

const app = express();

app.use(bodyparser.json());

app.use((req, res, next) =>{
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("access-control-expose-headers", "Content-Type, Authorization");
  next();
})

app.use("/", route);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});