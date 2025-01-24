import { getCountryInfo } from "./countryInfoHandler";
import "./datePickerHandler";
import daysCounter from "./daysCounter";
import notify from "./notifyHandler";
import handlePlaceImage from "./handlePalceImage";
import handleWeatherData from "./handleWeatherApi";
import isValidDate from "./isValidDate";
import updateUI from "./updateUI";
const generateBtn = document.getElementById("generate");
const cityInput = document.getElementById("city");
const dateInputEl = document.getElementById("dateInput");
const tripsContainer = document.querySelector(".trips-container");

//Check if there is trips in localStorage and get them.
let tripsData = JSON.parse(localStorage.getItem("trips")) || [];
//If there trips in the localStorage display them.
if (tripsData.length !== 0) {
  tripsData.map((trip) => updateUI(trip));
}

generateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const trip = {};
  const cityValue = cityInput.value;
  const userInutDate = dateInputEl.value;
  trip.travelDate = userInutDate;
  if (!cityValue) {
    return notify("error", "Please enter destination of the trip");
  }
  if (!isValidDate(userInutDate)) {
    return notify("error", "Please enter a vaild date.");
  }
  trip.destinationData = await getCountryInfo(cityValue);

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


//Event to save trips into localStorage before closing the tab  
window.addEventListener("beforeunload", () => {
  localStorage.setItem("trips", JSON.stringify(tripsData));
});
