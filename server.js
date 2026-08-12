const express = require("express");
const jsonServer = require("json-server");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const dbFile = path.join(__dirname, "db.json");

const router = jsonServer.router(dbFile);
const middlewares = jsonServer.defaults();

app.use(middlewares);

app.use(express.static(__dirname));

app.use(router);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`EduSync running on port ${PORT}`);
});