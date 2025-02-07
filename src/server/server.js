const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

//Customer functions
const getLatestThreeYearsDate = require("./getLatestThreeYears");

//Using dotenv to access variables that initalized in the .env file
dotenv.config();

//Geting the base url of geonames and user-name to access api
const GEONAMES_BASEURL = process.env.GEONAMES_BASEURL;
const GEONAMES_USER = process.env.GEONAMES_USER;

const PIXABAY_BASEURL = process.env.PIXABAY_BASEURL;
const PIXABAY_APIKEY = process.env.PIXABAY_APIKEY;

const WEATHERBIT_APIKEY = process.env.WEATHERBIT_APIKEY;

const app = express();

// Use cors to handle cross-origin requests and express.json() to parse JSON request bodies
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
//Function to handle call geoNames Api
const getCountryInfo = async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return handleErrorResponse(res, 400, "City parameter is required.");
  }

  const API = `${GEONAMES_BASEURL}q=${city}&maxRows=1&username=${GEONAMES_USER}`;

  try {
    const response = await axios.get(API);
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

const forcestWeatherByDay = async (req, res) => {
  const { baseUrl, lat, long, reaminingDays } = req.body;

  try {
    const response = await axios.get(
      `${baseUrl}lat=${lat}&lon=${long}&units=M&days=${reaminingDays}&key=${WEATHERBIT_APIKEY}`
    );
    return handleSuccessResponse(
      res,
      200,
      response.data.data[response.data.data.length - 1]
    );
  } catch (error) {
    console.error(`Error fetching country info: ${error}`);
    return handleErrorResponse(
      res,
      500,
      "Failed to fetch forcest weather information."
    );
  }
};

const historyWeatherforLatestThreeYears = async (req, res) => {
  const { baseUrl, lat, long, travelDate } = req.body;
  const latestThreeYears = getLatestThreeYearsDate(travelDate);

  const urls = latestThreeYears.map(
    ({ startDate, endDate }) =>
      `${baseUrl}lat=${lat}&lon=${long}&start_date=${startDate}&end_date=${endDate}&key=${WEATHERBIT_APIKEY}`
  );

  try {
    const promises = urls.map((url) => axios.get(url));
    const responses = await Promise.all(promises);

    const data = responses.map((resp) => resp.data.data);
    return handleSuccessResponse(res, 200, data);
  } catch (error) {
    console.error(`Error fetching country info: ${error}`);
    return handleErrorResponse(
      res,
      500,
      "Failed to fetch forcest weather information."
    );
  }
};

const getPlaceImage = async (req, res) => {
  const { city, country } = req.body;
  if (!city && !country) {
    return handleErrorResponse(
      res,
      400,
      "City and country parameters are required."
    );
  }

  try {
    const response = await axios.get(
      `${PIXABAY_BASEURL}key=${PIXABAY_APIKEY}&q=${city}&image_type=photo&pretty=true&orientation=horizontal&category=nature`
    );
    if (response && response.data && response.data.hits.length > 0) {
      return handleSuccessResponse(res, 200, response.data.hits[0]);
    } else {
      const response2 = await axios.get(
        `${PIXABAY_BASEURL}key=${PIXABAY_APIKEY}&q=${city}&image_type=photo&pretty=true&orientation=horizontal&category=nature`
      );
      if (response2.data && response2.data.hits.length > 0) {
        return handleSuccessResponse(res, 200, response2.hits[0]);
      } else {
        return handleErrorResponse(
          res,
          404,
          "No images found for the given city."
        );
      }
    }
  } catch (error) {
    console.log("🚀 ~ getPlaceImage ~ error:", error);
    return handleErrorResponse(res, 500, "Failed to fetch place image.");
  }
};

app.post("/countryInfo", getCountryInfo);

app.post("/getPlaceImage", getPlaceImage);

app.post("/forecastWeatherByDay", forcestWeatherByDay);
app.post(
  "/historyWeatherforLatestThreeYears",
  historyWeatherforLatestThreeYears
);

app.listen(8080, () => {
  console.log("app running on port 8080!");
});
