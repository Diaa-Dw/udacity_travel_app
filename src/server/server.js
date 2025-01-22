const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const GEONAMES_BASEURL = process.env.GEONAMES_BASEURL;
const GEONAMES_USER = process.env.GEONAMES_USER;

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
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    error: error ? error.message : undefined,
  });
};

// Utility function to send successs response
const handleSuccessResponse = (res, statusCode = 200, data) => {
  res.status(statusCode).json({
    status: "success",
    statusCode,
    data,
  });
};

const getCountryInfo = async (req, res) => {
  const { city } = req.body;
  console.log("🚀 ~ getCountryInfo ~ city:", req.body);

  if (!city) {
    return handleErrorResponse(res, 400, "City parameter is required.");
  }

  const API = `${GEONAMES_BASEURL}q=${city}&maxRows=1&username=${GEONAMES_USER}`;

  try {
    const response = await axios.get(API);
    console.log("🚀 ~ getCountryInfo ~ response:", response.data);
    return handleSuccessResponse(res, 200, response.data);
  } catch (error) {
    console.error(`Error fetching country info: ${error}`);
    return handleErrorResponse(
      res,
      500,
      "Failed to fetch country information."
    );
  }
};

app.post("/countryInfo", getCountryInfo);

app.listen(8080, () => {
  console.log("app running on port 8080!");
});
