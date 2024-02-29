function newTemperatureCity(response) {
  let currentTemperature = document.querySelector(".weather-temperature");
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.condition.description;

  let humidityPercentage = document.querySelector("#humidity");
  humidityPercentage.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed}km\h`;

  let date = new Date(response.data.time * 1000);
  let newDate = document.querySelector("#current-date");
  newDate.innerHTML = formatDate(date);

  let iconImage = document.querySelector("#icon");
  iconImage.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
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

function displayForecast() {
  let days = ["Tue", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class = "forecast-day">
  <div class = "current-day"> ${day}</div>
        <div class = "forecast-icon">
          <img src = "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"/>
        </div>
        <div class = "weather-temperatures">
        <div class = "weather-temperature-max">
          20°C
        </div>
        <div class = "weather-temperature-min">
          14°C
        </div>
        </div>
        </div>`;
  });

  forecastElement = document.querySelector(".weather-forecast");
  forecastElement.innerHTML = forecastHTML;
}

citySearch("London");
displayForecast();
