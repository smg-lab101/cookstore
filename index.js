const express = require("express");
const server = express();
const port = 3002;

server.get("/hello", function (req, res) {
    res.send("Hello CookStore!");
});

server.get("/", function(req, res) {
    res.redirect("/hello");
});

server.listen(port, function () {
    console.log("Express listening on " + port);
});