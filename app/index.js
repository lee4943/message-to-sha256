// Core node modules
const https = require("https");
const fs = require("fs");

// Express-related modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Custom consts
const port = 5000;
const messageFunctions = require("./messageFunctions");

// Get certificate/key for HTTPS
const options = {
    cert: fs.readFileSync('./cert/localhost.crt'),
    key: fs.readFileSync('./cert/localhost.key')
};


//  Route handling
app.use(bodyParser.json());

app.post("/messages", messageFunctions.postMessage);

app.get("/messages/:hash", messageFunctions.getMessage);

// 404 catch-all middleware
app.use(function (req, res, next) {
    res.status(404).send('Not found!');
    console.log(`404 error - ${req.url}`);
  })

// Start server on previously-specified port
https.createServer(options, app).listen(port);
console.log(`Server listening on port ${port}`);