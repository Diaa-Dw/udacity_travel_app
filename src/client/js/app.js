import { getCountryInfo } from "./countryInfoHandler";
import "./datePickerHandler";
import daysCounter from "./daysCounter";
import notify from "./notifyHandler";
import handlePlaceImage from "./handlePalceImage";
import handleWeatherData from "./handleWeatherApi";
import isValidDate from "./isValidDate";
import updateUI from "./updateUI";

//DOM Elements
const generateBtn = document.getElementById("generateBtn");
const cityInput = document.getElementById("cityInput");
const dateInputEl = document.getElementById("departureDate");
const tripsContainer = document.querySelector(".trips-container");

//Check if there is trips in localStorage and get them.
let tripsData = JSON.parse(localStorage.getItem("trips")) || [];
//If there trips in the localStorage display them.
if (tripsData.length !== 0) {
  tripsData.map((trip) => updateUI(trip));
}

const toggleButtonDisable = (value) => {
  generateBtn.classList.toggle("btn-disabled");
  generateBtn.disabled = value;
};

const resetInputs = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  cityInput.value = "";
  dateInputEl.value = currentDate;
};

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
  try {
    toggleButtonDisable(true);
    trip.remainingDays = daysCounter(userInutDate);
    if (trip.remainingDays < 0) {
      throw new Error("Invalid selected date please select future date.");
    }
    trip.destinationData = await getCountryInfo(cityValue);

    trip.placeImage = await handlePlaceImage(trip.destinationData);

    trip.weatherData = await handleWeatherData(
      trip.remainingDays,
      trip.destinationData,
      trip.travelDate
    );
    trip.id = tripsData.length;
    updateUI(trip);
    resetInputs();
    tripsData.push(trip);
  } catch (error) {
    notify("error", error.message);
  } finally {
    toggleButtonDisable(false);
  }
});

//Event listener to handle delete trip when click the button
tripsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-delete")) {
    const container = event.target.parentElement;
    if (container) {
      const index = container.dataset.id;
      if (tripsData.length === 1) {
        tripsData.pop();
      } else {
        tripsData.splice(index, 1);
      }
      container.remove();
    }
  }
});

//Event to save trips into localStorage before closing the tab
window.addEventListener("beforeunload", () => {
  localStorage.setItem("trips", JSON.stringify(tripsData));
});
