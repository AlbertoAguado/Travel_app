// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require ('express');

// Start up an instance of app
const app = express();

/*Dependencies*/ 
const bodyParser = require ('body-parser');


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
    console.log(`running on localhost: ${port}`)
}

// POST route
app.post('/add', function(req,res){
  let newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    feeling: req.body.feeling,
    city: req.body.city,
    main: req.body.main,
    description: req.body.description,
    icon: req.body.icon
  }
  
  //projectData.push(newEntry);
  projectData = Object.assign(newEntry);
  res.send(projectData);
  });

// GET route
app.get('/all', sendData);

function sendData (request, response) {
  response.send(projectData);
};

