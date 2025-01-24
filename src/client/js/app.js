import { getCountryInfo } from "./countryInfoHandler";
import "./datePickerHandler";
import daysCounter from "./daysCounter";
import handlePlaceImage from "./handlePalceImage";
import handleWeatherData from "./handleWeatherApi";
import isValidDate from "./isValidDate";
import updateUI from "./updateUI";
const generateBtn = document.getElementById("generate");
const cityInput = document.getElementById("city");
const dateInputEl = document.getElementById("dateInput");
const tripsContainer = document.querySelector(".trips-container");

const tripsData = [];

generateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const trip = {};
  const cityValue = cityInput.value;
  const userInutDate = dateInputEl.value;
  trip.travelDate = userInutDate;

  console.log(
    "🚀 ~ generateBtn.addEventListener ~ !isValidDate(userInutDate):",
    !isValidDate(userInutDate)
  );
  if (isValidDate(userInutDate)) {
    console.log("valid");
    console.log("🚀 ~ generateBtn.addEventListener ~ cityValue:", cityValue);
    trip.destinationData = await getCountryInfo(cityValue);
    console.log("🚀 ~ generateBtn.addEventListener ~ trip:", trip);

    trip.placeImage = await handlePlaceImage(trip.destinationData);

    trip.remainingDays = daysCounter(userInutDate);

    trip.weatherData = await handleWeatherData(
      trip.remainingDays,
      trip.destinationData,
      trip.travelDate
    );
    trip.id = tripsData.length;
    updateUI(trip);
    tripsData.push(trip);
  } else {
    console.log("not valid");
  }
});

//Event listener to handle delete trip when click the button
tripsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-delete")) {
    const container = event.target.parentElement;
    if (container) {
      container.remove();
    }
  }
});
