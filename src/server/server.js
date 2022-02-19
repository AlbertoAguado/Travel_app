// Path Required (Put this when you run npm start when server.js is on a different path //
var path = require('path');

// Express Server //
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Using Express // 
const app = express();
app.use(express.static('dist'));


// Server Name & Port //
const serverPort = 7000;
const serverName = "localhost";

// Server Listening Function // 
function listening() {
    console.log(`Server running on ${serverName}:${serverPort}`);
}

function getData(req, res) {
    res.status(200).send(projectData);
}

/**
 * Post weather service response data.
 * 
 * @param {*} req request
 * @param {*} res response data
 */
function postData(req, res) {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}


app.use(bodyParser.json());
// set up app to use "cors" //
app.use(cors());
// initialize main project folder //
app.use(express.static('src'));

//  Routes //
app.get("/all", getData);
app.post("/add", postData);
// Server Runs and It will be listening //
app.listen(serverPort, listening);