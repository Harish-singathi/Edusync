const express = require("express");
const jsonServer = require("json-server");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve HTML, CSS and JS files
app.use(express.static(__dirname));

// JSON Server
const router = jsonServer.router("db.json");

app.use(router);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`EduSync running on port ${PORT}`);
});