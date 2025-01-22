import { getCountryInfo } from "./countryInfoHandler";
import "./datePickerHandler";
import daysCounter from "./daysCounter";
import handlePlaceImage from "./handlePalceImage";
const generateBtn = document.getElementById("generate");
const cityInput = document.getElementById("city");
const dateInputEl = document.getElementById("dateInput");

const tripsData = [];

generateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const cityValue = cityInput.value;
  const destinationData = await getCountryInfo(cityValue);

  destinationData.placeImage = await handlePlaceImage(destinationData);
  console.log("🚀 ~ generateBtn.addEventListener ~ image:", destinationData);

  const userInutDate = dateInputEl.value;
  const remainingDays = daysCounter(userInutDate);
});
