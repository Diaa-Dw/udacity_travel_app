// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const listening = () => {
  console.log(`server runs on ${port} port.`);
};
const server = app.listen(port, listening);

// Callback function to complete GET '/all'
const getProjectData = (req, res) => {
  res.send(projectData);
};

// Get Route

app.get("/getData", getProjectData);

// Post Route
const addData = (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData.temperature = temperature;
  projectData.date = date;
  projectData.userResponse = userResponse;
  res.send({
    statusCode: 200,
    data: projectData,
  });
};

app.post("/add", addData);
