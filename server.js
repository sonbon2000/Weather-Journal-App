// Empty Object Data
projectData = {};

/* Dependencies */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//  Set up Express
const app = express();

/* Middleware*/
// Set up Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up Cors
app.use(cors());

// Set up folders
app.use(express.static("website"));

// Setup Server
const port = 3000;

const listening = () => {
  console.log("server running");
  console.log(`running on localhost:${port}`);
};

const server = app.listen(port, listening);

// GET route
const getData = (req, res) => {
  res.send(projectData);
};
app.get("/get", getData);

// POST route
const addData = (req, res) => {
  projectData = req.body;
  res.send(projectData);
};
app.post("/add", addData);
