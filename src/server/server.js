var path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.static('dist'));

const serverPort = 8020;
const serverName = "localhost";

function listening() {
    console.log(`Server running on ${serverName}:${serverPort}`);
}

function getData(req, res) {
    res.status(200).send(projectData);
}

function postData(req, res) {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}

app.use(bodyParser.json());

app.use(cors());

app.use(express.static('src'));

app.listen(serverPort, listening);