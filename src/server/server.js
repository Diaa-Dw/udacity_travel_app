const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const BASEURL = process.env.BASEURL;
const USERNAME = process.env.USER;
console.log("🚀 ~ USERNAME:", USERNAME);

const app = express();

const cors = require("cors");
const { error } = require("console");

app.use(cors());
app.use(express.json());

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

// Utility function to send consistent error responses
const handleErrorResponse = (res, statusCode, message, error = null) => {
  res.statusCode(statusCode).json({
    status: "error",
    statusCode,
    message,
    error: error ? error.message : undefined,
  });
};

// Utility function to send successs response
const handleSuccessResponse = (res, statusCode = 200, data) => {
  res.statusCode(statusCode).json({
    status: "success",
    statusCode,
    data,
  });
};

const getCountryInfo = async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return handleErrorResponse(res, 400, "City parameter is required.");
  }

  const API = `${BASEURL}q=${city}&maxRows=1&username=${USERNAME}`;

  try {
    const response = await axios.get(API);
    return handleSuccessResponse(res, 200, response);
  } catch (error) {
    console.error(`Error fetching country info: ${error}`);
    return handleErrorResponse(
      res,
      500,
      "Failed to fetch country information."
    );
  }
};

app.get("/cityInfo", async (req, res) => {
  const { city } = req.body;
  const API = `${BASEURL}q=${city}&maxRows=1&username=${USERNAME}`;
  axios
    .get(API)
    .then((response) => {
      res.end({
        status: "success",
        statusCode: 200,
        data: response,
      });
    })
    .catch((err) => {
      res.end({
        status: "error",
        statusCode: 500,
        error: err,
      });
    });
});

app.get("/countryInfo", getCountryInfo);

app.listen(8080, () => {
  console.log("app running on port 8080!");
});
