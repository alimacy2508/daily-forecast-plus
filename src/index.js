function newTemperatureCity(response) {
  let currentTemperature = document.querySelector(".weather-temperature");
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.condition.description;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${Math.round(response.data.temperature.feels_like)}°C`;

  let airPressure = document.querySelector("#air-pressure");
  airPressure.innerHTML = `${Math.round(
    response.data.temperature.pressure
  )}hPa`;

  let humidityPercentage = document.querySelector("#humidity");
  humidityPercentage.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed}km\h`;

  let date = new Date(response.data.time * 1000);
  let newDate = document.querySelector("#current-date");
  newDate.innerHTML = formatDate(date);

  let iconImage = document.querySelector("#icon");
  iconImage.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes},`;
}

function citySearch(city) {
  let apiKey = "bbco0f50t952db4519a3613cfbc4bfb3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(newTemperatureCity);
}

function searchInput(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-form-input");
  citySearch(cityElement.value);
}

let changeCity = document.querySelector("#search-form");
changeCity.addEventListener("submit", searchInput);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "bbco0f50t952db4519a3613cfbc4bfb3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <div class = "forecast-day">
  <div class = "current-day">${formatDay(day.time)}</div>
        <div class = "forecast-icon">
          <img src = "${day.condition.icon_url}"/>
        </div>
        <div class = "weather-temperatures">
        <div class = "weather-temperature-max">
          ${Math.round(day.temperature.maximum)}°C
        </div>
        <div class = "weather-temperature-min">
          ${Math.round(day.temperature.minimum)}°C
        </div>
        </div>
        </div>`;
    }
  });

  forecastElement = document.querySelector(".weather-forecast");
  forecastElement.innerHTML = forecastHTML;
}

citySearch("London");
