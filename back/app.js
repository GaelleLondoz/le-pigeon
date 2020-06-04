const express = require("express");
const jwt = require("jsonwebtoken");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");

const app = express();
const apiRoutes = require("./routes/api");

app.use(cors());
//Folder images uploaded
app.use(express.static("storage"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use("/api", apiRoutes);

module.exports = app;
