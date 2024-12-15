const apiURL = 'http://api.weatherapi.com/v1/search.json?key=90fd283c94464489b1c201308241112&q=lond';
const apiKey = '90fd283c94464489b1c201308241112';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('searchBtn');
const todayWeatherCard = document.getElementById('todayWeatherCard');
const tomorrowWeatherCard = document.getElementById('todayWeatherCard');
const dayAfterTomorrowWeatherCard = document.getElementById('dayAfterTomorrowWeatherCard');



// get data for weather api


async function fetchWeatherData(city = "Cairo") {
  const apiURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}

// function displayWeather today
function displayTodayWeather(data) {
  const today = data.forecast.forecastday[0];
  const todayCard = document.getElementById("todayWeatherCard");
  const isDay = today.day.condition.is_day;
  const iconURL = `https:${isDay ? today.day.condition.icon : today.day.condition.icon.replace("day", "night")}`;


  todayCard.innerHTML = `
      <div class="today-weather">
          <div class="today-information">
              <p>${new Date(today.date).toLocaleString("en-us", { weekday: "long" })}</p>
              <p><span>${new Date(today.date).getDate()}</span> ${new Date(today.date).toLocaleString("en-us", { month: "long" })}</p>
          </div>
          <div class="weather-details text-start">
              <p>${data.location.name},</p>
              <p>${data.location.country}</p>
              <div class="today-degree d-flex justify-content-between align-items-center my-3">
                  <h2>${Math.round(today.day.avgtemp_c)}<sup>o</sup>C</h2>
                  <img class="img-fluid" src="${iconURL}" alt="${today.day.condition.text}">
              </div>
              <div class="today-weather-information">
                  <p>${isDay ? "Daytime" : "Nighttime"} - ${today.day.condition.text}</p>
                  <div class="d-flex justify-content-between align-items-center w-75">
                      <p class="m-0"><i class="fa-solid fa-umbrella me-1 fs-5"></i><span>${today.day.avghumidity}%</span></p>
                      <p class="m-0"><i class="fa-solid fa-wind me-1 fs-5"></i><span>${today.day.maxwind_kph} km/h</span></p>
                      <p class="m-0"><i class="fa-regular fa-compass me-1 fs-5"></i><span>${today.day.wind_dir}</span></p>
                  </div>
              </div>
          </div>
      </div>
  `;
}

// function displayWeather tomorrow
function displayTomorrowWeather(data) {
  const tomorrow = data.forecast.forecastday[1];
  const tomorrowCard = document.getElementById("tomorrowWeatherCard");

  tomorrowCard.innerHTML = `
      <div class="other-day-weather text-center">
          <div class="other-day-information d-block">
              <p>${new Date(tomorrow.date).toLocaleString("en-us", { weekday: "long" })}</p>
          </div>
          <div class="weather-details d-flex justify-content-center align-items-center flex-column">
              <div class="other-day-degree">
                  <img class="img-fluid" src="https:${tomorrow.day.condition.icon}" alt="">
                  <h2>${Math.round(tomorrow.day.maxtemp_c)}<sup>o</sup>C</h2>
                  <p>${Math.round(tomorrow.day.mintemp_c)}<sup>o</sup>C</p>
              </div>
              <div class="other-day-weather-information">
                  <p>${tomorrow.day.condition.text}</p>
              </div>
          </div>
      </div>
  `;
}

// function displayWeather day after tomorrow
function displayDayAfterTomorrowWeather(data) {
  const dayAfterTomorrow = data.forecast.forecastday[2];
  const dayAfterTomorrowCard = document.getElementById("dayAfterTomorrowWeatherCard");

  dayAfterTomorrowCard.innerHTML = `
      <div class="other-day-weather text-center">
          <div class="other-day-information d-block">
              <p>${new Date(dayAfterTomorrow.date).toLocaleString("en-us", { weekday: "long" })}</p>
          </div>
          <div class="weather-details d-flex justify-content-center align-items-center flex-column">
              <div class="other-day-degree">
                  <img class="img-fluid" src="https:${dayAfterTomorrow.day.condition.icon}" alt="">
                  <h2>${Math.round(dayAfterTomorrow.day.maxtemp_c)}<sup>o</sup>C</h2>
                  <p>${Math.round(dayAfterTomorrow.day.mintemp_c)}<sup>o</sup>C</p>
              </div>
              <div class="other-day-weather-information">
                  <p>${dayAfterTomorrow.day.condition.text}</p>
              </div>
          </div>
      </div>
  `;
}

// function update cards weather
async function updateWeather(city = "Cairo") {
  const data = await fetchWeatherData(city);
  if (data) {
    displayTodayWeather(data);
    displayTomorrowWeather(data);
    displayDayAfterTomorrowWeather(data);
  }
}

//  load page for weather cairo
window.onload = () => {
  updateWeather("Cairo");
};


// update weather for input search weather city
document.getElementById("city-input").addEventListener("input", async (event) => {
  const city = event.target.value.trim();
  if (city) {
    await updateWeather(city);
  }
});
