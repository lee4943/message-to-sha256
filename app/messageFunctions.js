const crypto = require("crypto");

let messages = {};  // in-memory data store for message/hash pairs

function postMessage(req, res) {
    console.log("Receiving posted message");

    // Retrieve message and generate SHA-256 hash of the message
    let message = req.body.message;
    let hash = crypto.createHash("sha256").update(message).digest("hex");

    // Add hash/message to in-memory data store
    messages[hash] = message;

    // Create/send response object
    let responseObject = {};
    responseObject.digest = hash;
    res.status(201).json(responseObject);
    console.log("Digest response sent");
}

function getMessage(req, res, next) {
    console.log("Attempting to retrieve message from hash")

    // Retrieve request-provided hash and 'query' in-memory data store for associated message
    let hash = req.params.hash;
    let origMessage = messages[hash];

    // if a message was retrieved, send it to the client
    // if no message was retrieved (origMessage == undefined), pass to next middleware 
    if(origMessage) {
        let responseObject = {};
        responseObject.message = origMessage;
        res.json(responseObject);
        console.log("Message found and response sent");
    }
    else {
        console.log("Found no message; passing to next middleware")
        next();
    }
}

// Functions to be exported out of this module
module.exports = {
    postMessage,
    getMessage
}