import axios from "axios";

const handleWeatherData = async (
  reaminingDays,
  destinationData,
  travelDate
) => {
  if (reaminingDays <= 0) {
    return;
  }
  const lat = destinationData.lat;
  const long = destinationData.long;
  if (reaminingDays <= 16) {
    // https://api.weatherbit.io/v2.0/forecast/daily?lat=41.015137&lon=28.979530&units=M&days=90&key=1ab71fff6f784451b7c66034c65d87d9
    const baseApi = `https://api.weatherbit.io/v2.0/forecast/daily?`;
    axios.post("/forecastWeatherByDay", {
      baseApi,
      reaminingDays,
      lat,
      long,
    });
  } else {
    if (reaminingDays > 356) {
      const date = new Date();
      const TDate = new Date(travelDate);
      const day = `0${TDate.getDate()}`.slice(-2);
      const month = TDate.getMonth() + 1;
      travelDate = `${date.getFullYear()}-${month}-${day}`;
    }
    // https://api.weatherbit.io/v2.0/history/daily?lat=41.015137&lon=28.979530&start_date=2025-01-18&end_date=2025-01-19&key=1ab71fff6f784451b7c66034c65d87d9
    const baseAi = `https://api.weatherbit.io/v2.0/history/daily?`;
    axios.post("/historyWeatherByDate", {
      baseAi,
      lat,
      long,
      travelDate,
    });
  }
};
