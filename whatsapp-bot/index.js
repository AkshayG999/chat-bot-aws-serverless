const serverless = require("serverless-http");
const express = require("express");
const body_parser = require("body-parser")
const app = express().use(body_parser.json());
const cors = require('cors')

require('dotenv').config()

console.log("server started")

app.use(cors())
app.use('/', require('./routes/route'))
// app.get("/", (req, res, next) => {
//   return res.status(200).json({
//     message: "Hello from root!",
//   });
// });

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports = { app };
