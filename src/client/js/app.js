import { getCountryInfo } from "./countryInfoHandler";
import "./datePickerHandler";
import daysCounter from "./daysCounter";
import handlePlaceImage from "./handlePalceImage";
import handleWeatherData from "./handleWeatherApi";
const generateBtn = document.getElementById("generate");
const cityInput = document.getElementById("city");
const dateInputEl = document.getElementById("dateInput");

const tripsData = [];

generateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const trip = {};
  const cityValue = cityInput.value;
  trip.destinationData = await getCountryInfo(cityValue);

  trip.placeImage = await handlePlaceImage(trip.destinationData);

  const userInutDate = dateInputEl.value;
  trip.travelDate = userInutDate;
  const remainingDays = daysCounter(userInutDate);

  trip.weatherData = await handleWeatherData(
    remainingDays,
    trip.destinationData,
    trip.travelDate
  );
  console.log(trip);
});
