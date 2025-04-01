// testServer.js
const express = require("express");
const app = express();
app.use(express.json());

// Import API routes without calling .listen() or triggering other scripts
require("./api").setApp(app);

module.exports = app;
