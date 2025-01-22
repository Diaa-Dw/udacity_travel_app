import { getCountryInfo } from "./countryInfoHandler";
import "./datePickerHandler";
import daysCounter from "./daysCounter";
const generateBtn = document.getElementById("generate");
const cityInput = document.getElementById("city");
const dateInputEl = document.getElementById("dateInput");

const tripsData = [];

generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const cityValue = cityInput.value;
  getCountryInfo(cityValue);
  const userInutDate = dateInputEl.value;
  console.log(
    "🚀 ~ generateBtn.addEventListener ~ userInutDate:",
    userInutDate
  );
  console.log(daysCounter(userInutDate));
});
