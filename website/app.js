/* Global Variables */
const APIKEY = "c1d83f6154df7cfd3be57d067093edc6&units=imperial";
const BASEURL = "https://api.openweathermap.org/data/2.5/weather?";

// Selectors
const zipCode = document.querySelector("#zip");
const userResponseEl = document.querySelector("#feelings");
const generateBtn = document.querySelector("#generate");
const dateEl = document.querySelector("#date");
const tempEl = document.querySelector("#temp");
const contentEl = document.querySelector("#content");

// Create a new date instance dynamically with JS
const getCurrentDate = () => {
  const d = new Date();
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

// Function to send data to server
const postData = async (temperature, date, userResponse) => {
  const data = { date, temperature, userResponse };
  try {
    const res = await fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (res.status !== 200) throw new Error("Failed to send data to server.");
    return response.data;
  } catch (error) {
    console.error(error);
    contentEl.textContent = "Error: Unable to save data.";
  }
};

// Function to retrieve data from OpenWeatherMap
const retrieveWeather = async () => {
  try {
    const res = await fetch(
      `${BASEURL}zip=${zipCode.value}&appid=${APIKEY}&units=metric`
    );
    if (!res.ok) throw new Error("Failed to fetch weather data.");
    const data = await res.json();
    return data.main.temp;
  } catch (error) {
    console.error(error);
    contentEl.textContent = "Error: Unable to fetch weather data.";
  }
};

// Function to update UI
const updateUI = async () => {
  try {
    const res = await fetch("/getData");
    const data = await res.json();
    if (!data) {
      contentEl.textContent = "No data available.";
      return;
    }
    const { temperature, date, userResponse } = data;
    dateEl.textContent = `Date: ${date}`;
    tempEl.textContent = `Temperature: ${temperature}°F`;
    contentEl.textContent = `Feedback: ${userResponse}`;
  } catch (error) {
    console.error(error);
    contentEl.textContent = "Error: Unable to update UI.";
  }
};

// Function to handle generate button event
const handleGenerateEvent = async () => {
  const zip = zipCode.value.trim();
  const userResponse = userResponseEl.value.trim();

  if (!zip) {
    alert("Please enter a ZIP code.");
    return;
  }
  if (!userResponse) {
    alert("Please provide your feedback.");
    return;
  }

  const currentDate = getCurrentDate();
  const temperature = await retrieveWeather();
  console.log(temperature);
  if (temperature) {
    await postData(temperature, currentDate, userResponse);
    await updateUI();
  }
};

// Add event listener to the generate button
generateBtn.addEventListener("click", handleGenerateEvent);
