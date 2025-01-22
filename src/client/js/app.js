import { getCountryInfo } from "./countryInfoHandler";
import "./datePickerHandler";
const generateBtn = document.getElementById("generate");
const cityInput = document.getElementById("city");

generateBtn.addEventListener("click", () => {
  const cityValue = cityInput.value;
  getCountryInfo(cityValue);
});
