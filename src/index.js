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

citySearch("London");
