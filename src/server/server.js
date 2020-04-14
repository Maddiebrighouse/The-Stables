const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const photo = require("./routes");

server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, "../../public")));

server.use("/api/v1/", photo);

module.exports = server;
