const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("App is running");
});

app.listen(3000, () => {
  console.log("Server Started on Port 3000");
});
