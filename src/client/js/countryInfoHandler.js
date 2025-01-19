import axios from "axios";

const generateBtn = document.getElementById("generate");
const cityInput = document.getElementById("city");
const getCountryInfo = async (city) => {
  try {
    const res = await axios.get("http://localhost:8080/countryInfo", {
      params: { city },
    });
    console.log("🚀 ~ getCountryInfo ~ res:", res);
  } catch (error) {
    console.log("🚀 ~ getCountryInfo ~ error:", error);
  }
};

generateBtn.addEventListener("click", () => {
  const cityValue = cityInput.value;
  console.log("🚀 ~ generateBtn.addEventListener ~ cityValue:", cityValue);
  getCountryInfo(cityValue);
});
