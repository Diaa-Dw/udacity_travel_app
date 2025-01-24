import clock from "../media/images/clock.png";
import calendar from "../media/images/calendar.png";
import location from "../media/images/maps-and-flags.png";
import defaultImage from "../media/images/default_image.jpg";

const weatherForcastDay = (weather) => {
  return `
                <div class="weather__forcast">
                <h3>
                  Weather Report for
                  <span> ${weather.datetime} </span>
                </h3>
                <div class="weather__forcast__information">
                  <div class="weather__forcast__information__row">
                    <div class="weather__overview">
                      <img
                        src="https://cdn.weatherbit.io/static/img/icons/${weather.weather.icon}.png"
                        alt=${weather.weather.description}
                      />
                      <span>${weather.weather.description}</span>
                    </div>
                  </div>

                  <div class="weather__forcast__information__row">
                    <div>
                      <p>Low: <span>${weather.min_temp}</span></p>
                    </div>
                    <div>
                      <p>High: <span>${weather.max_temp}</span></p>
                    </div>
                  </div>

                  <div class="weather__forcast__information__row">
                    <div>
                      <p>Chance of Rain: <span>${weather.pop}%</span></p>
                    </div>
                    <div>
                      <p>Snowfall: <span>${weather.snow} mm/hr</span></p>
                    </div>
                  </div>
                </div>
              </div>
  `;
};

const weatherHistoryTemplateForLatestThree = (weatherData) => {
  const weathers = weatherData.map((weather) => weather[0]);

  return weathers
    .map((weather) => {
      return `
                  <div class="history__Weather hidden">
                <div class="weather__history__information">
                  <div class="weather__forcast__information__row flex-end">
                    <div class="weather__date">
                      <img
                        src=${calendar}
                        alt="Partly Cloudy Day"
                      />
                      <span>${weather.datetime}</span>
                    </div>
                  </div>

                  <div class="weather__forcast__information__row">
                    <div class='low-temp'>
                      <p>Low: <span>${weather.min_temp}</span></p>
                    </div>
                    <div class='high-temp'>
                      <p>High: <span>${weather.max_temp}</span></p>
                    </div>
                  </div>
                </div>
              </div>
    `;
    })
    .join("");
};

const tripsContainer = document.querySelector(".trips-container");
const updateUI = (trip) => {
  console.log("🚀 ~ updateUI ~ trip:", trip);
  const htmlTrip = tripTemplate(trip);
  tripsContainer.insertAdjacentHTML("afterbegin", htmlTrip);
};

const tripTemplate = (trip) => {
  return `
    
        <div class="trip" data-id=${trip.id}>
          <img
            src=${trip.placeImage ? trip.placeImage : defaultImage}
            alt=${trip.destinationData.city}
            class="trip__image"
          />
          <div class="trip__informations">
            <h2 class="trip__destination trip__info">
              <img
                src=${location}
                alt="maps and flag icon"
                class="trip__icon"
              />
              <span>Destantion To: </span>
              <span class="mark-text"> ${trip.destinationData.city} </span>
            </h2>
            <h2 class="trip__departure trip__info">
              <img
                src=${calendar}
                alt="calender"
                class="trip__icon"
              />
              <span>Departue Date: </span>
              <span class="mark-text"> ${trip.travelDate} </span>
            </h2>
          </div>

          <div class="trip__counter">
            <img src=${clock} alt="clock" class="icon" />
            <p class="trip_counter_descrption">${trip.destinationData.city}, ${
    trip.destinationData.country
  } is <span>${trip.remainingDays} days</span> away!</p>
          </div>

            <div class="weather-container">


              ${
                trip.weatherData.length === 4
                  ? `
            ${weatherForcastDay(trip.weatherData[0])}
          ${weatherHistoryTemplateForLatestThree(trip.weatherData.slice(1))}
    `
                  : `          ${weatherHistoryTemplateForLatestThree(
                      trip.weatherData
                    )}
`
              }

            </div>

            <button class="btn btn-delete">
            Delete Trip
            </button>
        </div>
    
    
    `;
};

export default updateUI;
