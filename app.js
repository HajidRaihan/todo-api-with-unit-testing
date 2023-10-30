const express = require("express");
const app = express();
const router = require("./router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

if (process.env.NODE_ENV != "test") {
  const server = app.listen(3003);
}

module.exports = app;
