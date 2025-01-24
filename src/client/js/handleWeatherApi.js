import axios from "axios";

const handleWeatherData = async (
  reaminingDays,
  destinationData,
  travelDate
) => {
  try {
    if (reaminingDays <= 0) {
      return;
    }
    let res = [];
    const lat = destinationData.lat;
    const long = destinationData.long;
    if (reaminingDays <= 16) {
      // https://api.weatherbit.io/v2.0/forecast/daily?lat=41.015137&lon=28.979530&units=M&days=90&key=1ab71fff6f784451b7c66034c65d87d9

      const baseUrl = `https://api.weatherbit.io/v2.0/forecast/daily?`;
      console.log(
        "🚀 ~      baseUrl,reaminingDays,lat,long,:",
        baseUrl,
        reaminingDays,
        lat,
        long
      );
      const response = await axios.post(
        "http://localhost:8080/forecastWeatherByDay",
        {
          baseUrl,
          reaminingDays,
          lat,
          long,
        }
      );

      res.push(response.data.data);
    }

    if (reaminingDays > 356) {
      const date = new Date();
      const TDate = new Date(travelDate);
      const day = `0${TDate.getDate()}`.slice(-2);
      const month = TDate.getMonth() + 1;
      travelDate = `${date.getFullYear()}-${month}-${day}`;
    }

    const baseUrl = `https://api.weatherbit.io/v2.0/history/daily?`;
    const response = await axios.post(
      "http://localhost:8080/historyWeatherforLatestThreeYears",
      {
        baseUrl,
        lat,
        long,
        travelDate,
      }
    );
    res = [...res, ...response.data.data];
    return res;
  } catch (error) {
    const message =
      error.message || "Somthing went wrong while fetching place image.";
    notify("error", message);
    console.log("🚀 ~ error:", error);
  }
};

export default handleWeatherData;
